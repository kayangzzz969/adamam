/**
 * DATA STORE FOR ADAM XAVIER FANBASE
 * Cloud Database GitHub (kayangzzz969/adamam)
 * Terakhir diperbarui melalui Panel Admin pada: 2/10/2026, 20.41.23
 */

// Hash SHA-256 untuk password admin
const DEFAULT_ADMIN_HASH = "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9";

const DEFAULT_TIMELINE = [
  {
    "id": "tl-1",
    "year": "2021 (Usia 7 Tahun)",
    "title": "Langkah Pertama di Depan Kamera",
    "desc": "Memulai karier sebagai model cilik untuk berbagai iklan komersial susu bernutrisi dan produk mainan mecha robotik. Kemampuan berekspresi secara alami membuatnya dilirik agensi akting."
  },
  {
    "id": "tl-2",
    "year": "2022 (Usia 8 Tahun)",
    "title": "Debut FTV & Serial Drama Keluarga",
    "desc": "Mendapatkan peran pertamanya dalam serial drama keluarga akhir pekan. Karakter anak bungsu yang cerdik dan humoris membuatnya mulai memiliki basis penggemar setia."
  },
  {
    "id": "tl-3",
    "year": "2023 (Usia 9 Tahun)",
    "title": "Terobosan \"Detektif Cilik\" & Penghargaan Perdana",
    "desc": "Berperan sebagai Reza, anak jenius pencipta jam robot dalam film \"Detektif Cilik: Misteri Jam Robot\". Penampilannya meraih nominasi dan memenangkan penghargaan Pemeran Cilik Terfavorit."
  },
  {
    "id": "tl-4",
    "year": "2024 (Usia 10 Tahun)",
    "title": "Merajai Genre Mecha & Superhero Anak",
    "desc": "Membintangi dua karya besar sekaligus: film layar lebar \"Satria Cilik & Mecha Titan\" dan serial laga TV populer \"Ksatria Surya\" (Season 1 & 2). Pada tahun ini fanbase resmi AdamUnited resmi dideklarasikan."
  },
  {
    "id": "tl-5",
    "year": "2025 - 2026 (Sekarang)",
    "title": "Bintang Utama \"Cyber Guardian\" & Voice Actor Transformers",
    "desc": "Dipercaya menjadi pemeran utama Rafa dalam film layar lebar sci-fi berbiaya besar \"Cyber Guardian: Anak Bintang\", serta menjadi pengisi suara resmi dubber karakter anak robotik di serial animasi Transformers Indonesia."
  }
];

const DEFAULT_FACTS = [
  {
    "id": "fact-1",
    "icon": "fa-solid fa-robot",
    "title": "Kolektor Transformers Sejati",
    "desc": "Memiliki lebih dari 45 koleksi robot mecha Transformers, dengan koleksi favorit Bumblebee edisi terbatas."
  },
  {
    "id": "fact-2",
    "icon": "fa-solid fa-medal",
    "title": "Mahir Bela Diri Wushu",
    "desc": "Belajar wushu sejak usia 6 tahun, sehingga mampu melakukan gerakan akrobatik dan adegan laga sendiri dengan aman."
  },
  {
    "id": "fact-3",
    "icon": "fa-solid fa-music",
    "title": "Pemain Drum & Piano Berbakat",
    "desc": "Selain akting, Adam sering mengunggah cover permainan drum lagu-lagu tema Transformers di media sosial."
  },
  {
    "id": "fact-4",
    "icon": "fa-solid fa-laptop-code",
    "title": "Hobi Belajar Coding Game",
    "desc": "Suka membuat mini-game bertema robot menggunakan Scratch dan platform edukasi coding anak."
  },
  {
    "id": "fact-5",
    "icon": "fa-solid fa-book-open",
    "title": "Tetap Juara di Sekolah",
    "desc": "Meski sibuk syuting, Adam selalu menyelesaikan tugas sekolahnya dan berprestasi di mata pelajaran Sains & Bahasa Inggris."
  },
  {
    "id": "fact-6",
    "icon": "fa-solid fa-heart",
    "title": "Sangat Sayang pada AdamUnited",
    "desc": "Selalu menyempatkan waktu membaca surat fans dan membalas pesan para sahabat kecilnya di sela waktu istirahat."
  }
];

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
  },
  "timeline": [
    {
      "id": "tl-1",
      "year": "2021 (Usia 7 Tahun)",
      "title": "Langkah Pertama di Depan Kamera",
      "desc": "Memulai karier sebagai model cilik untuk berbagai iklan komersial susu bernutrisi dan produk mainan mecha robotik. Kemampuan berekspresi secara alami membuatnya dilirik agensi akting."
    },
    {
      "id": "tl-2",
      "year": "2022 (Usia 8 Tahun)",
      "title": "Debut FTV & Serial Drama Keluarga",
      "desc": "Mendapatkan peran pertamanya dalam serial drama keluarga akhir pekan. Karakter anak bungsu yang cerdik dan humoris membuatnya mulai memiliki basis penggemar setia."
    },
    {
      "id": "tl-3",
      "year": "2023 (Usia 9 Tahun)",
      "title": "Terobosan \"Detektif Cilik\" & Penghargaan Perdana",
      "desc": "Berperan sebagai Reza, anak jenius pencipta jam robot dalam film \"Detektif Cilik: Misteri Jam Robot\". Penampilannya meraih nominasi dan memenangkan penghargaan Pemeran Cilik Terfavorit."
    },
    {
      "id": "tl-4",
      "year": "2024 (Usia 10 Tahun)",
      "title": "Merajai Genre Mecha & Superhero Anak",
      "desc": "Membintangi dua karya besar sekaligus: film layar lebar \"Satria Cilik & Mecha Titan\" dan serial laga TV populer \"Ksatria Surya\" (Season 1 & 2). Pada tahun ini fanbase resmi AdamUnited resmi dideklarasikan."
    },
    {
      "id": "tl-5",
      "year": "2025 - 2026 (Sekarang)",
      "title": "Bintang Utama \"Cyber Guardian\" & Voice Actor Transformers",
      "desc": "Dipercaya menjadi pemeran utama Rafa dalam film layar lebar sci-fi berbiaya besar \"Cyber Guardian: Anak Bintang\", serta menjadi pengisi suara resmi dubber karakter anak robotik di serial animasi Transformers Indonesia."
    }
  ],
  "facts": [
    {
      "id": "fact-1",
      "icon": "fa-solid fa-robot",
      "title": "Kolektor Transformers Sejati",
      "desc": "Memiliki lebih dari 45 koleksi robot mecha Transformers, dengan koleksi favorit Bumblebee edisi terbatas."
    },
    {
      "id": "fact-2",
      "icon": "fa-solid fa-medal",
      "title": "Mahir Bela Diri Wushu",
      "desc": "Belajar wushu sejak usia 6 tahun, sehingga mampu melakukan gerakan akrobatik dan adegan laga sendiri dengan aman."
    },
    {
      "id": "fact-3",
      "icon": "fa-solid fa-music",
      "title": "Pemain Drum & Piano Berbakat",
      "desc": "Selain akting, Adam sering mengunggah cover permainan drum lagu-lagu tema Transformers di media sosial."
    },
    {
      "id": "fact-4",
      "icon": "fa-solid fa-laptop-code",
      "title": "Hobi Belajar Coding Game",
      "desc": "Suka membuat mini-game bertema robot menggunakan Scratch dan platform edukasi coding anak."
    },
    {
      "id": "fact-5",
      "icon": "fa-solid fa-book-open",
      "title": "Tetap Juara di Sekolah",
      "desc": "Meski sibuk syuting, Adam selalu menyelesaikan tugas sekolahnya dan berprestasi di mata pelajaran Sains & Bahasa Inggris."
    },
    {
      "id": "fact-6",
      "icon": "fa-solid fa-heart",
      "title": "Sangat Sayang pada AdamUnited",
      "desc": "Selalu menyempatkan waktu membaca surat fans dan membalas pesan para sahabat kecilnya di sela waktu istirahat."
    }
  ]
};

const DEFAULT_FILMS = [
  {
    "id": "film-1",
    "title": "Cyber Guardian: Anak Bintang",
    "year": "2025",
    "role": "Rafa (Pemeran Utama)",
    "genre": "Sci-Fi, Petualangan, Keluarga",
    "status": "Sedang Tayang",
    "rating": "4.9 / 5.0",
    "synopsis": "Rafa menemukan komponen robot luar angkasa purba yang jatuh di dekat rumahnya. Bersama sang robot pelindung bernama Zephyr, Rafa harus menyelamatkan kotanya dari ancaman kecerdasan buatan nakal.",
    "image": "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80",
    "badge": "Film Layar Lebar",
    "trailerUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    "id": "film-5",
    "title": "Ksatria Surya (Season 1 & 2)",
    "year": "2024",
    "role": "Bayu / Mini Solar Knight",
    "genre": "Serial TV Superhero Anak",
    "status": "Tayang Tiap Akhir Pekan",
    "rating": "4.9 / 5.0",
    "synopsis": "Serial aksi penuh visual efek memukau yang menceritakan Bayu, anak laki-laki yang meminjam kekuatan cahaya matahari untuk melindungi kawan-kawannya dari kegelapan.",
    "image": "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80",
    "badge": "Serial TV No.1",
    "trailerUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
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
    "id": "event-1",
    "title": "Transformers Movie Night & Meet Adam Xavier",
    "date": "18 Oktober 2026",
    "time": "14:00 - 18:00 WIB",
    "location": "Cyber Arena Cineplex & Live Stream Zoom",
    "status": "Upcoming",
    "badge": "Akan Datang",
    "description": "Nonton bareng film Transformers favorit bersama Adam Xavier! Dilengkapi sesi tanya-jawab interaktif, pameran kostum mecha Bumblebee, dan photo booth eksklusif untuk seluruh anggota AdamUnited.",
    "registrationOpen": true,
    "quota": "150 Kursi Terbatas",
    "winners": []
  },
  {
    "id": "event-2",
    "title": "Lomba Desain Robot Mecha & Fanart AdamUnited",
    "date": "10 - 25 September 2026",
    "time": "Pengumuman Pemenang Selesai",
    "location": "Instagram & Website Resmi Fanbase",
    "status": "Completed",
    "badge": "Selesai",
    "description": "Kompetisi kreasi robot transformer dan lukisan karakter Adam Xavier oleh para penggemar di seluruh nusantara.",
    "registrationOpen": false,
    "quota": "350 Karya Diterima",
    "winners": [
      {
        "rank": "Juara 1",
        "name": "Kevin Raditya (Bandung)",
        "work": "Mecha Adam 'Gold Striker'",
        "prize": "Miniatur Transformers Eksklusif + Video Call 1-on-1 dengan Adam Xavier"
      },
      {
        "rank": "Juara 2",
        "name": "Sarah Putri (Surabaya)",
        "work": "Fanart Digital 'Bumblebee & Adam'",
        "prize": "Hoodie Resmi AdamUnited Edisi Emas + Poster Bertanda Tangan Asli"
      },
      {
        "rank": "Juara 3",
        "name": "Dimas Arya (Jakarta)",
        "work": "Custom LEGO Cyber-Adam",
        "prize": "Merchandise Box AdamUnited + Topi Robotik"
      },
      {
        "rank": "Juara Favorit",
        "name": "Ayla & Bintang (Yogyakarta)",
        "work": "Stopmotion LEGO Transformers",
        "prize": "Paket Aksesoris Fanbase & Sertifikat Khusus"
      }
    ]
  },
  {
    "id": "event-3",
    "title": "Workshop Voice Acting & Akting Cilik bareng Adam",
    "date": "12 November 2026",
    "time": "10:00 - 15:30 WIB",
    "location": "Studio Creative Sound Jakarta & Hybrid Class",
    "status": "Upcoming",
    "badge": "Pendaftaran Dibuka",
    "description": "Pelatihan khusus bagi teman-teman yang ingin belajar teknik vokal dubbing animasi kartun dan dasar ekspresi panggung bersama Adam Xavier dan instruktur profesional.",
    "registrationOpen": true,
    "quota": "50 Peserta",
    "winners": []
  },
  {
    "id": "event-4",
    "title": "Special Gathering Ulang Tahun Adam Xavier",
    "date": "15 Mei 2026",
    "time": "15:00 - 19:00 WIB",
    "location": "Hall Cyber Playland Jakarta",
    "status": "Completed",
    "badge": "Selesai",
    "description": "Perayaan ulang tahun Adam yang ke-12 bersama perwakilan fans dari berbagai kota, kue bertema Cybertron, dan bagi-bagi merchandise.",
    "registrationOpen": false,
    "quota": "100 Hadirin",
    "winners": [
      {
        "rank": "Pemenang Doorprize Utama",
        "name": "Nadia Anggraini",
        "work": "Tiket Undian No. #042",
        "prize": "Jaket Transformers Bumblebee Original bertanda tangan Adam"
      },
      {
        "rank": "Pemenang Kuis Trivia",
        "name": "Rizky Pratama",
        "work": "Skor 100/100 Trivia Film Adam",
        "prize": "Action Figure Autobot Edisi Kolektor"
      },
      {
        "rank": "Best Costume",
        "name": "Clarissa S. (Kostum Cyber Hero)",
        "work": "Cosplay Mecha",
        "prize": "Special Giftbox AdamUnited"
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
  getTimeline: function() {
    const bio = this.getBio();
    return (bio && Array.isArray(bio.timeline) && bio.timeline.length > 0) ? bio.timeline : (typeof DEFAULT_TIMELINE !== 'undefined' ? DEFAULT_TIMELINE : []);
  },
  saveTimeline: function(timelineList, options) {
    const bio = Object.assign({}, this.getBio());
    bio.timeline = Array.isArray(timelineList) ? timelineList.slice() : [];
    this.saveBio(bio, options);
  },
  getFacts: function() {
    const bio = this.getBio();
    return (bio && Array.isArray(bio.facts) && bio.facts.length > 0) ? bio.facts : (typeof DEFAULT_FACTS !== 'undefined' ? DEFAULT_FACTS : []);
  },
  saveFacts: function(factsList, options) {
    const bio = Object.assign({}, this.getBio());
    bio.facts = Array.isArray(factsList) ? factsList.slice() : [];
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
