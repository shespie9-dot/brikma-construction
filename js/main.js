/* ============================================================
   BRIKMA CONSTRUCTION — main.js
   ============================================================ */

(function () {
  'use strict';

  /* --- Navbar scroll ---------------------------------------- */
  const navbar = document.getElementById('navbar');
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    document.getElementById('back-to-top').classList.toggle('visible', window.scrollY > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- Mobile menu ----------------------------------------- */
  const toggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('nav-mobile');
  const mobileClose = document.getElementById('nav-mobile-close');

  function openMenu() {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }
  toggle.addEventListener('click', openMenu);
  mobileClose.addEventListener('click', closeMenu);
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  /* --- FAQ accordion --------------------------------------- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('active');

      // close all
      document.querySelectorAll('.faq-question').forEach(b => {
        b.classList.remove('active');
        b.nextElementSibling.style.maxHeight = null;
      });

      if (!isOpen) {
        btn.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* --- Reveal on scroll ------------------------------------ */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
    { threshold: 0.12 }
  );
  reveals.forEach(el => observer.observe(el));

  /* --- Gallery lightbox ------------------------------------ */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img').src;
      const alt = item.querySelector('img').alt;
      lightboxImg.src = src;
      lightboxImg.alt = alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  /* --- Contact form ---------------------------------------- */
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const formError = document.getElementById('form-error');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const submitBtn = form.querySelector('.form-submit');
    const origText = submitBtn.value;
    submitBtn.value = 'Envoi en cours…';
    submitBtn.disabled = true;
    formSuccess.classList.remove('show');
    formError.classList.remove('show');

    try {
      const data = new FormData(form);
      // Using Formspree — replace YOUR_FORM_ID with the real ID
      const res = await fetch('https://formspree.io/f/mvzdyknz', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        formSuccess.classList.add('show');
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      formError.classList.add('show');
    } finally {
      submitBtn.value = origText;
      submitBtn.disabled = false;
    }
  });

  /* --- Back to top ----------------------------------------- */
  document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* --- Smooth scroll for anchor links --------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

})();
