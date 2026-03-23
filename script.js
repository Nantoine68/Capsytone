/* =============================================
   L'ÉCRIN DES ANGES — Script
   ============================================= */

// --- NAV scroll state ---
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// --- Parallax hero bg ---
const heroBg = document.querySelector('.hero__bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBg.style.transform = `translateY(${y * 0.35}px)`;
  }, { passive: true });
}

// --- Reveal on scroll ---
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => revealObs.observe(el));

// --- Mobile menu ---
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

const toggleMenu = (open) => {
  menuOpen = open;
  mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
  const spans = burger.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
};

burger.addEventListener('click', () => toggleMenu(!menuOpen));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

// --- Testimonials slider ---
const track = document.getElementById('testiTrack');
const dots = document.querySelectorAll('.testi__dot');
let current = 0;
let autoSlide;

const goTo = (idx) => {
  current = idx;
  track.scrollTo({ left: idx * track.offsetWidth, behavior: 'smooth' });
  dots.forEach((d, i) => d.classList.toggle('testi__dot--active', i === idx));
};

dots.forEach(dot => dot.addEventListener('click', () => goTo(+dot.dataset.idx)));

const startAuto = () => {
  autoSlide = setInterval(() => goTo((current + 1) % dots.length), 5000);
};
const stopAuto = () => clearInterval(autoSlide);

track.addEventListener('mouseenter', stopAuto);
track.addEventListener('mouseleave', startAuto);
track.addEventListener('touchstart', stopAuto, { passive: true });
startAuto();

// Sync dots on manual scroll
let scrollTimeout;
track.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const idx = Math.round(track.scrollLeft / track.offsetWidth);
    dots.forEach((d, i) => d.classList.toggle('testi__dot--active', i === idx));
    current = idx;
  }, 80);
}, { passive: true });

// --- Contact form (demo) ---
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    btn.textContent = 'Message envoyé !';
    btn.style.background = '#4caf85';
    btn.style.borderColor = '#4caf85';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Envoyer ma demande';
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.disabled = false;
      form.reset();
    }, 3500);
  });
}

// --- Smooth anchor links (offset for fixed nav) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
