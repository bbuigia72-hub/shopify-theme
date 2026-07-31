(() => {
  document.querySelectorAll('.minimal-slideshow').forEach((root) => {
    if (root.dataset.swiperInitialized === 'true' || !window.Swiper) return;
    const element = root.querySelector('.minimal-slideshow__viewport');
    if (!element) return;
    root.dataset.swiperInitialized = 'true';
    const current = root.querySelector('.minimal-slideshow__current');
    const total = root.querySelector('.minimal-slideshow__total');
    const progress = root.querySelector('.minimal-slideshow__progress-bar');
    const slideCount = element.querySelectorAll('.swiper-slide').length;
    if (total) total.textContent = slideCount;
    const updateControls = (swiper) => {
      if (current) current.textContent = String((swiper.realIndex || 0) + 1);
      if (progress) progress.style.width = `${((swiper.realIndex || 0) + 1) / Math.max(slideCount, 1) * 100}%`;
    };
    new window.Swiper(element, {
      slidesPerView: 1,
      loop: element.querySelectorAll('.swiper-slide').length > 1,
      speed: 700,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      autoplay: root.dataset.autoplay === 'true' ? {
        delay: Number(root.dataset.delay) || 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      } : false,
      navigation: {
        prevEl: root.querySelector('.swiper-button-prev'),
        nextEl: root.querySelector('.swiper-button-next')
      },
      pagination: {
        enabled: false
      },
      on: { init: updateControls, slideChange: updateControls },
      keyboard: { enabled: true },
      a11y: { enabled: true }
    });
  });
})();
