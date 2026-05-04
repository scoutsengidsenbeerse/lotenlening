/* ============================================================
   Scouts en Gidsen Beerse – Lotenlening 2026
   Main JavaScript
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     NAVBAR & MOBILE MENU
  ========================================================== */
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
       SCROLL HANDLING (NAVBAR & ACTIVE LINKS)
    ========================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  let ticking = false;

  function handleScroll() {
    // 1. Navbar shadow
    navbar.classList.toggle('scrolled', window.scrollY > 20);

    // 2. Active link highlighting
    const scrollY = window.scrollY + (navbar ? navbar.offsetHeight : 80) + 60;

    sections.forEach(section => {
      if (section.offsetTop <= scrollY && section.offsetTop + section.offsetHeight > scrollY) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${section.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ==========================================================
     SCROLL ANIMATIONS (FADE IN)
  ========================================================== */
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
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

/* ==========================================================
   PROGRESS BAR DATA FETCH (Google Sheets)
========================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRCL6GDypagbVTG9rZQdW8gY436MxgXMTscfOSsTkJ5lsQ_TBBuHA9Lpv7o4n2G4LQCoaxTXJbeGhR8/pub?gid=0&single=true&output=csv';
    const MAX_LOTEN = 240;

    async function fetchProgress() {
        try {
            const response = await fetch(CSV_URL);
            if (!response.ok) throw new Error("Netwerk respons was niet ok");

            const csvText = await response.text();
            const rows = csvText.split('\n');

            // We zoeken in cel C5:
            if (rows.length >= 5) {
                const columns = rows[4].split(',');

                if (columns.length >= 3) {
                    // Haal alle letters/spaties/quotes weg, behoud enkel cijfers
                    const rawValue = columns[2].replace(/[^0-9]/g, '');
                    const lotenVerkocht = parseInt(rawValue, 10);

                    if (!isNaN(lotenVerkocht)) {
                        updateProgressBar(lotenVerkocht);
                        return;
                    }
                }
            }
            throw new Error("Cel C5 niet gevonden of bevat geen geldig getal.");

        } catch (error) {
            console.error("Fout bij ophalen voortgang:", error);
            document.getElementById('progress-text').innerText = "Voortgang momenteel niet beschikbaar";
        }
    }

    function updateProgressBar(verkocht) {
        // Zorg ervoor dat het getal niet onder 0 of boven het maximum gaat
        const progress = Math.min(Math.max(verkocht, 0), MAX_LOTEN);
        const percentage = (progress / MAX_LOTEN) * 100;

        const bar = document.getElementById('progress-bar');
        const textElement = document.getElementById('progress-text');

        const currentValueElement = document.getElementById('progress-current-value');

        // Kleine timeout zodat de animatie soepel inlaadt
        setTimeout(() => {
            bar.style.width = percentage + '%';
            bar.setAttribute('aria-valuenow', progress);
        }, 300);

        textElement.innerHTML = `<strong>${progress}</strong> van ${MAX_LOTEN} loten verkocht`;

        if (currentValueElement) {
            const euroBedrag = progress * 250;
            currentValueElement.innerText = progress > 0 ? `€${euroBedrag.toLocaleString('nl-BE')}` : '';        }
    }

    // Roep de functie aan als het element op de pagina bestaat
    if (document.getElementById('progress-bar')) {
        fetchProgress();
    }
});