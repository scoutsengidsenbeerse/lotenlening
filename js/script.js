/* ============================================================
   Scouts en Gidsen Beerse – Lotenlening 2026
   Main JavaScript
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     NAVBAR & MOBILE MENU
  ========================================================== */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
  }

  document.addEventListener('click', (e) => {
    if (hamburger && mobileNav && !hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    }
  });

  /* ==========================================================
     HERO ANIMATION
  ========================================================== */
  const hero = document.getElementById('hero');
  if (hero) {
    requestAnimationFrame(() => hero.classList.add('loaded'));
  }

  /* ==========================================================
     ACCORDION
  ========================================================== */
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.accordion-item.open').forEach(open => {
        open.classList.remove('open');
        open.querySelector('.accordion-trigger').setAttribute('aria-expanded', false);
      });

      if (!isOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', true);
      }
    });
  });

  /* ==========================================================
     SCROLL OBSERVER
  ========================================================== */
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in, .fade-in-stagger').forEach(el => {
    observer.observe(el);
  });

  /* ==========================================================
     ACTIVE LINK HIGHLIGHTING
  ========================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  function setActiveLink() {
    const scrollY = window.scrollY + (navbar ? navbar.offsetHeight : 80) + 60;
    sections.forEach(section => {
      if (section.offsetTop <= scrollY && section.offsetTop + section.offsetHeight > scrollY) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${section.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ==========================================================
       COPY TO CLIPBOARD & TOAST
    ========================================================== */
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-clipboard');

      navigator.clipboard.writeText(textToCopy).then(() => {
        btn.classList.add('copied');
        showTooltip(btn, 'Gekopieerd!');

        setTimeout(() => {
          btn.classList.remove('copied');
        }, 2500);
      }).catch(err => {
        console.error('Kon tekst niet kopiëren', err);
      });
    });
  });

  function showTooltip(element, message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span>${message}</span>
    `;
    document.body.appendChild(toast);

    // Bereken positie boven de knop
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    toast.style.left = `${rect.left + scrollLeft + (rect.width / 2)}px`;
    toast.style.top = `${rect.top + scrollTop - rect.height}px`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add('show'));
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }
});