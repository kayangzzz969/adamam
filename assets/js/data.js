/**
 * DATA STORE FOR ADAM XAVIER FANBASE
 * Menyimpan data bio, filmografi, dan event fanbase.
 * Terhubung dengan LocalStorage agar perubahan dari Admin langsung aktif!
 */

const DEFAULT_BIO = {
  name: "Adam Xavier",
  nickname: "Adam / Xavi",
  birthdate: "15 Mei 2014",
  age: 12,
  domicile: "Jakarta, Indonesia",
  fanbaseName: "AdamUnited",
  tagline: "The Young Cyber Hero",
  profession: "Aktor Cilik • Voice Actor • Robot Enthusiast",
  favoriteRobot: "Bumblebee & Optimus Prime (Transformers)",
  hobbies: ["Bermain Robotic & LEGO Transformers", "Martial Arts / Wushu", "Piano & Drum", "Coding Game"],
  motto: "Transform and Rise Up! Setiap peran adalah petualangan baru.",
  about1: "Adam Xavier lahir di Jakarta pada 15 Mei 2014. Sejak balita, Adam memiliki ketertarikan luar biasa terhadap figur robot, animasi sains fiksi, dan seni peran. Memulai langkah pertamanya di industri hiburan pada usia 7 tahun, kepribadian Adam yang santun, ekspresif, dan berjiwa petualang langsung memikat hati para sutradara serta penonton Indonesia.",
  about2: "Terinspirasi oleh karakter favoritnya, Bumblebee dan Optimus Prime, Adam selalu memegang teguh prinsip keberanian dan kerja keras. Di lokasi syuting film laga maupun drama anak, Adam dikenal sebagai aktor cilik yang penuh dedikasi, mampu melakukan adegan aksi dengan bimbingan pelatih, namun tetap ceria dan rajin belajar di sela waktu syuting.",
  quoteInspiration: "Transform and Rise Up! Di setiap peran baru, kita belajar memahami perasaan orang lain dan bertransformasi menjadi versi terbaik dari diri kita sendiri.",
  avatar: "assets/images/adam_avatar.jpeg",
  socials: {
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    youtube: "https://youtube.com",
    whatsapp: "https://whatsapp.com"
  }
};

const DEFAULT_FILMS = [
  {
    id: "film-1",
    title: "Cyber Guardian: Anak Bintang",
    year: "2025",
    role: "Rafa (Pemeran Utama)",
    genre: "Sci-Fi, Petualangan, Keluarga",
    status: "Sedang Tayang",
    rating: "4.9 / 5.0",
    synopsis: "Rafa menemukan komponen robot luar angkasa purba yang jatuh di dekat rumahnya. Bersama sang robot pelindung bernama Zephyr, Rafa harus menyelamatkan kotanya dari ancaman kecerdasan buatan nakal.",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80",
    badge: "Film Layar Lebar",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "film-2",
    title: "Satria Cilik & Mecha Titan",
    year: "2024",
    role: "Danu (Pilot Mecha Muda)",
    genre: "Aksi, Mecha, Fantasi",
    status: "Tersedia di Streaming",
    rating: "4.8 / 5.0",
    synopsis: "Ketika monster besi menyerang pesisir Nusantara, Danu terpilih secara tak sengaja menjadi pilot robot Mecha Titan generasi terbaru berkat refleks kilat dan keberaniannya.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
    badge: "Box Office Hit",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "film-3",
    title: "Petualangan Rahasia Musim Panas",
    year: "2024",
    role: "Bima (Penyelidik Cerdik)",
    genre: "Komedi, Petualangan, Sahabat",
    status: "Streaming Exclusive",
    rating: "4.7 / 5.0",
    synopsis: "Liburan sekolah berubah menjadi perburuan teka-teki harta karun berteknologi tinggi ketika Bima dan teman-temannya menemukan peta peninggalan sang kakek di loteng tua.",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
    badge: "Festival Film Anak",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "film-4",
    title: "Detektif Cilik: Misteri Jam Robot",
    year: "2023",
    role: "Reza (Jenius Gadget)",
    genre: "Misteri, Detektif",
    status: "Rilis Resmi",
    rating: "4.6 / 5.0",
    synopsis: "Reza menggunakan jam tangan robot buatannya untuk mengumpulkan petunjuk dan mengungkap misteri hilangnya prototipe sains di museum nasional.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    badge: "Pemenang Penghargaan",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "film-5",
    title: "Ksatria Surya (Season 1 & 2)",
    year: "2024",
    role: "Bayu / Mini Solar Knight",
    genre: "Serial TV Superhero Anak",
    status: "Tayang Tiap Akhir Pekan",
    rating: "4.9 / 5.0",
    synopsis: "Serial aksi penuh visual efek memukau yang menceritakan Bayu, anak laki-laki yang meminjam kekuatan cahaya matahari untuk melindungi kawan-kawannya dari kegelapan.",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80",
    badge: "Serial TV No.1",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "film-6",
    title: "Transformers: Next Sparks (Indonesian Dub)",
    year: "2025",
    role: "Suara Karakter Sparks & Toby",
    genre: "Animasi Sulih Suara",
    status: "Official Dubbing",
    rating: "5.0 / 5.0",
    synopsis: "Adam Xavier dipercaya mengisi suara karakter anak robotik di versi resmi bahasa Indonesia, membawa nuansa ceria dan energik yang dicintai seluruh fans Transformers cilik!",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80",
    badge: "Official Voice Actor",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }
];

const DEFAULT_EVENTS = [
  {
    id: "event-1",
    title: "Transformers Movie Night & Meet Adam Xavier",
    date: "18 Oktober 2026",
    time: "14:00 - 18:00 WIB",
    location: "Cyber Arena Cineplex & Live Stream Zoom",
    status: "Upcoming",
    badge: "Akan Datang",
    description: "Nonton bareng film Transformers favorit bersama Adam Xavier! Dilengkapi sesi tanya-jawab interaktif, pameran kostum mecha Bumblebee, dan photo booth eksklusif untuk seluruh anggota AdamUnited.",
    registrationOpen: true,
    quota: "150 Kursi Terbatas",
    winners: []
  },
  {
    id: "event-2",
    title: "Lomba Desain Robot Mecha & Fanart AdamUnited",
    date: "10 - 25 September 2026",
    time: "Pengumuman Pemenang Selesai",
    location: "Instagram & Website Resmi Fanbase",
    status: "Completed",
    badge: "Selesai",
    description: "Kompetisi kreasi robot transformer dan lukisan karakter Adam Xavier oleh para penggemar di seluruh nusantara.",
    registrationOpen: false,
    quota: "350 Karya Diterima",
    winners: [
      { rank: "Juara 1", name: "Kevin Raditya (Bandung)", work: "Mecha Adam 'Gold Striker'", prize: "Miniatur Transformers Eksklusif + Video Call 1-on-1 dengan Adam Xavier" },
      { rank: "Juara 2", name: "Sarah Putri (Surabaya)", work: "Fanart Digital 'Bumblebee & Adam'", prize: "Hoodie Resmi AdamUnited Edisi Emas + Poster Bertanda Tangan Asli" },
      { rank: "Juara 3", name: "Dimas Arya (Jakarta)", work: "Custom LEGO Cyber-Adam", prize: "Merchandise Box AdamUnited + Topi Robotik" },
      { rank: "Juara Favorit", name: "Ayla & Bintang (Yogyakarta)", work: "Stopmotion LEGO Transformers", prize: "Paket Aksesoris Fanbase & Sertifikat Khusus" }
    ]
  },
  {
    id: "event-3",
    title: "Workshop Voice Acting & Akting Cilik bareng Adam",
    date: "12 November 2026",
    time: "10:00 - 15:30 WIB",
    location: "Studio Creative Sound Jakarta & Hybrid Class",
    status: "Upcoming",
    badge: "Pendaftaran Dibuka",
    description: "Pelatihan khusus bagi teman-teman yang ingin belajar teknik vokal dubbing animasi kartun dan dasar ekspresi panggung bersama Adam Xavier dan instruktur profesional.",
    registrationOpen: true,
    quota: "50 Peserta",
    winners: []
  },
  {
    id: "event-4",
    title: "Special Gathering Ulang Tahun Adam Xavier",
    date: "15 Mei 2026",
    time: "15:00 - 19:00 WIB",
    location: "Hall Cyber Playland Jakarta",
    status: "Completed",
    badge: "Selesai",
    description: "Perayaan ulang tahun Adam yang ke-12 bersama perwakilan fans dari berbagai kota, kue bertema Cybertron, dan bagi-bagi merchandise.",
    registrationOpen: false,
    quota: "100 Hadirin",
    winners: [
      { rank: "Pemenang Doorprize Utama", name: "Nadia Anggraini", work: "Tiket Undian No. #042", prize: "Jaket Transformers Bumblebee Original bertanda tangan Adam" },
      { rank: "Pemenang Kuis Trivia", name: "Rizky Pratama", work: "Skor 100/100 Trivia Film Adam", prize: "Action Figure Autobot Edisi Kolektor" },
      { rank: "Best Costume", name: "Clarissa S. (Kostum Cyber Hero)", work: "Cosplay Mecha", prize: "Special Giftbox AdamUnited" }
    ]
  }
];

// Helper Functions
const FanbaseStore = {
  getBio: function() {
    const raw = localStorage.getItem("ax_bio");
    if (!raw) {
      localStorage.setItem("ax_bio", JSON.stringify(DEFAULT_BIO));
      return DEFAULT_BIO;
    }
    try {
      const parsed = JSON.parse(raw);
      const merged = Object.assign({}, DEFAULT_BIO, parsed);
      if (!merged.fanbaseName || merged.fanbaseName === "XavierBots") {
        merged.fanbaseName = "AdamUnited";
        localStorage.setItem("ax_bio", JSON.stringify(merged));
      }
      return merged;
    } catch (e) {
      return DEFAULT_BIO;
    }
  },
  saveBio: function(bio) {
    localStorage.setItem("ax_bio", JSON.stringify(bio));
  },
  getFilms: function() {
    const raw = localStorage.getItem("ax_films");
    if (!raw) {
      localStorage.setItem("ax_films", JSON.stringify(DEFAULT_FILMS));
      return DEFAULT_FILMS;
    }
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      return DEFAULT_FILMS;
    } catch (e) {
      return DEFAULT_FILMS;
    }
  },
  saveFilms: function(films) {
    localStorage.setItem("ax_films", JSON.stringify(films));
  },
  getEvents: function() {
    const raw = localStorage.getItem("ax_events");
    if (!raw) {
      localStorage.setItem("ax_events", JSON.stringify(DEFAULT_EVENTS));
      return DEFAULT_EVENTS;
    }
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      return DEFAULT_EVENTS;
    } catch (e) {
      return DEFAULT_EVENTS;
    }
  },
  saveEvents: function(events) {
    localStorage.setItem("ax_events", JSON.stringify(events));
  },
  resetToDefault: function() {
    localStorage.setItem("ax_bio", JSON.stringify(DEFAULT_BIO));
    localStorage.setItem("ax_films", JSON.stringify(DEFAULT_FILMS));
    localStorage.setItem("ax_events", JSON.stringify(DEFAULT_EVENTS));
  },
  // Sinkronisasi otomatis dari Cloud / Netlify Storage
  initCloudSync: async function(onUpdatedCallback) {
    let cloudData = null;

    // 1. Cek Netlify Storage via Serverless Function /api/data
    try {
      const resp = await fetch('/api/data', { method: 'GET' });
      if (resp.ok) {
        const json = await resp.json();
        if (json && (json.bio || json.films || json.events)) {
          cloudData = json;
          console.log('[CloudSync] Data berhasil disinkronkan dari Netlify Storage / Local API.');
        }
      }
    } catch (e) {}

    // 2. Cek Cloud Storage Mandiri (JSONBin.io) jika dikonfigurasi
    if (!cloudData) {
      try {
        const rawCfg = localStorage.getItem('ax_cloud_config');
        if (rawCfg) {
          const cfg = JSON.parse(rawCfg);
          if (cfg.binId) {
            const headers = {};
            if (cfg.apiKey) headers['X-Master-Key'] = cfg.apiKey;
            if (cfg.accessKey) headers['X-Access-Key'] = cfg.accessKey;

            const resp = await fetch(`https://api.jsonbin.io/v3/b/${cfg.binId}/latest`, { headers });
            if (resp.ok) {
              const resJson = await resp.json();
              if (resJson && resJson.record) {
                cloudData = resJson.record;
                console.log('[CloudSync] Data berhasil disinkronkan dari Cloud Storage JSONBin.');
              }
            }
          }
        }
      } catch (e) {}
    }

    // Jika cloudData ditemukan, perbarui cache localStorage & jalankan callback
    if (cloudData) {
      let updated = false;
      if (cloudData.bio) {
        localStorage.setItem("ax_bio", JSON.stringify(cloudData.bio));
        updated = true;
      }
      if (cloudData.films && Array.isArray(cloudData.films)) {
        localStorage.setItem("ax_films", JSON.stringify(cloudData.films));
        updated = true;
      }
      if (cloudData.events && Array.isArray(cloudData.events)) {
        localStorage.setItem("ax_events", JSON.stringify(cloudData.events));
        updated = true;
      }
      if (updated && typeof onUpdatedCallback === 'function') {
        onUpdatedCallback(cloudData);
      }
      return cloudData;
    }
    return null;
  }
};
