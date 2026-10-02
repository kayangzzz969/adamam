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
