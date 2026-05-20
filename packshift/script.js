/* ═══════════════════════════════════════════════
   PACKSHIFT — script.js
   Custom cursor / Navbar scroll / Reveal on scroll /
   Mobile menu / Form validation / Interactions
═══════════════════════════════════════════════ */

'use strict';

// ── Utils ──────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ══════════════════════════════════════════════
// 1. CUSTOM CURSOR
// ══════════════════════════════════════════════
const cursor    = $('#cursor');
const cursorDot = $('#cursorDot');
let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;
let dotX = 0, dotY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Smooth cursor lag
function animateCursor() {
  // Outer ring — laggy
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  cursor.style.left = curX + 'px';
  cursor.style.top  = curY + 'px';

  // Inner dot — instant
  dotX += (mouseX - dotX) * 0.9;
  dotY += (mouseY - dotY) * 0.9;
  cursorDot.style.left = dotX + 'px';
  cursorDot.style.top  = dotY + 'px';

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Scale cursor on interactive elements
const interactables = 'a, button, .service-card, .why-item, .info-item, select, input, textarea';
document.addEventListener('mouseover', (e) => {
  if (e.target.closest(interactables)) {
    cursor.style.width  = '56px';
    cursor.style.height = '56px';
    cursor.style.background = 'rgba(255,107,0,0.12)';
    cursor.style.borderColor = '#ff8c33';
  }
});
document.addEventListener('mouseout', (e) => {
  if (e.target.closest(interactables)) {
    cursor.style.width  = '36px';
    cursor.style.height = '36px';
    cursor.style.background = 'transparent';
    cursor.style.borderColor = '#ff6b00';
  }
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  cursorDot.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  cursorDot.style.opacity = '1';
});


// ══════════════════════════════════════════════
// 2. NAVBAR — scroll behaviour
// ══════════════════════════════════════════════
const navbar = $('#navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// Active link highlight
const sections = $$('section[id]');
const navLinks = $$('.nav-links a');

function updateActiveLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach((section) => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(l => l.style.color = '');
        link.style.color = '#ff6b00';
      }
    }
  });
}
window.addEventListener('scroll', updateActiveLink, { passive: true });


// ══════════════════════════════════════════════
// 3. MOBILE MENU
// ══════════════════════════════════════════════
const burger     = $('#burger');
const mobileMenu = $('#mobileMenu');

burger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close on link click
$$('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});


// ══════════════════════════════════════════════
// 4. SCROLL REVEAL (IntersectionObserver)
// ══════════════════════════════════════════════
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve — keeps it visible
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

$$('.reveal').forEach(el => revealObserver.observe(el));


// ══════════════════════════════════════════════
// 5. SERVICE CARD — stagger on scroll
// ══════════════════════════════════════════════
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.service-card');
        cards.forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 80);
        });
        cardObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.05 }
);

const servicesGrid = $('.services-grid');
if (servicesGrid) cardObserver.observe(servicesGrid);


// ══════════════════════════════════════════════
// 6. PARALLAX — hero background text
// ══════════════════════════════════════════════
const heroBgText = $('.hero-bg-text');
if (heroBgText) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBgText.style.transform = `translateY(${y * 0.25}px)`;
  }, { passive: true });
}


// ══════════════════════════════════════════════
// 7. TRUCK WHEEL ANIMATION (CSS handles most,
//    JS adds rotation to wheel elements)
// ══════════════════════════════════════════════
const truckSvg = $('.truck-svg');
if (truckSvg) {
  // Add spinning keyframes to wheels via class
  const style = document.createElement('style');
  style.textContent = `
    @keyframes wheel-spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    .truck-body circle:nth-child(8),
    .truck-body circle:nth-child(11),
    .truck-body circle:nth-child(14) {
      animation: wheel-spin 1.2s linear infinite;
    }
  `;
  document.head.appendChild(style);
}


// ══════════════════════════════════════════════
// 8. CONTACT FORM — validation & submission
// ══════════════════════════════════════════════
const form       = $('#contactForm');
const submitBtn  = $('#submitBtn');
const formSuccess = $('#formSuccess');

if (form) {

  // Real-time validation helpers
  function showError(inputEl, errorId, message) {
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.textContent = message;
    inputEl.classList.add('error-field');
  }

  function clearError(inputEl, errorId) {
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.textContent = '';
    inputEl.classList.remove('error-field');
  }

  function validateName(input) {
    const val = input.value.trim();
    if (!val) {
      showError(input, 'nameError', 'Name is required.'); return false;
    }
    if (val.length < 2) {
      showError(input, 'nameError', 'Name must be at least 2 characters.'); return false;
    }
    clearError(input, 'nameError'); return true;
  }

  function validatePhone(input) {
    const val = input.value.trim().replace(/\s/g, '');
    const phoneRegex = /^[+]?[0-9]{10,15}$/;
    if (!val) {
      showError(input, 'phoneError', 'Phone number is required.'); return false;
    }
    if (!phoneRegex.test(val)) {
      showError(input, 'phoneError', 'Enter a valid phone number.'); return false;
    }
    clearError(input, 'phoneError'); return true;
  }

  function validateService(select) {
    if (!select.value) {
      showError(select, 'serviceError', 'Please select a service.'); return false;
    }
    clearError(select, 'serviceError'); return true;
  }

  // Inline validation on blur
  const nameInput    = $('#name');
  const phoneInput   = $('#phone');
  const serviceInput = $('#service');

  if (nameInput)    nameInput.addEventListener('blur',   () => validateName(nameInput));
  if (nameInput)    nameInput.addEventListener('input',  () => { if (nameInput.classList.contains('error-field')) validateName(nameInput); });
  if (phoneInput)   phoneInput.addEventListener('blur',  () => validatePhone(phoneInput));
  if (phoneInput)   phoneInput.addEventListener('input', () => { if (phoneInput.classList.contains('error-field')) validatePhone(phoneInput); });
  if (serviceInput) serviceInput.addEventListener('change', () => validateService(serviceInput));

  // Submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameOk    = validateName(nameInput);
    const phoneOk   = validatePhone(phoneInput);
    const serviceOk = validateService(serviceInput);

    // If invalid: shake form + show quick feedback
    if (!nameOk || !phoneOk || !serviceOk) {
      form.classList.add('shake-on-error');
      setTimeout(() => form.classList.remove('shake-on-error'), 320);
      return;
    }

    // Loading state (Tailwind-inspired timeline)
    submitBtn.classList.add('loading');

    const btnText = submitBtn.querySelector('.btn-text');
    const btnArrow = submitBtn.querySelector('.btn-arrow');

    if (btnText) btnText.textContent = 'SHIFTING DATA...';
    if (btnArrow) btnArrow.textContent = '⏳';

    // Simulate API call (replace with real endpoint)
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Success
    if (btnText) btnText.textContent = 'SUCCESS! REDIRECTING...';
    if (btnArrow) btnArrow.textContent = '✓';

    await new Promise(resolve => setTimeout(resolve, 800));

    submitBtn.classList.remove('loading');
    submitBtn.style.display = 'none';
    formSuccess.classList.add('show');
    form.reset();

    // Reset after 6s
    setTimeout(() => {
      submitBtn.style.display = '';
      if (btnText) btnText.textContent = 'Get Free Quote';
      if (btnArrow) btnArrow.textContent = '→';
      formSuccess.classList.remove('show');
      // Clean error styling after reset
      [nameInput, phoneInput].forEach(el => {
        if (el) el.classList.remove('error-field');
      });
      if (serviceInput) serviceInput.classList.remove('error-field');
    }, 6000);
  });
}


// ══════════════════════════════════════════════
// 9. SMOOTH SCROLL for anchor links
// ══════════════════════════════════════════════
$$('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
    const top = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


// ══════════════════════════════════════════════
// 10. WHY-ITEM keyboard accessibility
// ══════════════════════════════════════════════
$$('.why-item[tabindex]').forEach(item => {
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      item.classList.toggle('active');
    }
  });
});


// ══════════════════════════════════════════════
// 11. MARQUEE — pause on hover for a11y
// ══════════════════════════════════════════════
const marqueeTrack = $('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marqueeTrack.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}


// ══════════════════════════════════════════════
// 12. STAT COUNTER ANIMATION
// ══════════════════════════════════════════════
function animateCounter(el, target, suffix, duration = 1400) {
  let start = 0;
  const step = target / (duration / 16);
  const isDecimal = !Number.isInteger(target);

  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = (isDecimal ? start.toFixed(1) : Math.floor(start)) + suffix;
  }, 16);
}

const statCards = $$('.stat-card');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numEl = entry.target.querySelector('.stat-num');
      const raw   = numEl.textContent; // e.g. "50K+", "12+", "99%"
      const num   = parseFloat(raw);
      const suffix = raw.replace(/[\d.]/g, ''); // "K+", "+", "%"
      animateCounter(numEl, num, suffix);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statCards.forEach(card => counterObserver.observe(card));


// ══════════════════════════════════════════════
// 13. SERVICE CARD tilt effect on desktop
// ══════════════════════════════════════════════
$$('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const cx     = rect.width  / 2;
    const cy     = rect.height / 2;
    const rotX   = ((y - cy) / cy) * -4;
    const rotY   = ((x - cx) / cx) *  4;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(4px)`;
    card.style.transition = 'transform 0.05s';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease, background 0.3s';
  });
});


// ══════════════════════════════════════════════
// 14. PAGE LOAD — staggered hero reveal
// ══════════════════════════════════════════════
window.addEventListener('load', () => {
  document.body.classList.add('loaded');

  // Kick off hero reveals with a tiny delay after load
  const heroReveals = $$('.hero .reveal');
  heroReveals.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 120);
  });
});


// ══════════════════════════════════════════════
// 15. REDUCED MOTION — respect user preferences
// ══════════════════════════════════════════════
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  // Instantly show all reveals
  $$('.reveal').forEach(el => el.classList.add('visible'));
  // Stop grain
  const grain = $('.grain');
  if (grain) grain.style.animation = 'none';
  // Stop marquee
  if (marqueeTrack) marqueeTrack.style.animation = 'none';
  // Stop truck float
  const truckSvgEl = $('.truck-svg');
  if (truckSvgEl) truckSvgEl.style.animation = 'none';
}
