import { initAnimations, destroyAnimations } from './animations.js';
import { initWalkCycle, destroyWalkCycle } from './walk-cycle.js';
import { initBackground, destroyBackground } from './background.js';
import { initContactForm } from './api.js';

const state = {
  currentSection: 'home',
  sections: [],
  observer: null,
};

function onSectionChange(id) {
  if (id === state.currentSection) return;
  state.currentSection = id;

  document.querySelectorAll('.navbar__link').forEach((link) => {
    const href = link.getAttribute('href');
    const isCurrent = href === `#${id}`;
    link.toggleAttribute('aria-current', isCurrent);
  });
}

function initSectionObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onSectionChange(entry.target.id);
        }
      });
    },
    { threshold: 0.5 }
  );

  state.sections = document.querySelectorAll('.section');
  state.sections.forEach((section) => observer.observe(section));
  state.observer = observer;
}

function initNavToggle() {
  const btn = document.querySelector('.navbar__toggle');
  const links = document.querySelector('.navbar__links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('navbar__links--open');
    btn.setAttribute('aria-expanded', open);
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('navbar__links--open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

function initScrollHint() {
  const hint = document.querySelector('.scroll-hint');
  if (!hint) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      hint.style.opacity = '0';
      hint.style.pointerEvents = 'none';
    } else {
      hint.style.opacity = '1';
      hint.style.pointerEvents = 'auto';
    }
  }, { passive: true });
}

function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  const icon = btn?.querySelector('.theme-toggle__icon');
  if (!btn || !icon) return;

  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.documentElement.dataset.theme = 'light';
    icon.textContent = '☀️';
  }

  btn.addEventListener('click', () => {
    const isLight = document.documentElement.dataset.theme === 'light';
    if (isLight) {
      delete document.documentElement.dataset.theme;
      localStorage.setItem('theme', 'dark');
      icon.textContent = '🌙';
    } else {
      document.documentElement.dataset.theme = 'light';
      localStorage.setItem('theme', 'light');
      icon.textContent = '☀️';
    }
  });
}

function init() {
  initSectionObserver();
  initNavToggle();
  initScrollHint();
  initThemeToggle();
  initBackground();
  initWalkCycle();
  initAnimations();
  initContactForm();

  window.__portfolioCleanup = () => {
    if (state.observer) state.observer.disconnect();
    destroyBackground();
    destroyWalkCycle();
    destroyAnimations();
  };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
