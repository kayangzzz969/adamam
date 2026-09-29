/**
 * NETLIFY SERVERLESS FUNCTION FOR ADAM XAVIER FANBASE
 * Menyimpan dan membaca data fanbase langsung ke Netlify Blobs (Cloud Key-Value Storage).
 * Endpoint: /api/data (di-rewrite melalui netlify.toml)
 */

const { getStore } = require("@netlify/blobs");

exports.handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Admin-Auth",
    "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
    "Content-Type": "application/json"
  };

  // Pre-flight CORS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: ""
    };
  }

  try {
    const store = getStore({
      name: "adamxavier-fanbase-data",
      consistency: "strong"
    });

    // 1. GET: Ambil data terbaru untuk pengunjung website & panel admin
    if (event.httpMethod === "GET") {
      let data = null;
      try {
        data = await store.get("site_content", { type: "json" });
      } catch (e) {}

      // Fallback: Ambil data live dari GitHub Raw (Cloud Database Utama)
      if (!data) {
        try {
          const ghResp = await fetch("https://raw.githubusercontent.com/kayangzzz969/adamam/main/assets/js/data.js?_t=" + Date.now());
          if (ghResp.ok) {
            const text = await ghResp.text();
            const bioMatch = text.match(/const\s+DEFAULT_BIO\s*=\s*([\s\S]*?);\s*const\s+DEFAULT_FILMS/);
            const filmsMatch = text.match(/const\s+DEFAULT_FILMS\s*=\s*([\s\S]*?);\s*const\s+DEFAULT_EVENTS/);
            const eventsMatch = text.match(/const\s+DEFAULT_EVENTS\s*=\s*([\s\S]*?);\s*(?:\/\/|\/\*|const\s+FanbaseStore|$)/);
            if (bioMatch || filmsMatch || eventsMatch) {
              data = {
                bio: bioMatch ? JSON.parse(bioMatch[1].trim()) : null,
                films: filmsMatch ? JSON.parse(filmsMatch[1].trim()) : [],
                events: eventsMatch ? JSON.parse(eventsMatch[1].trim()) : []
              };
            }
          }
        } catch (ghErr) {}
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data || null)
      };
    }

    // 2. POST / PUT: Simpan pembaruan dari Panel Admin
    if (event.httpMethod === "POST" || event.httpMethod === "PUT") {
      const body = JSON.parse(event.body || "{}");
      if (!body || (!body.bio && !body.films && !body.events)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Payload data tidak valid" })
        };
      }

      body.savedAt = new Date().toISOString();
      await store.setJSON("site_content", body);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: "Data berhasil disimpan permanen ke Netlify Blobs Cloud Storage!",
          savedAt: body.savedAt
        })
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  } catch (error) {
    console.error("Netlify Blobs Storage Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message,
        hint: "Pastikan Netlify Blobs telah aktif di dashboard situs Netlify Anda."
      })
    };
  }
};
