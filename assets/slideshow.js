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
    const autoplayDelay = Number(root.dataset.autoplayDelay);
    const autoplayEnabled = root.dataset.autoplay === 'true' && slideCount > 1 && Number.isFinite(autoplayDelay) && autoplayDelay >= 0;
    const transitionSpeed = 550;
    const progressDuration = autoplayDelay === 0 ? transitionSpeed : autoplayDelay;
    root.style.setProperty('--minimal-progress-duration', `${progressDuration}ms`);
    if (total) total.textContent = slideCount;
    const restartProgress = (swiper) => {
      if (!progress) return;
      progress.classList.remove('is-running');
      progress.style.width = autoplayEnabled ? '0%' : `${((swiper.realIndex || 0) + 1) / Math.max(slideCount, 1) * 100}%`;
      void progress.offsetWidth;
      if (autoplayEnabled) progress.classList.add('is-running');
    };
    const updateControls = (swiper) => {
      if (current) current.textContent = String((swiper.realIndex || 0) + 1);
      restartProgress(swiper);
    };
    new window.Swiper(element, {
      slidesPerView: 1,
      loop: element.querySelectorAll('.swiper-slide').length > 1,
      speed: transitionSpeed,
      effect: 'fade',
      fadeEffect: { crossFade: false },
      autoplay: autoplayEnabled ? {
        delay: autoplayDelay,
        disableOnInteraction: false,
        pauseOnMouseEnter: false
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
