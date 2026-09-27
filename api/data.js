/**
 * VERCEL SERVERLESS FUNCTION FOR ADAM XAVIER FANBASE
 * Endpoint: /api/data
 * 
 * Mendukung penyimpanan otomatis ke:
 * 1. Vercel KV (Key-Value Redis Store) -> @vercel/kv / KV_REST_API_URL
 * 2. Vercel Blob Storage -> @vercel/blob / BLOB_READ_WRITE_TOKEN
 * 3. Upstash Redis REST API
 */

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Admin-Auth");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

  try {
    // ============================================================
    // METODE GET: Ambil Data Terbaru dari Vercel Storage
    // ============================================================
    if (req.method === "GET") {
      // 1. Cek Vercel KV (REST Endpoint atau @vercel/kv)
      if (kvUrl && kvToken) {
        try {
          const resp = await fetch(`${kvUrl}/get/site_content`, {
            headers: { Authorization: `Bearer ${kvToken}` }
          });
          if (resp.ok) {
            const json = await resp.json();
            let result = json.result;
            if (typeof result === "string") {
              try { result = JSON.parse(result); } catch (e) {}
            }
            if (result && (result.bio || result.films || result.events)) {
              return res.status(200).json(result);
            }
          }
        } catch (kvErr) {
          console.error("Vercel KV fetch error:", kvErr);
        }
      }

      // Coba library @vercel/kv jika tersedia
      try {
        const { kv } = require("@vercel/kv");
        if (kv) {
          const data = await kv.get("site_content");
          if (data && (data.bio || data.films || data.events)) {
            return res.status(200).json(data);
          }
        }
      } catch (e) {}

      // 2. Cek Vercel Blob
      if (blobToken) {
        try {
          const { list } = require("@vercel/blob");
          const { blobs } = await list({ prefix: "site_content.json", token: blobToken });
          if (blobs && blobs.length > 0) {
            const blobResp = await fetch(blobs[0].url);
            if (blobResp.ok) {
              const blobData = await blobResp.json();
              return res.status(200).json(blobData);
            }
          }
        } catch (blobErr) {
          console.error("Vercel Blob fetch error:", blobErr);
        }
      }

      // Jika Vercel Storage belum dihubungkan di dashboard
      return res.status(200).json({
        status: "ready",
        storageConfigured: Boolean((kvUrl && kvToken) || blobToken),
        message: "Endpoint Vercel /api/data aktif. Hubungkan Vercel KV atau Blob di dashboard Vercel untuk mengaktifkan database online."
      });
    }

    // ============================================================
    // METODE POST / PUT: Simpan Pembaruan Data dari Panel Admin
    // ============================================================
    if (req.method === "POST" || req.method === "PUT") {
      let body = req.body;
      if (typeof body === "string") {
        try { body = JSON.parse(body); } catch (e) {}
      }

      if (!body || (!body.bio && !body.films && !body.events)) {
        return res.status(400).json({ error: "Payload data tidak valid" });
      }

      body.savedAt = new Date().toISOString();
      body.storageEngine = "Vercel Cloud Storage";

      let saved = false;
      const engines = [];

      // 1. Simpan ke Vercel KV via REST
      if (kvUrl && kvToken) {
        try {
          const resp = await fetch(`${kvUrl}/set/site_content`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${kvToken}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
          });
          if (resp.ok) {
            saved = true;
            engines.push("Vercel KV (Redis)");
          }
        } catch (kvErr) {
          console.error("Vercel KV save error:", kvErr);
        }
      }

      // Coba library @vercel/kv
      if (!saved) {
        try {
          const { kv } = require("@vercel/kv");
          if (kv) {
            await kv.set("site_content", body);
            saved = true;
            engines.push("Vercel KV");
          }
        } catch (e) {}
      }

      // 2. Simpan ke Vercel Blob
      if (blobToken) {
        try {
          const { put } = require("@vercel/blob");
          await put("site_content.json", JSON.stringify(body, null, 2), {
            access: "public",
            addRandomSuffix: false,
            token: blobToken
          });
          saved = true;
          engines.push("Vercel Blob Storage");
        } catch (blobErr) {
          console.error("Vercel Blob save error:", blobErr);
        }
      }

      if (saved) {
        return res.status(200).json({
          success: true,
          message: `Data berhasil disimpan permanen ke ${engines.join(" & ")}!`,
          engines,
          savedAt: body.savedAt
        });
      }

      // Jika belum ada Vercel Storage yang di-binding
      return res.status(200).json({
        success: false,
        requiresStorage: true,
        message: "Endpoint Vercel menerima data, tetapi Vercel KV / Blob belum dihubungkan pada project ini. Silakan buka Vercel Dashboard -> Storage -> Create KV dan hubungkan ke project ini."
      });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("Vercel API error:", error);
    return res.status(500).json({
      error: error.message,
      hint: "Pastikan Vercel KV atau Vercel Blob telah diaktifkan di dashboard Vercel Anda."
    });
  }
};
