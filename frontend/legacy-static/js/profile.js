const API = 'http://localhost:5000';

let profile = null;

function esc(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export async function fetchProfile() {
  try {
    const res = await fetch(`${API}/api/profile`);
    if (!res.ok) throw new Error('Failed to fetch profile');
    profile = await res.json();
    renderProfile();
  } catch {
    console.warn('Profile API unavailable, using hardcoded fallback');
  }
}

function renderProfile() {
  if (!profile) return;

  const { bio, roles, education, skills, certifications, social } = profile;

  // Hero bio
  const bioEl = document.querySelector('.hero-bio');
  if (bioEl) bioEl.textContent = bio;

  // Hero roles (typing animation placeholder)
  const rolesEl = document.querySelector('.hero-roles');
  if (rolesEl && roles) {
    rolesEl.textContent = roles.join(' \u2022 ');
  }

  // About bio
  const aboutBio = document.querySelector('.about-bio');
  if (aboutBio) aboutBio.textContent = bio;

  // Education timeline
  const timeline = document.querySelector('.education-timeline');
  if (timeline && education) {
    timeline.innerHTML = education.map((e, i) => `
      <div class="education-item">
        <div class="education-dot"></div>
        <span class="education-period">${esc(e.period)}</span>
        <h3 class="education-level">${esc(e.level)}</h3>
        <p class="education-institution">${esc(e.institution)}</p>
        <p class="education-desc">${esc(e.description)}</p>
      </div>
    `).join('');
  }

  // Skills
  const skillsGrid = document.querySelector('.skills-grid');
  if (skillsGrid && skills) {
    skillsGrid.innerHTML = skills.map(cat => `
      <div class="skill-category">
        <h3 class="skill-category__title">${esc(cat.title)}</h3>
        <div class="skill-category__items">
          ${cat.items.map(s => `<span class="skill-tag">${esc(s)}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  // Certifications
  const certGrid = document.querySelector('.cert-grid');
  if (certGrid && certifications) {
    certGrid.innerHTML = certifications.map(c => `
      <div class="cert-card">
        <h3 class="cert-card__title">${esc(c.title)}</h3>
        <p class="cert-card__desc">${esc(c.description)}</p>
      </div>
    `).join('');
  }

  // Social links (update hrefs)
  if (social) {
    const github = document.querySelector('.social-link--github');
    if (github && social.github) github.href = social.github;
    const linkedin = document.querySelector('.social-link--linkedin');
    if (linkedin && social.linkedin) linkedin.href = social.linkedin;
    const facebook = document.querySelector('.social-link--facebook');
    if (facebook && social.facebook) facebook.href = social.facebook;
    const instagram = document.querySelector('.social-link--instagram');
    if (instagram && social.instagram) instagram.href = social.instagram;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fetchProfile);
} else {
  fetchProfile();
}
