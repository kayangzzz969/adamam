/**
 * DATA STORE FOR ADAM XAVIER FANBASE
 * Cloud Database GitHub (kayangzzz969/adamam)
 * Terakhir diperbarui melalui Panel Admin pada: 2/10/2026, 16.48.09
 */

// Hash SHA-256 untuk password admin
const DEFAULT_ADMIN_HASH = "c8aaa7aae95d29c54dc66721deeb9f1479d56443e2cdebe598eecbe94aea55a7";

const DEFAULT_BIO = {
  "name": "Adam Xavier",
  "nickname": "Adam",
  "birthdate": "28 Agustus 2018",
  "age": 8,
  "domicile": "Jakarta, Indonesia",
  "fanbaseName": "AdamUnited",
  "tagline": "The Young Cyber Hero",
  "profession": "Aktor Cilik • Voice Actor",
  "favoriteRobot": "Bumblebee & Optimus Prime (Transformers)",
  "hobbies": [
    "Bermain Robotic & LEGO Transformers",
    "Martial Arts / Wushu",
    "Piano & Drum",
    "Coding Game"
  ],
  "motto": "-",
  "about1": "• Akting yang Natural dan Ekspresif: Adam dinilai memiliki kemampuan akting yang sangat organik. Salah satu kelebihan utamanya yang dipuji oleh sutradara dan produser adalah kemampuannya untuk melakukan adegan emosional, seperti menangis secara spontan tanpa bantuan alat bantu.\n\n• Kepribadian yang Ceria di Lokasi Syuting: Meskipun mampu berakting serius saat kamera menyala, Adam dikenal sebagai anak yang periang di dunia nyata. Ia mudah membaur dan membangun kedekatan (chemistry) dengan aktor lawan mainnya, contohnya lewat aktivitas bermain bersama di sela-sela syuting.\n\n• Penghidup Suasana: Kehadiran Adam dalam film drama keluarga dinilai sukses menghidupkan dinamika cerita dan memberikan warna tersendiri bagi penonton.",
  "about2": "-",
  "quoteInspiration": "-",
  "avatar": "assets/images/adam_avatar.jpeg",
  "socials": {
    "instagram": "https://instagram.com",
    "tiktok": "https://tiktok.com",
    "youtube": "https://youtube.com",
    "whatsapp": "https://whatsapp.com"
  },
  "music": {
    "title": "Transformers: Cyber Spark of Courage",
    "artist": "Adam Xavier Official Fanbase Anthem",
    "url": "assets/audio/anthem.mp3"
  }
};

const DEFAULT_FILMS = [
  {
    "id": "film-4",
    "title": "Senin Harga Naik",
    "year": "2026",
    "badge": "Film Layar Lebar",
    "role": "Alviero",
    "genre": "Drama Dan Keluarga",
    "rating": "8.9 / 10.0",
    "image": "https://nos.jkt-1.neo.id/media.cinema21.co.id/movie-images/16SHNK.jpg",
    "trailerUrl": "https://youtu.be/_OtkOB3QA64?si=Og9Bs5DEE9W4T6yK",
    "synopsis": "Pertengkaran Mutia (Nadya Arina) dengan Ibunya, Retno (Meriam Bellina) membuatnya pergi dari rumah untuk membuktikan dirinya bisa sukses secara mandiri. Tiga tahun berlalu, promosi karir Mutia di perusahaan property tersandung proyek penggusuran Mercusuar, toko roti legendaris milik Retno. Tidak ada pilihan lain, Mutia kembali ke rumah, dan bekerja sama dengan kakak dan adiknya untuk melunakkan hati ibunya agar mau menjual Mercusuar.\n"
  },
  {
    "id": "film-5",
    "title": "Kado Untuk Ibu",
    "year": "2026",
    "badge": "Film Layar Lebar",
    "role": "Bumi",
    "genre": "Drama Dan Keluarga",
    "rating": "8.9 / 10.0",
    "image": "https://nos.jkt-1.neo.id/media.cinema21.co.id/movie-images/16KUIU.jpg",
    "trailerUrl": "https://youtu.be/fKY3_e8eF50?si=9TdWP86skmQ4SHEJ",
    "synopsis": "FARIS (Emir Mahira), seorang damkar yang menanti kelahiran anak pertamanya, batal ke RS untuk damping istrinya karena harus membantu ARA (Luisa Adreena) mencari kado ulang tahun untuk ibunya. Perjalanan mereka menjadi petualangan seru yang mengajarkan banyak kebaikan juga memaknai kehilangan tak terduga."
  },
  {
    "id": "film-6",
    "title": "Air Mata Di Ujung Sajadah",
    "year": "2025",
    "badge": "Film Layar Lebar",
    "role": "Fathan Kecil",
    "genre": "Drama Dan Keluarga",
    "rating": "6.5 / 10.0",
    "image": "https://nos.jkt-1.neo.id/media.cinema21.co.id/movie-images/15AMD2.jpg",
    "trailerUrl": "https://youtu.be/4Jo4me9Osoo?si=0yG0pkHl4JYFOX6d",
    "synopsis": "Aqilla (Titi Kamal) dilanda kekhawatiran karena tidak lagi dapat menghubungi Yumna (Citra Kirana), ibu angkat Baskara (Faqih Alaydrus). Adapun Baskara adalah anak kandungnya yang ia relakan untuk diadopsi oleh Yumna dan suaminya, Arif (Fedi Nuril). Bertahun-tahun sebelumnya, Aqilla terpaksa mengambil keputusan sulit tersebut karena sejumlah kondisi. Selama itu, ia hanya bisa mengikuti perkembangan anaknya melalui unggahan media sosial Yumna, berharap suatu saat takdir mempertemukan mereka kembali."
  }
];

const DEFAULT_EVENTS = [
  {
    "id": "event-4",
    "title": "Pemenang Google Meet With Adam",
    "date": "2 October 2026",
    "time": "-",
    "location": "Online",
    "status": "Completed",
    "description": "Pemenang Dari Spin Wheel Untuk Google Meet Bersama Adam",
    "registrationOpen": false,
    "quota": "Tersedia",
    "winners": [
      {
        "rank": "Pemenang 1",
        "name": "Nimas",
        "work": "-",
        "prize": "Online Meet With Adam"
      },
      {
        "rank": "Pemenang 2",
        "name": "Dinda",
        "work": "-",
        "prize": "Online Meet With Adam"
      },
      {
        "rank": "Pemenang 3",
        "name": "Nadya",
        "work": "-",
        "prize": "Online Meet With Adam"
      },
      {
        "rank": "Pemenang 4",
        "name": "Tirta",
        "work": "-",
        "prize": "Online Meet With Adam"
      },
      {
        "rank": "Pemenang 5",
        "name": "Fakhira",
        "work": "-",
        "prize": "Online Meet With Adam"
      },
      {
        "rank": "Pemenang 6",
        "name": "Vanessa",
        "work": "-",
        "prize": "Online Meet With Adam"
      },
      {
        "rank": "Pemenang 7",
        "name": "Tata",
        "work": "-",
        "prize": "Online Meet With Adam"
      }
    ]
  }
];

// Bersihkan cache lama di localStorage agar data 100% murni dari GitHub
if (typeof localStorage !== 'undefined') {
  try {
    localStorage.removeItem("ax_bio");
    localStorage.removeItem("ax_films");
    localStorage.removeItem("ax_events");
  } catch (e) {}
}

// In-Memory Live Store (Single Source of Truth: GitHub Repository)
let _currentBio = null;
let _currentFilms = null;
let _currentEvents = null;
let _currentAdminHash = null;

// Helper Functions
const FanbaseStore = {
  getAdminHash: function() {
    return _currentAdminHash || (typeof DEFAULT_ADMIN_HASH !== 'undefined' ? DEFAULT_ADMIN_HASH : "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9");
  },
  saveAdminHash: function(hash) {
    _currentAdminHash = hash;
  },
  getBio: function() {
    return _currentBio || DEFAULT_BIO;
  },
  saveBio: function(bio, options) {
    _currentBio = Object.assign({}, DEFAULT_BIO, bio);
    if (options && options.allowLocalStorage === true && typeof localStorage !== 'undefined') {
      localStorage.setItem("ax_bio", JSON.stringify(_currentBio));
    }
  },
  getMusic: function() {
    const bio = this.getBio();
    return (bio && bio.music) ? bio.music : {
      title: "Transformers: Cyber Spark of Courage",
      artist: "Adam Xavier Official Fanbase Anthem",
      url: "assets/audio/anthem.mp3"
    };
  },
  saveMusic: function(musicObj, options) {
    const bio = Object.assign({}, this.getBio());
    bio.music = Object.assign({}, this.getMusic(), musicObj);
    this.saveBio(bio, options);
  },
  getFilms: function() {
    return _currentFilms || DEFAULT_FILMS;
  },
  saveFilms: function(films, options) {
    _currentFilms = Array.isArray(films) ? films.slice() : DEFAULT_FILMS;
    if (options && options.allowLocalStorage === true && typeof localStorage !== 'undefined') {
      localStorage.setItem("ax_films", JSON.stringify(_currentFilms));
    }
  },
  getEvents: function() {
    return _currentEvents || DEFAULT_EVENTS;
  },
  saveEvents: function(events, options) {
    _currentEvents = Array.isArray(events) ? events.slice() : DEFAULT_EVENTS;
    if (options && options.allowLocalStorage === true && typeof localStorage !== 'undefined') {
      localStorage.setItem("ax_events", JSON.stringify(_currentEvents));
    }
  },
  resetToDefault: function(options) {
    _currentBio = Object.assign({}, DEFAULT_BIO);
    _currentFilms = DEFAULT_FILMS.slice();
    _currentEvents = DEFAULT_EVENTS.slice();
    if (options && options.allowLocalStorage === true && typeof localStorage !== 'undefined') {
      localStorage.setItem("ax_bio", JSON.stringify(DEFAULT_BIO));
      localStorage.setItem("ax_films", JSON.stringify(DEFAULT_FILMS));
      localStorage.setItem("ax_events", JSON.stringify(DEFAULT_EVENTS));
    }
  },
  // Sinkronisasi otomatis dari Cloud Database (GitHub Raw & Fallbacks)
  initCloudSync: async function(onUpdatedCallback) {
    let cloudData = null;
    const githubRepo = (typeof localStorage !== 'undefined' && localStorage.getItem('ax_github_repo')) || 'kayangzzz969/adamam';
    const githubBranch = (typeof localStorage !== 'undefined' && localStorage.getItem('ax_github_branch')) || 'main';
    const githubRawUrl = "https://raw.githubusercontent.com/" + githubRepo + "/" + githubBranch + "/assets/js/data.js?_t=" + Date.now();

    // 1. Ambil data real-time langsung dari GitHub Raw (Cloud Database Utama)
    try {
      const ghResp = await fetch(githubRawUrl, { cache: 'no-store' });
      if (ghResp.ok) {
        const text = await ghResp.text();
        const parsed = FanbaseStore._parseDataJs(text);
        if (parsed && (parsed.bio || parsed.films || parsed.events || parsed.adminHash)) {
          cloudData = parsed;
          console.log("[CloudSync] Data berhasil disinkronkan langsung dari GitHub Raw (" + githubRepo + ").");
        }
      }
    } catch (ghErr) {
      console.warn('[CloudSync] Fallback dari GitHub Raw:', ghErr.message);
    }

    // 2. Cek Serverless Function /api/data (Vercel KV / Netlify Storage)
    if (!cloudData) {
      try {
        const resp = await fetch('/api/data', { method: 'GET' });
        if (resp.ok) {
          const json = await resp.json();
          if (json && (json.bio || json.films || json.events)) {
            cloudData = json;
            console.log('[CloudSync] Data berhasil disinkronkan dari /api/data.');
          }
        }
      } catch (e) {}
    }

    // Jika cloudData ditemukan, perbarui cache in-memory & jalankan callback (TIDAK menyentuh LocalStorage)
    if (cloudData) {
      let updated = false;
      if (cloudData.adminHash) {
        _currentAdminHash = cloudData.adminHash;
        updated = true;
      }
      if (cloudData.bio) {
        _currentBio = Object.assign({}, DEFAULT_BIO, cloudData.bio);
        updated = true;
      }
      if (cloudData.films && Array.isArray(cloudData.films)) {
        _currentFilms = cloudData.films.slice();
        updated = true;
      }
      if (cloudData.events && Array.isArray(cloudData.events)) {
        _currentEvents = cloudData.events.slice();
        updated = true;
      }
      if (updated && typeof onUpdatedCallback === 'function') {
        onUpdatedCallback(cloudData);
      }
      return cloudData;
    }
    return null;
  },
  _parseDataJs: function(text) {
    if (!text) return null;
    let bio = null, films = null, events = null, adminHash = null;
    try {
      const hashMatch = text.match(/const\s+DEFAULT_ADMIN_HASH\s*=\s*([\s\S]*?);/);
      if (hashMatch) adminHash = JSON.parse(hashMatch[1].trim());

      const bioMatch = text.match(/const\s+DEFAULT_BIO\s*=\s*([\s\S]*?);\s*const\s+DEFAULT_FILMS/);
      if (bioMatch) bio = JSON.parse(bioMatch[1].trim());

      const filmsMatch = text.match(/const\s+DEFAULT_FILMS\s*=\s*([\s\S]*?);\s*const\s+DEFAULT_EVENTS/);
      if (filmsMatch) films = JSON.parse(filmsMatch[1].trim());

      const eventsMatch = text.match(/const\s+DEFAULT_EVENTS\s*=\s*([\s\S]*?);\s*(?:\/\/|\/\*|const\s+FanbaseStore|$)/);
      if (eventsMatch) events = JSON.parse(eventsMatch[1].trim());
    } catch (e) {
      console.warn('[CloudSync] Parse error:', e);
    }
    if (bio || films || events || adminHash) {
      return { bio, films, events, adminHash };
    }
    return null;
  }
};
