(() => {
  document.querySelectorAll('.minimal-slideshow').forEach((root) => {
    if (root.dataset.swiperInitialized === 'true' || !window.Swiper) return;
    const element = root.querySelector('.minimal-slideshow__viewport');
    if (!element) return;
    root.dataset.swiperInitialized = 'true';
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
        el: root.querySelector('.minimal-slideshow__pagination'),
        clickable: true,
        bulletElement: 'button'
      },
      keyboard: { enabled: true },
      a11y: { enabled: true }
    });
  });
})();
