/**
 * APP.JS - CORE INTERACTION FOR ADAM XAVIER FANBASE
 * Mengatur transisi slide (Slide 1 & Slide 2 mirip itsjordanians),
 * Music Player Transformer Kuning, Cyber Meteor Effect, dan Web Audio SFX.
 */

// Transformers sound effects synthesized via Web Audio API
const CyberAudio = {
  ctx: null,
  init: function() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) this.ctx = new AudioContext();
    }
  },
  playTransformSound: function() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.3);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.45);
      
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.5);
    } catch (e) {
      console.log('Audio FX error:', e);
    }
  },
  playBeep: function() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {}
  }
};

/* ==========================================================================
   SLIDE CONTROLLER (Slide 1 & Slide 2 mirip itsjordanians.oneapp.dev)
   ========================================================================== */
let currentSlide = 1;
const totalSlides = 2;

function applySlide(target) {
  const page1 = document.getElementById('slide1');
  const page2 = document.getElementById('slide2');
  if (!page1 || !page2) return;

  CyberAudio.playTransformSound();

  if (target === 1) {
    page1.classList.remove('left');
    page1.classList.add('active');
    page2.classList.remove('active');
    page2.classList.remove('left');
  } else if (target === 2) {
    page1.classList.remove('active');
    page1.classList.add('left');
    page2.classList.remove('left');
    page2.classList.add('active');

    // Reset scroll posisi slide 2 ke paling atas
    page2.scrollTop = 0;
  }
  currentSlide = target;
}

function goToPage(page) {
  if (page === currentSlide) return;
  history.pushState({ slide: page }, '');
  applySlide(page);
}

function goBack() {
  if (window.history.length > 1) {
    history.back();
  } else {
    applySlide(1);
  }
}

window.addEventListener('popstate', (e) => {
  const state = e.state;
  const target = (state && state.slide) ? state.slide : 1;
  applySlide(target);
});

function scrollToPosters() {
  const target = document.getElementById('postersSection');
  const slide2 = document.getElementById('slide2');
  if (target && slide2) {
    slide2.scrollTo({ top: target.offsetTop - 20, behavior: 'smooth' });
    CyberAudio.playBeep();
  }
}

/* ==========================================================================
   MUSIC PLAYER CONTROLLER (Bumblebee / Transformers Theme Song)
   Mendukung HTML5 Audio + Web Audio Synth Fallback (100% Anti-Gagal / Anti-Error)
   ========================================================================== */
let isPlaying = false;
let currentProgressSec = 0;
let totalDurationSec = 171; // 2:51 (Default anthem duration)
let synthTimer = null;

// Built-in Web Audio Melodic Synthesizer Engine (Cyber Transformers Anthem)
const CyberSynth = {
  ctx: null,
  active: false,
  step: 0,
  timerId: null,
  init: function() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },
  start: function() {
    this.init();
    if (!this.ctx) return;
    this.active = true;
    this.step = 0;
    const tempo = 124; // BPM
    const stepTime = (60 / tempo) / 4; // 16th note
    let nextNoteTime = this.ctx.currentTime + 0.05;

    // Transformers Bumblebee Heroic Motif (D Minor Pentatonic / Synthwave)
    const melody = [
      293.66, 0, 293.66, 349.23,  // D4, rest, D4, F4
      440.00, 0, 392.00, 349.23,  // A4, rest, G4, F4
      392.00, 0, 440.00, 523.25,  // G4, rest, A4, C5
      587.33, 523.25, 440.00, 392.00, // D5, C5, A4, G4
      349.23, 0, 392.00, 440.00,  // F4, rest, G4, A4
      392.00, 349.23, 293.66, 0,  // G4, F4, D4, rest
      261.63, 293.66, 349.23, 392.00, // C4, D4, F4, G4
      440.00, 0, 293.66, 0        // A4, rest, D4, rest
    ];

    const bass = [
      146.83, 146.83, 146.83, 146.83, // D3
      116.54, 116.54, 116.54, 116.54, // Bb2
      130.81, 130.81, 130.81, 130.81, // C3
      146.83, 146.83, 174.61, 196.00  // D3, D3, F3, G3
    ];

    const scheduler = () => {
      if (!this.active) return;
      while (nextNoteTime < this.ctx.currentTime + 0.12) {
        this.playStep(nextNoteTime, this.step, melody, bass);
        nextNoteTime += stepTime;
        this.step = (this.step + 1) % 32;
      }
      this.timerId = setTimeout(scheduler, 30);
    };
    scheduler();
  },
  playStep: function(time, step, melody, bass) {
    const ctx = this.ctx;
    // 1. Kick on 4-on-the-floor
    if (step % 4 === 0) {
      const kOsc = ctx.createOscillator();
      const kGain = ctx.createGain();
      kOsc.frequency.setValueAtTime(160, time);
      kOsc.frequency.exponentialRampToValueAtTime(32, time + 0.14);
      kGain.gain.setValueAtTime(0.28, time);
      kGain.gain.exponentialRampToValueAtTime(0.001, time + 0.14);
      kOsc.connect(kGain);
      kGain.connect(ctx.destination);
      kOsc.start(time);
      kOsc.stop(time + 0.15);
    }
    // 2. Cyber Snare on beats 2 & 4
    if (step % 8 === 4) {
      const sOsc = ctx.createOscillator();
      const sGain = ctx.createGain();
      sOsc.type = 'triangle';
      sOsc.frequency.setValueAtTime(220, time);
      sGain.gain.setValueAtTime(0.18, time);
      sGain.gain.exponentialRampToValueAtTime(0.001, time + 0.16);
      sOsc.connect(sGain);
      sGain.connect(ctx.destination);
      sOsc.start(time);
      sOsc.stop(time + 0.17);
    }
    // 3. Hi-hat on offbeat
    if (step % 2 === 1) {
      const hOsc = ctx.createOscillator();
      const hGain = ctx.createGain();
      hOsc.type = 'highpass';
      hOsc.frequency.setValueAtTime(9000, time);
      hGain.gain.setValueAtTime(0.035, time);
      hGain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
      hOsc.connect(hGain);
      hGain.connect(ctx.destination);
      hOsc.start(time);
      hOsc.stop(time + 0.05);
    }
    // 4. Synth Bass
    const bNote = bass[Math.floor(step / 2) % bass.length];
    if (step % 2 === 0 && bNote) {
      const bOsc = ctx.createOscillator();
      const bGain = ctx.createGain();
      bOsc.type = 'sawtooth';
      bOsc.frequency.setValueAtTime(bNote / 2, time);
      bGain.gain.setValueAtTime(0.09, time);
      bGain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);
      bOsc.connect(bGain);
      bGain.connect(ctx.destination);
      bOsc.start(time);
      bOsc.stop(time + 0.23);
    }
    // 5. Melodic Lead
    const mNote = melody[step];
    if (mNote > 0) {
      const mOsc = ctx.createOscillator();
      const mGain = ctx.createGain();
      mOsc.type = 'sine';
      mOsc.frequency.setValueAtTime(mNote, time);
      mGain.gain.setValueAtTime(0.14, time);
      mGain.gain.exponentialRampToValueAtTime(0.001, time + 0.24);
      mOsc.connect(mGain);
      mGain.connect(ctx.destination);
      mOsc.start(time);
      mOsc.stop(time + 0.25);
    }
  },
  stop: function() {
    this.active = false;
    if (this.timerId) clearTimeout(this.timerId);
  }
};

function initMusicPlayer() {
  const realAudio = document.getElementById('realAudioPlayer');
  if (!realAudio) return;

  // Sinkronisasi durasi saat metadata selesai dimuat
  realAudio.addEventListener('loadedmetadata', () => {
    if (realAudio.duration && !isNaN(realAudio.duration) && isFinite(realAudio.duration)) {
      totalDurationSec = Math.floor(realAudio.duration);
      updateMusicUI();
    }
  });

  // Sinkronisasi progress playback real-time
  realAudio.addEventListener('timeupdate', () => {
    if (isPlaying && !isNaN(realAudio.currentTime)) {
      currentProgressSec = Math.floor(realAudio.currentTime);
      updateMusicUI();
    }
  });

  // Event saat lagu selesai
  realAudio.addEventListener('ended', () => {
    stopMusic();
  });

  // Sinkronisasi status play & pause
  realAudio.addEventListener('play', () => {
    isPlaying = true;
    updatePlayerStateUI(true);
  });
  realAudio.addEventListener('pause', () => {
    if (!CyberSynth.active) {
      isPlaying = false;
      updatePlayerStateUI(false);
    }
  });

  // Fallback otomatis jika audio HTML5 gagal dimuat
  realAudio.addEventListener('error', (e) => {
    console.warn('[CyberAudio] HTML5 audio load error, fallback ke Web Audio CyberSynth:', e);
  });
}

function updatePlayerStateUI(playing) {
  const card = document.getElementById('mechaMusicCard');
  const playBtnIcon = document.getElementById('playIcon');
  if (card) {
    if (playing) card.classList.add('playing');
    else card.classList.remove('playing');
  }
  if (playBtnIcon) {
    playBtnIcon.className = playing ? 'fa-solid fa-pause' : 'fa-solid fa-play';
  }
}

function toggleMusic() {
  CyberAudio.init();
  CyberAudio.playBeep();
  const realAudio = document.getElementById('realAudioPlayer');

  if (!isPlaying) {
    isPlaying = true;
    updatePlayerStateUI(true);

    let playedHtml5 = false;
    if (realAudio) {
      realAudio.volume = 0.85;
      const playPromise = realAudio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          playedHtml5 = true;
        }).catch((err) => {
          console.warn('[CyberAudio] HTML5 play prevented/failed, activating CyberSynth engine:', err);
          CyberSynth.start();
          startSimulatedProgress();
        });
      } else {
        playedHtml5 = true;
      }
    } else {
      CyberSynth.start();
      startSimulatedProgress();
    }
  } else {
    stopMusic();
  }
}

function stopMusic() {
  isPlaying = false;
  updatePlayerStateUI(false);
  const realAudio = document.getElementById('realAudioPlayer');
  if (realAudio) {
    realAudio.pause();
  }
  CyberSynth.stop();
  if (synthTimer) {
    clearInterval(synthTimer);
    synthTimer = null;
  }
}

function startSimulatedProgress() {
  if (synthTimer) clearInterval(synthTimer);
  synthTimer = setInterval(() => {
    if (!isPlaying) {
      clearInterval(synthTimer);
      return;
    }
    currentProgressSec++;
    if (currentProgressSec > totalDurationSec) {
      currentProgressSec = 0;
    }
    updateMusicUI();
  }, 1000);
}

function seekMusic(e) {
  const container = document.getElementById('musicProgressWrap');
  if (!container) return;
  const rect = container.getBoundingClientRect();
  const clientX = (e.touches && e.touches.length > 0) ? e.touches[0].clientX : e.clientX;
  const clickX = clientX - rect.left;
  const ratio = Math.max(0, Math.min(1, clickX / rect.width));

  const realAudio = document.getElementById('realAudioPlayer');
  if (realAudio && !isNaN(realAudio.duration) && isFinite(realAudio.duration) && realAudio.duration > 0) {
    realAudio.currentTime = ratio * realAudio.duration;
    currentProgressSec = Math.floor(realAudio.currentTime);
  } else {
    currentProgressSec = Math.floor(ratio * totalDurationSec);
  }

  updateMusicUI();
  CyberAudio.playBeep();
}

function updateMusicUI() {
  const fill = document.getElementById('musicProgressBar');
  const curTime = document.getElementById('curTimeText');
  const durTime = document.getElementById('durTimeText');

  if (fill) {
    const percent = Math.min(100, Math.max(0, (currentProgressSec / (totalDurationSec || 171)) * 100));
    fill.style.width = percent + '%';
  }
  if (curTime) {
    curTime.textContent = formatSec(currentProgressSec);
  }
  if (durTime) {
    durTime.textContent = formatSec(totalDurationSec);
  }
}

function formatSec(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return mins + ':' + (secs < 10 ? '0' : '') + secs;
}

/* ==========================================================================
   CYBER METEORS EFFECT ON SLIDE 2 (Ala itsjordanians meteor effect)
   ========================================================================== */
function initCyberMeteors() {
  const container = document.getElementById('meteor-container');
  if (!container) return;

  function spawnMeteor() {
    const meteor = document.createElement('div');
    meteor.className = 'cyber-meteor';
    meteor.style.left = Math.random() * 100 + '%';
    meteor.style.top = Math.random() * 20 + '%';

    const duration = Math.random() * 2 + 2.5; // 2.5s - 4.5s
    meteor.style.animationDuration = duration + 's';

    container.appendChild(meteor);
    setTimeout(() => meteor.remove(), (duration + 0.5) * 1000);
  }

  setInterval(spawnMeteor, 1200);
  setTimeout(spawnMeteor, 400);
  setTimeout(spawnMeteor, 800);
}

/* ==========================================================================
   DYNAMIC POPULATION FROM STORE DATA (GITHUB LIVE / MEMORY)
   ========================================================================== */
function loadHomeDynamicData() {
  if (typeof FanbaseStore === 'undefined') return;

  const bio = FanbaseStore.getBio();
  const films = FanbaseStore.getFilms();

  // Populate Fanbase & Brand Name
  const fbName = bio.fanbaseName || 'AdamUnited';
  const heroFb = document.getElementById('indexHeroFanbase');
  if (heroFb) heroFb.textContent = fbName + '!';

  const brandEl = document.getElementById('indexBrandName');
  if (brandEl) brandEl.textContent = fbName.toUpperCase();

  const avatarEl = document.getElementById('indexAvatarImg');
  if (avatarEl && bio.avatar) avatarEl.src = bio.avatar;

  // Populate Music Anthem Player (Slide 1)
  const music = (typeof FanbaseStore.getMusic === 'function') ? FanbaseStore.getMusic() : (bio.music || null);
  if (music) {
    const titleEl = document.querySelector('.mecha-music-card .music-title');
    if (titleEl && music.title) titleEl.textContent = music.title;

    const artistEl = document.querySelector('.mecha-music-card .music-artist');
    if (artistEl && music.artist) artistEl.textContent = music.artist;

    const audioEl = document.getElementById('realAudioPlayer');
    if (audioEl && music.url) {
      const currentSrc = audioEl.getAttribute('data-current-src') || audioEl.querySelector('source')?.getAttribute('src');
      if (currentSrc !== music.url) {
        audioEl.setAttribute('data-current-src', music.url);
        const sourceEl = audioEl.querySelector('source');
        if (sourceEl) sourceEl.setAttribute('src', music.url);
        audioEl.src = music.url;
        audioEl.load();
      }
    }
  }

  // Populate Slide 2 Bio
  const actorNameEl = document.getElementById('bioActorName');
  if (actorNameEl) actorNameEl.textContent = bio.name;

  const bioAbout1 = document.getElementById('bioAbout1');
  if (bioAbout1) bioAbout1.textContent = bio.about1;

  const bioAbout2 = document.getElementById('bioAbout2');
  if (bioAbout2) bioAbout2.textContent = bio.about2;

  const specBirth = document.getElementById('specBirth');
  if (specBirth) specBirth.textContent = bio.birthdate;

  const specAge = document.getElementById('specAge');
  if (specAge) specAge.textContent = bio.age + " Tahun";

  const specHobby = document.getElementById('specHobby');
  if (specHobby && bio.hobbies) specHobby.textContent = bio.hobbies[0];

  const specFavRobot = document.getElementById('specFavRobot');
  if (specFavRobot) specFavRobot.textContent = bio.favoriteRobot;

  const quoteEl = document.getElementById('bioMotto');
  if (quoteEl) quoteEl.textContent = `"${bio.motto}"`;

  // Populate Teaser Posters in Slide 2
  const teaserGrid = document.getElementById('teaserPostersGrid');
  if (teaserGrid && films) {
    teaserGrid.innerHTML = '';
    // Show top 4 films
    films.slice(0, 4).forEach(film => {
      const card = document.createElement('div');
      card.className = 'mini-poster-card';
      card.innerHTML = `
        <img src="${film.image}" alt="${film.title}" class="mini-poster-img" onerror="this.src='https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80'">
        <div class="mini-poster-details">
          <span class="mini-poster-badge">${film.badge || 'Karya Unggulan'}</span>
          <div class="mini-poster-title">${film.title}</div>
          <div class="mini-poster-role">${film.role}</div>
        </div>
      `;
      teaserGrid.appendChild(card);
    });
  }
  // Populate Socials / Media Hub
  const socials = (typeof FanbaseStore.getSocials === 'function') ? FanbaseStore.getSocials() : (bio.socials || {});
  
  const linkGroup = document.getElementById('mediaLinkGroup');
  if (linkGroup && (socials.groupLink || socials.whatsapp)) {
    linkGroup.href = socials.groupLink || socials.whatsapp;
  }
  
  const linkIgFanbase = document.getElementById('mediaLinkIgFanbase');
  if (linkIgFanbase && (socials.igFanbase || socials.instagram)) {
    linkIgFanbase.href = socials.igFanbase || socials.instagram;
  }

  const linkIgAdam = document.getElementById('mediaLinkIgAdam');
  if (linkIgAdam && socials.igAdam) {
    linkIgAdam.href = socials.igAdam;
  }

  const linkTiktok = document.getElementById('mediaLinkTiktok');
  if (linkTiktok && socials.tiktok) {
    linkTiktok.href = socials.tiktok;
  }

  const linkYoutube = document.getElementById('mediaLinkYoutube');
  if (linkYoutube && socials.youtube) {
    linkYoutube.href = socials.youtube;
  }

  const cardBrandTitle = document.getElementById('memberCardBrandTitle');
  if (cardBrandTitle) {
    cardBrandTitle.textContent = fbName.toUpperCase();
  }
}

/* ==========================================================================
   DIGITAL MEMBER CARD (CYBER ID) CONTROLLER
   Kustomisasi Nama, Role, Avatar, ID Acak & Canvas PNG Downloader
   ========================================================================== */
function updateMemberCardName(val) {
  const nameEl = document.getElementById('memberCardNameText');
  if (nameEl) {
    const clean = (val && val.trim().length > 0) ? val.trim().toUpperCase() : 'NAMA ANGGOTA';
    nameEl.textContent = clean;
  }
}

function updateMemberCardRole(val) {
  const roleEl = document.getElementById('memberCardRoleBadge');
  if (roleEl) {
    roleEl.textContent = val || 'CYBER TROOPER';
  }
}

function updateMemberCardAvatar(val) {
  const avatarEl = document.getElementById('memberCardAvatarEmoji');
  if (avatarEl) {
    avatarEl.textContent = val || '🤖';
  }
}

function regenerateMemberCardId() {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newId = `AU-2026-${randomNum}`;
  const idEl = document.getElementById('memberCardIdText');
  if (idEl) {
    idEl.textContent = `ID: ${newId}`;
  }
  if (typeof CyberAudio !== 'undefined' && CyberAudio.playTransformSound) {
    CyberAudio.playTransformSound();
  }
}

function downloadMemberCardPNG() {
  const nameInput = document.getElementById('inputMemberName');
  const nameText = (nameInput && nameInput.value.trim().length > 0) ? nameInput.value.trim().toUpperCase() : 'NAMA ANGGOTA';
  
  const roleEl = document.getElementById('memberCardRoleBadge');
  const roleText = roleEl ? roleEl.textContent.trim() : 'CYBER TROOPER';
  
  const idEl = document.getElementById('memberCardIdText');
  const idText = idEl ? idEl.textContent.trim() : 'ID: AU-2026-7892';

  const avatarEl = document.getElementById('memberCardAvatarEmoji');
  const avatarEmoji = avatarEl ? avatarEl.textContent.trim() : '🤖';

  const bio = (typeof FanbaseStore !== 'undefined') ? FanbaseStore.getBio() : {};
  const fanbaseName = (bio.fanbaseName || 'AdamUnited').toUpperCase();

  // Create High-Res Offscreen Canvas (800 x 500 px)
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 500;
  const ctx = canvas.getContext('2d');

  // Helper function for rounded rectangles
  function roundRect(ctx, x, y, w, h, r, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }

  // 1. Background Gradient Card
  const bgGrad = ctx.createLinearGradient(0, 0, 800, 500);
  bgGrad.addColorStop(0, '#070B14');
  bgGrad.addColorStop(0.5, '#121B30');
  bgGrad.addColorStop(1, '#090E1A');
  ctx.fillStyle = bgGrad;
  roundRect(ctx, 10, 10, 780, 480, 28, true, false);

  // 2. Cyber Yellow Outer Glowing Border
  ctx.strokeStyle = '#FFC800';
  ctx.lineWidth = 4;
  roundRect(ctx, 10, 10, 780, 480, 28, false, true);

  // 3. Futuristic Grid Pattern / Ambient Lines
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 200, 0, 0.06)';
  ctx.lineWidth = 1;
  for (let x = 40; x < 760; x += 30) {
    ctx.beginPath();
    ctx.moveTo(x, 20);
    ctx.lineTo(x, 480);
    ctx.stroke();
  }
  for (let y = 30; y < 480; y += 30) {
    ctx.beginPath();
    ctx.moveTo(20, y);
    ctx.lineTo(780, y);
    ctx.stroke();
  }
  ctx.restore();

  // 4. Header Section: Brand & Mini Logo
  // Logo Box
  ctx.fillStyle = '#FFC800';
  roundRect(ctx, 45, 40, 50, 50, 12, true, false);
  ctx.font = '26px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🤖', 70, 66);

  // Brand Name & Subtitle
  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFD700';
  ctx.font = '900 22px "Orbitron", sans-serif';
  ctx.fillText(fanbaseName, 110, 58);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 11px sans-serif';
  ctx.fillText('OFFICIAL CYBER ID CARD • ADAM XAVIER ALLIANCE', 110, 78);

  // Golden Smart Chip
  const chipGrad = ctx.createLinearGradient(670, 42, 745, 92);
  chipGrad.addColorStop(0, '#F59E0B');
  chipGrad.addColorStop(0.5, '#D97706');
  chipGrad.addColorStop(1, '#B45309');
  ctx.fillStyle = chipGrad;
  ctx.strokeStyle = '#FDE68A';
  ctx.lineWidth = 1.5;
  roundRect(ctx, 670, 42, 75, 52, 10, true, true);
  // Chip circuit lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(670, 68);
  ctx.lineTo(745, 68);
  ctx.moveTo(707, 42);
  ctx.lineTo(707, 94);
  ctx.stroke();

  // 5. Middle Section: Avatar & Member Details
  // Avatar Box
  ctx.fillStyle = '#1E293B';
  ctx.strokeStyle = '#FFC800';
  ctx.lineWidth = 3;
  roundRect(ctx, 45, 140, 140, 140, 24, true, true);

  // Avatar Emoji
  ctx.font = '64px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(avatarEmoji, 115, 212);

  // Member Role Badge (Pill)
  ctx.fillStyle = 'rgba(255, 200, 0, 0.18)';
  ctx.strokeStyle = '#FFC800';
  ctx.lineWidth = 1.5;
  roundRect(ctx, 215, 145, 180, 28, 14, true, true);

  ctx.fillStyle = '#FFD700';
  ctx.font = '800 12px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(roleText, 305, 163);

  // Member Name
  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 32px "Orbitron", sans-serif';
  ctx.shadowColor = 'rgba(255, 200, 0, 0.5)';
  ctx.shadowBlur = 12;
  ctx.fillText(nameText, 215, 218);
  ctx.shadowBlur = 0; // Reset shadow

  // Member ID
  ctx.fillStyle = '#38BDF8';
  ctx.font = '700 20px monospace';
  ctx.fillText(idText, 215, 258);

  // 6. Dashed Divider Line
  ctx.save();
  ctx.setLineDash([6, 6]);
  ctx.strokeStyle = 'rgba(255, 200, 0, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(45, 340);
  ctx.lineTo(755, 340);
  ctx.stroke();
  ctx.restore();

  // 7. Bottom Section: Barcode & Date Stamp
  // Simulated Barcode
  const barX = 45;
  const barY = 370;
  const barHeights = 38;
  const pattern = [2, 4, 1, 3, 2, 5, 2, 3, 1, 4, 2, 3, 5, 2, 1, 3, 4, 2, 3, 1, 5, 2, 4, 3, 2, 4, 1, 3, 2, 5, 2, 3];
  let curX = barX;
  ctx.fillStyle = '#E2E8F0';
  for (let i = 0; i < pattern.length; i++) {
    const w = pattern[i];
    ctx.fillRect(curX, barY, w, barHeights);
    curX += w + 2.5;
  }

  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 10px monospace';
  ctx.fillText('AUTOBOT ALLIANCE NETWORK • VERIFIED CYBER IDENTITY', barX, barY + barHeights + 18);

  // Date Stamp
  ctx.textAlign = 'right';
  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 11px sans-serif';
  ctx.fillText('ACTIVE SINCE', 750, 385);

  ctx.fillStyle = '#FFD700';
  ctx.font = '900 18px "Orbitron", sans-serif';
  ctx.fillText('2026', 750, 410);

  ctx.fillStyle = 'rgba(255, 200, 0, 0.7)';
  ctx.font = '800 10px sans-serif';
  ctx.fillText('OFFICIAL MEMBER', 750, 428);

  // 8. Trigger PNG Download
  try {
    const dataUrl = canvas.toDataURL('image/png');
    const safeName = nameText.replace(/[^a-zA-Z0-9]/g, '_') || 'Anggota';
    const link = document.createElement('a');
    link.download = `Kartu-Anggota-AdamUnited-${safeName}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    if (typeof CyberAudio !== 'undefined' && CyberAudio.playTransformSound) {
      CyberAudio.playTransformSound();
    }
  } catch (err) {
    alert('Gagal mengunduh kartu anggota: ' + err.message);
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  history.replaceState({ slide: 1 }, '');
  if (typeof initCyberTheme === 'function') {
    initCyberTheme();
  }
  initCyberMeteors();
  initMusicPlayer();
  loadHomeDynamicData();

  // Background Cloud Sync dari Netlify / Cloud Storage
  if (typeof FanbaseStore !== 'undefined' && FanbaseStore.initCloudSync) {
    FanbaseStore.initCloudSync(() => {
      loadHomeDynamicData();
    });
  }

  // Attach sound on buttons
  document.querySelectorAll('button, .nav-link-btn, .btn-cyber-primary').forEach(btn => {
    btn.addEventListener('click', () => CyberAudio.playBeep());
  });
});
