/* MyAdress — petits comportements de la page */
(function () {
  'use strict';

  var root = document.documentElement;
  var ua = navigator.userAgent || '';

  /* 1. Type d'appareil -------------------------------------------------- */
  var isIOS = /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/i.test(ua);

  if (isIOS) root.classList.add('is-ios');
  if (isAndroid) root.classList.add('is-android');

  // Sur iPhone, un APK ne sert à rien : le bouton indique que l'app est sur Android uniquement.
  if (isIOS) {
    document.querySelectorAll('.js-apk').forEach(function (link) {
      link.removeAttribute('download');
      link.removeAttribute('href');
      link.setAttribute('aria-disabled', 'true');
      link.classList.add('is-disabled');
      var label = link.querySelector('.js-apk-label');
      if (label && link.dataset.iosLabel) label.textContent = link.dataset.iosLabel;
    });
  }

  /* 2. Apparition des sections au défilement ---------------------------- */
  var items = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
