/* ============================================================
   script.js — Portfolio interactivity
   ============================================================ */

(function () {
  'use strict';

  // ── Mobile nav toggle ──────────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ── Smooth scroll (offset for fixed navbar) ───────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = document.getElementById('navbar').offsetHeight;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });

  // ── Active nav link on scroll ─────────────────────────────
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navAnchors.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(function (s) { sectionObserver.observe(s); });

  // ── Fade-in on scroll ─────────────────────────────────────
  const fadeTargets = [
    '.section-title',
    '.section-comment',
    '.about-text',
    '.about-highlights',
    '.highlight-card',
    '.tcard',
    '.skill-group',
    '.personal-card',
    '.contact-item',
  ];

  document.querySelectorAll(fadeTargets.join(',')).forEach(function (el) {
    el.classList.add('fade-in');
  });

  const fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll('.fade-in').forEach(function (el) {
    fadeObserver.observe(el);
  });

  // Stagger delays
  document.querySelectorAll('.tcard').forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.08) + 's';
  });
  document.querySelectorAll('.highlight-card').forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.06) + 's';
  });
  document.querySelectorAll('.personal-card').forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.08) + 's';
  });
  document.querySelectorAll('.skill-group').forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.06) + 's';
  });

})();
