/**
 * CYBER TRANSFORMERS THEME CONTROLLER (DARK & LIGHT / PUTIH)
 * Adam Xavier Official Fanbase
 */

(function () {
  // Pre-hydration instant execution
  try {
    var savedTheme = localStorage.getItem('ax_theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
      document.documentElement.setAttribute('data-theme', 'light');
    } else if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark-theme');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.add('light-theme');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    }
  } catch (e) {}
})();

function getActiveCyberTheme() {
  var attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'dark' || attr === 'light') return attr;
  if (document.documentElement.classList.contains('dark-theme')) return 'dark';
  return 'light';
}

function applyTheme(theme) {
  var html = document.documentElement;
  var body = document.body;

  if (theme === 'dark') {
    html.classList.add('dark-theme');
    html.classList.remove('light-theme');
    if (body) {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    }
    html.setAttribute('data-theme', 'dark');
  } else {
    html.classList.remove('dark-theme');
    html.classList.add('light-theme');
    if (body) {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
    }
    html.setAttribute('data-theme', 'light');
  }

  updateThemeToggleUI(theme === 'dark');
}

function toggleCyberTheme() {
  var current = getActiveCyberTheme();
  var nextTheme = current === 'dark' ? 'light' : 'dark';

  applyTheme(nextTheme);

  try {
    localStorage.setItem('ax_theme', nextTheme);
  } catch (e) {}

  if (typeof CyberAudio !== 'undefined' && CyberAudio.playBeep) {
    CyberAudio.playBeep();
  }

  if (typeof showCyberToast === 'function') {
    showCyberToast(
      'MODE TEMA DIUBAH',
      nextTheme === 'dark' ? 'Mode Gelap (Cyber Dark) diaktifkan.' : 'Mode Terang / Putih (Cyber Light) diaktifkan.',
      'info'
    );
  }
}

function updateThemeToggleUI(isDark) {
  if (typeof isDark === 'undefined') {
    isDark = getActiveCyberTheme() === 'dark';
  }

  var icons = document.querySelectorAll('#themeToggleIcon, .theme-toggle-icon');
  icons.forEach(function (icon) {
    if (isDark) {
      icon.className = 'fa-solid fa-sun';
      icon.style.color = '#FFE500';
    } else {
      icon.className = 'fa-solid fa-moon';
      icon.style.color = '#0F172A';
    }
  });

  var texts = document.querySelectorAll('#themeToggleText, .theme-toggle-text');
  texts.forEach(function (text) {
    text.textContent = isDark ? 'Light (Putih)' : 'Dark';
  });

  var btns = document.querySelectorAll('#themeToggleBtn, .theme-toggle-btn');
  btns.forEach(function (btn) {
    btn.setAttribute('title', isDark ? 'Beralih ke Mode Terang / Putih (Light Mode)' : 'Beralih ke Mode Gelap (Dark Mode)');
    if (isDark) {
      btn.classList.add('is-dark');
      btn.classList.remove('is-light');
    } else {
      btn.classList.add('is-light');
      btn.classList.remove('is-dark');
    }
  });
}

function initCyberTheme() {
  var current = getActiveCyberTheme();
  applyTheme(current);
}

document.addEventListener('DOMContentLoaded', function () {
  initCyberTheme();
});
