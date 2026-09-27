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
   ========================================================================== */
let isPlaying = false;
let musicInterval = null;
let currentProgressSec = 0;
const totalDurationSec = 175; // 2:55 Theme Song

function toggleMusic() {
  CyberAudio.init();
  CyberAudio.playBeep();
  const card = document.getElementById('mechaMusicCard');
  const playBtnIcon = document.getElementById('playIcon');
  const realAudio = document.getElementById('realAudioPlayer');

  if (!isPlaying) {
    isPlaying = true;
    if (card) card.classList.add('playing');
    if (playBtnIcon) playBtnIcon.className = 'fa-solid fa-pause';
    
    // Play HTML5 audio if provided
    if (realAudio) {
      realAudio.play().catch(e => console.log('Audio autoplay policy:', e));
    }

    // Simulated progress bar ticker
    musicInterval = setInterval(() => {
      currentProgressSec++;
      if (currentProgressSec > totalDurationSec) {
        currentProgressSec = 0;
        toggleMusic();
        return;
      }
      updateMusicUI();
    }, 1000);
  } else {
    isPlaying = false;
    if (card) card.classList.remove('playing');
    if (playBtnIcon) playBtnIcon.className = 'fa-solid fa-play';
    if (realAudio) realAudio.pause();
    if (musicInterval) clearInterval(musicInterval);
  }
}

function seekMusic(e) {
  const container = document.getElementById('musicProgressWrap');
  if (!container) return;
  const rect = container.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
  currentProgressSec = Math.floor(ratio * totalDurationSec);
  updateMusicUI();
  CyberAudio.playBeep();
}

function updateMusicUI() {
  const fill = document.getElementById('musicProgressBar');
  const curTime = document.getElementById('curTimeText');
  const durTime = document.getElementById('durTimeText');

  if (fill) {
    const percent = (currentProgressSec / totalDurationSec) * 100;
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
   DYNAMIC POPULATION FROM LOCALSTORAGE DATA
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
  initCyberMeteors();
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
