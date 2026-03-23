/* =============================================
   L'ÉCRIN DES ANGES — Blog Script
   ============================================= */

// --- NAV scroll state ---
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

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

// --- Category filter ---
const filters = document.querySelectorAll('.blog-filter');
const cards = document.querySelectorAll('.blog-card');

filters.forEach(filter => {
  filter.addEventListener('click', () => {
    const selected = filter.dataset.filter;

    filters.forEach(f => f.classList.remove('blog-filter--active'));
    filter.classList.add('blog-filter--active');

    cards.forEach(card => {
      if (selected === 'all' || card.dataset.category === selected) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// --- Newsletter form (demo) ---
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = newsletterForm.querySelector('button[type=submit]');
    btn.textContent = 'Abonné !';
    btn.style.background = '#4caf85';
    btn.style.borderColor = '#4caf85';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = "S'abonner";
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.disabled = false;
      newsletterForm.reset();
    }, 3500);
  });
}
