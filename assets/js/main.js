/* ==========================================================================
   Tufisioterapeuta.net - Interactive Scripts (Zero Cookies / Pure Vanilla JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFlipBoxes();
  initReviewsCarousels();
  initAccordions();
  initLightbox();
  initMapFacades();
  initContactForm();
});

/* 1. Mobile Navigation & Dropdowns */
function initMobileNav() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const mobilePanel = document.querySelector('.nav-mobile-panel');

  if (toggleBtn && mobilePanel) {
    toggleBtn.addEventListener('click', () => {
      const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', String(!expanded));
      mobilePanel.classList.toggle('is-open', !expanded);
      mobilePanel.setAttribute('aria-hidden', String(expanded));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobilePanel.classList.contains('is-open')) {
        toggleBtn.setAttribute('aria-expanded', 'false');
        mobilePanel.classList.remove('is-open');
        mobilePanel.setAttribute('aria-hidden', 'true');
        toggleBtn.focus();
      }
    });
  }

  document.querySelectorAll('.mobile-sub-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('aria-controls');
      const subMenu = targetId ? document.getElementById(targetId) : null;
      if (!subMenu) return;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      subMenu.classList.toggle('is-open', !expanded);
    });
  });

  // Prevent '#' anchor jump on "Terapias" parent menu link
  document.querySelectorAll('.nav-item.has-dropdown > a[href="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = link.closest('.nav-item');
      if (parent) parent.classList.toggle('is-open');
    });
  });
}

/* 2. Flip Boxes (Touch & Keyboard support) */
function initFlipBoxes() {
  document.querySelectorAll('.flip-box').forEach((box) => {
    box.addEventListener('click', () => {
      box.classList.toggle('is-flipped');
    });
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        box.classList.toggle('is-flipped');
      }
    });
  });
}

/* 3. Google Reviews Carousel (Static Replica) */
function initReviewsCarousels() {
  document.querySelectorAll('[data-reviews-carousel]').forEach((root) => {
    const track = root.querySelector('.reviews-track');
    const cards = Array.from(root.querySelectorAll('.review-card'));
    const prevBtn = root.querySelector('.reviews-nav--prev');
    const nextBtn = root.querySelector('.reviews-nav--next');
    const progressBar = root.querySelector('.reviews-progress__bar');

    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    let autoplayTimer = null;

    function getVisibleCount() {
      if (window.innerWidth <= 767) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function updatePosition() {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, cards.length - visible);
      if (currentIndex > maxIndex) currentIndex = 0;
      if (currentIndex < 0) currentIndex = maxIndex;

      const cardWidth = cards[0].getBoundingClientRect().width;
      const gap = 16;
      track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;

      if (progressBar) {
        const pct = maxIndex === 0 ? 100 : ((currentIndex + visible) / cards.length) * 100;
        progressBar.style.width = `${Math.min(100, Math.max(15, pct))}%`;
      }
    }

    function nextSlide() {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, cards.length - visible);
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updatePosition();
    }

    function prevSlide() {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, cards.length - visible);
      currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      updatePosition();
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(nextSlide, 6000);
    }

    function stopAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoplay(); });

    root.addEventListener('mouseenter', stopAutoplay);
    root.addEventListener('mouseleave', startAutoplay);
    window.addEventListener('resize', updatePosition);

    // Read more / Ocultar toggles
    cards.forEach((card) => {
      const textEl = card.querySelector('.review-card__text');
      const btn = card.querySelector('.review-card__toggle');
      if (!textEl || !btn) return;

      // Only show button when content is long enough to clamp
      if (textEl.textContent.trim().length < 150) {
        btn.style.display = 'none';
      } else {
        btn.addEventListener('click', () => {
          const expanded = card.classList.toggle('is-expanded');
          btn.textContent = expanded ? 'Ocultar' : 'Leer más';
        });
      }
    });

    updatePosition();
    startAutoplay();
  });
}

/* 4. Accordion (/german-pelaez-racaj/) */
function initAccordions() {
  document.querySelectorAll('.accordion__trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const panelId = trigger.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;
      if (!panel) return;
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!isOpen));
      panel.classList.toggle('is-open', !isOpen);
    });
  });
}

/* 5. Photo Gallery Lightbox (/la-consulta/) */
function initLightbox() {
  const items = Array.from(document.querySelectorAll('[data-lightbox]'));
  if (items.length === 0) return;

  const modal = document.createElement('div');
  modal.className = 'lightbox';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Galería de imágenes');
  modal.innerHTML = `
    <button type="button" class="lightbox__close" aria-label="Cerrar">&times;</button>
    <button type="button" class="lightbox__prev" aria-label="Imagen anterior">&#8249;</button>
    <img class="lightbox__img" alt="">
    <button type="button" class="lightbox__next" aria-label="Imagen siguiente">&#8250;</button>
  `;
  document.body.appendChild(modal);

  const imgEl = modal.querySelector('.lightbox__img');
  const closeBtn = modal.querySelector('.lightbox__close');
  const prevBtn = modal.querySelector('.lightbox__prev');
  const nextBtn = modal.querySelector('.lightbox__next');

  let activeIndex = 0;

  function show(index) {
    activeIndex = (index + items.length) % items.length;
    const item = items[activeIndex];
    const src = item.getAttribute('href') || item.querySelector('img')?.src || '';
    const alt = item.getAttribute('data-caption') || item.querySelector('img')?.alt || 'Consulta Germán Peláez Racaj';
    imgEl.src = src;
    imgEl.alt = alt;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  items.forEach((item, idx) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      show(idx);
    });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => show(activeIndex - 1));
  nextBtn.addEventListener('click', () => show(activeIndex + 1));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(activeIndex - 1);
    if (e.key === 'ArrowRight') show(activeIndex + 1);
  });
}

/* 6. Cookie-Free Google Maps Click-to-Load Facade */
function initMapFacades() {
  document.querySelectorAll('[data-map-load]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const container = btn.closest('.map-box');
      const embedUrl = btn.getAttribute('data-map-src');
      if (!container || !embedUrl) return;

      const iframe = document.createElement('iframe');
      iframe.src = embedUrl;
      iframe.title = 'Mapa de la consulta de Germán Peláez Racaj en Moratalaz, Madrid';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.allowFullscreen = true;

      container.innerHTML = '';
      container.appendChild(iframe);
    });
  });
}

/* 7. Contact Form via FormSubmit.co (AJAX with graceful fallback) */
function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const statusEl = form.querySelector('.form-status');
  const submitBtn = form.querySelector('button[type="submit"]');
  const ajaxEndpoint = form.getAttribute('data-ajax-action');

  form.addEventListener('submit', async (e) => {
    if (!ajaxEndpoint || !window.fetch) return; // fallback to normal POST
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    if (statusEl) {
      statusEl.className = 'form-status';
      statusEl.textContent = '';
    }

    try {
      const formData = new FormData(form);
      const response = await fetch(ajaxEndpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });

      if (response.ok) {
        form.reset();
        if (statusEl) {
          statusEl.className = 'form-status is-success';
          statusEl.textContent = '¡Gracias! Tu solicitud se ha enviado correctamente. Nos pondremos en contacto contigo lo antes posible.';
        }
      } else {
        throw new Error('Error en el envío');
      }
    } catch (_err) {
      if (statusEl) {
        statusEl.className = 'form-status is-error';
        statusEl.innerHTML = 'No se ha podido enviar el formulario en este momento. Puedes llamarnos al <a href="tel:+34650188759"><strong>650 188 759</strong></a>, escribirnos por <a href="https://wa.me/34610632822" target="_blank" rel="noopener"><strong>WhatsApp</strong></a> o enviar un email a <a href="mailto:tufisioterapeuta@gmail.com"><strong>tufisioterapeuta@gmail.com</strong></a>.';
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}
