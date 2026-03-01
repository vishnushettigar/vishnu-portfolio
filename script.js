/* ============================================================
   script.js — Portfolio interactivity
   ============================================================ */

(function () {
  'use strict';

  // ── Navbar: background on scroll ──────────────────────────
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // run once on load

  // ── Mobile nav toggle ──────────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ── Smooth scroll for nav links ────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const offset = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  // ── Active nav link on scroll (Intersection Observer) ─────
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  function setActiveLink(id) {
    navAnchors.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + id);
    });
  }

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    {
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    }
  );

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  // ── Fade-in animations on scroll ──────────────────────────
  // Elements to animate: section content blocks
  const fadeTargets = [
    '.section-title',
    '.section-subtitle',
    '.about-text',
    '.about-highlights',
    '.highlight-card',
    '.timeline-item',
    '.skills-grid',
    '.skill-group',
    '.edu-card',
    '.personal-card',
    '.contact-links',
  ];

  const allFadeEls = document.querySelectorAll(fadeTargets.join(','));

  allFadeEls.forEach(function (el) {
    el.classList.add('fade-in');
  });

  const fadeObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  allFadeEls.forEach(function (el) {
    fadeObserver.observe(el);
  });

  // Stagger timeline items and highlight cards
  document.querySelectorAll('.timeline-item').forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.12) + 's';
  });

  document.querySelectorAll('.highlight-card').forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.08) + 's';
  });

  document.querySelectorAll('.personal-card').forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.1) + 's';
  });

  document.querySelectorAll('.skill-group').forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.07) + 's';
  });

})();
