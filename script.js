// ---- Mobile nav toggle ----
const menuBtn = document.querySelector('.menu-toggle');
const body = document.body;
if (menuBtn){
  menuBtn.addEventListener('click', () => {
    body.classList.toggle('nav-open');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => body.classList.remove('nav-open'));
  });
}

// ---- Scroll-spy: highlight active nav link ----
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const setActive = () => {
  let current = '';
  const scrollPos = window.scrollY + 120;
  sections.forEach(sec => {
    if (scrollPos >= sec.offsetTop) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
};
window.addEventListener('scroll', setActive);
setActive();

// ---- Back to top button ----
const backToTop = document.querySelector('.back-to-top');
if (backToTop){
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 600);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---- Footer year ----
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Lightbox for project figures ----
const lightbox = document.querySelector('.lightbox');
if (lightbox){
  const lbImg = lightbox.querySelector('img');
  const lbCap = lightbox.querySelector('.lb-cap');
  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', () => {
      lbImg.src = el.getAttribute('data-lightbox');
      lbCap.textContent = el.getAttribute('data-caption') || '';
      lightbox.classList.add('open');
    });
  });
  lightbox.addEventListener('click', () => lightbox.classList.remove('open'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox.classList.remove('open');
  });
}

// ---- Animate AHP weight bars on scroll into view ----
const weightBars = document.querySelectorAll('.weight-bar-fill');
if (weightBars.length){
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.style.width = entry.target.dataset.width;
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  weightBars.forEach(bar => {
    bar.dataset.width = bar.style.width;
    bar.style.width = '0%';
    obs.observe(bar);
  });
}
