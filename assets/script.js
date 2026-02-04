/**
 * Ayuluxir Wellness – main site script
 * Runs only on pages that contain the relevant elements (index, services, careers).
 */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(function () {
    // ----- Navigation (all pages with .nav-toggle) -----
    var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
      });
      navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          // Delay closing menu so anchor/href navigation completes on mobile
          setTimeout(function () {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
          }, 0);
        });
      });
    }

    // ----- Homepage: Promo popup (index only) -----
    var promoPopup = document.getElementById('promo-popup');
    if (promoPopup) {
      var promoClose = promoPopup.querySelector('.promo-popup-close');
      var promoStorageKey = 'ayuluxir_promo_last_closed';
      function showPromo() {
        promoPopup.removeAttribute('hidden');
        requestAnimationFrame(function () {
          promoPopup.classList.add('is-visible');
        });
      }
      function hidePromo() {
        promoPopup.classList.remove('is-visible');
        promoPopup.setAttribute('hidden', '');
        try {
          localStorage.setItem(promoStorageKey, new Date().toDateString());
        } catch (e) {}
      }
      // Show once per day: if never closed, or last closed on a different day
      var today = new Date().toDateString();
      var lastClosed = null;
      try { lastClosed = localStorage.getItem(promoStorageKey); } catch (e) {}
      if (lastClosed !== today) {
        setTimeout(showPromo, 600);
      }
      if (promoClose) {
        promoClose.addEventListener('click', hidePromo);
      }
      promoPopup.addEventListener('click', function (e) {
        if (e.target === promoPopup) { hidePromo(); }
      });
    }

    // ----- Homepage: Carousel (index only) -----
    var track = document.querySelector('.carousel-track');
    var cards = document.querySelectorAll('.card');
    var next = document.querySelector('.arrow.right');
    var prev = document.querySelector('.arrow.left');
    if (track && cards.length && next && prev) {
      var index = 0;
      var visibleCount = 3;
      function updateCarousel() {
        var cardWidth = cards[0].offsetWidth + 32;
        track.style.transform = 'translateX(-' + index * cardWidth + 'px)';
      }
      next.addEventListener('click', function () {
        if (index < cards.length - visibleCount) {
          index++;
          updateCarousel();
        }
      });
      prev.addEventListener('click', function () {
        if (index > 0) {
          index--;
          updateCarousel();
        }
      });
      window.addEventListener('resize', updateCarousel);
    }

    // ----- Homepage: Expand/collapse cards (index only) -----
    if (cards.length) {
      document.querySelectorAll('.card .card-description').forEach(function (d) {
        d.style.display = 'none';
        d.style.maxHeight = '0px';
      });
      document.querySelectorAll('.expand-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var card = btn.closest('.card');
          var desc = card.querySelector('.card-description');
          var isOpen = card.classList.contains('expanded');
          document.querySelectorAll('.card.expanded').forEach(function (c) {
            if (c !== card) {
              c.classList.remove('expanded');
              var d = c.querySelector('.card-description');
              if (d) {
                d.style.maxHeight = '0px';
                d.addEventListener('transitionend', function handler() {
                  d.style.display = 'none';
                  d.removeEventListener('transitionend', handler);
                }, { once: true });
              }
            }
          });
          if (!isOpen) {
            card.classList.add('expanded');
            desc.style.display = 'block';
            requestAnimationFrame(function () {
              desc.style.maxHeight = desc.scrollHeight + 'px';
            });
          } else {
            card.classList.remove('expanded');
            desc.style.maxHeight = '0px';
            desc.addEventListener('transitionend', function handler() {
              desc.style.display = 'none';
              desc.removeEventListener('transitionend', handler);
            }, { once: true });
          }
        });
      });
    }

    // ----- Homepage: Contact form (index only) -----
    var form = document.getElementById('contact-form');
    var formStatus = document.getElementById('form-status');
    if (form && formStatus) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var action = form.getAttribute('action');
        if (!action || action === '#' || action.indexOf('YOUR_') !== -1) {
          formStatus.textContent = 'Please configure the form action URL.';
          return;
        }
        var data = new FormData(form);
        fetch(action, {
          method: form.getAttribute('method') || 'POST',
          body: data,
          headers: { Accept: 'application/json' }
        })
          .then(function (res) {
            if (res.ok) {
              formStatus.textContent = 'Thank you! We will contact you shortly.';
              form.reset();
            } else {
              formStatus.textContent = 'Oops! Please try again.';
            }
          })
          .catch(function () {
            formStatus.textContent = 'Network error — check connection.';
          });
      });
    }

    // ----- Footer year (any page with #year) -----
    var yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  });
})();
