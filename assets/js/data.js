/**
 * DATA STORE FOR ADAM XAVIER FANBASE
 * Cloud Database GitHub (kayangzzz969/adamam)
 * Terakhir diperbarui melalui Panel Admin pada: 1/10/2026, 21.26.54
 */

// Hash SHA-256 untuk password admin
const DEFAULT_ADMIN_HASH = "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9";

const DEFAULT_BIO = {
  "name": "Adam Xavier",
  "nickname": "Adam / Xavi",
  "birthdate": "15 Mei 2014",
  "age": 12,
  "domicile": "Jakarta, Indonesia",
  "fanbaseName": "AdamUnited",
  "tagline": "The Young Cyber Hero",
  "profession": "Aktor Cilik • Voice Actor • Robot Enthusiast",
  "favoriteRobot": "Bumblebee & Optimus Prime (Transformers)",
  "hobbies": [
    "Bermain Robotic & LEGO Transformers",
    "Martial Arts / Wushu",
    "Piano & Drum",
    "Coding Game"
  ],
  "motto": "Transform and Rise Up! Setiap peran adalah petualangan baru.",
  "about1": "Adam Xavier lahir di Jakarta pada 15 Mei 2014. Sejak balita, Adam memiliki ketertarikan luar biasa terhadap figur robot, animasi sains fiksi, dan seni peran. Memulai langkah pertamanya di industri hiburan pada usia 7 tahun, kepribadian Adam yang santun, ekspresif, dan berjiwa petualang langsung memikat hati para sutradara serta penonton Indonesia.",
  "about2": "Terinspirasi oleh karakter favoritnya, Bumblebee dan Optimus Prime, Adam selalu memegang teguh prinsip keberanian dan kerja keras. Di lokasi syuting film laga maupun drama anak, Adam dikenal sebagai aktor cilik yang penuh dedikasi, mampu melakukan adegan aksi dengan bimbingan pelatih, namun tetap ceria dan rajin belajar di sela waktu syuting.",
  "quoteInspiration": "Transform and Rise Up! Di setiap peran baru, kita belajar memahami perasaan orang lain dan bertransformasi menjadi versi terbaik dari diri kita sendiri.",
  "avatar": "assets/images/adam_avatar.jpeg",
  "music": {
    "title": "Transformers: Cyber Spark of Courage",
    "artist": "Adam Xavier Official Fanbase Anthem",
    "url": "assets/audio/anthem.mp3"
  },
  "socials": {
    "instagram": "https://instagram.com",
    "tiktok": "https://tiktok.com",
    "youtube": "https://youtube.com",
    "whatsapp": "https://whatsapp.com"
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
    "synopsis": "."
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
    "synopsis": ".."
  },
  {
    "id": "film-6",
    "title": "Transformers: Next Sparks (Indonesian Dub)",
    "year": "2025",
    "role": "Suara Karakter Sparks & Toby",
    "genre": "Animasi Sulih Suara",
    "status": "Official Dubbing",
    "rating": "5.0 / 5.0",
    "synopsis": "Adam Xavier dipercaya mengisi suara karakter anak robotik di versi resmi bahasa Indonesia, membawa nuansa ceria dan energik yang dicintai seluruh fans Transformers cilik!",
    "image": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80",
    "badge": "Official Voice Actor",
    "trailerUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }
];

const DEFAULT_EVENTS = [
  {
    "id": "event-4",
    "title": "Pemenang Google Meet With Adam",
    "date": "2 October 2026",
    "time": "-",
    "location": "Online",
    "status": "Upcoming",
    "description": "Pemenang Dari Spin Wheel Untuk Google Meet Bersama Adam",
    "registrationOpen": true,
    "quota": "Tersedia",
    "winners": []
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
