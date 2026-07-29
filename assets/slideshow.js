(() => {
  document.querySelectorAll('.minimal-slideshow').forEach((root) => {
    const track = root.querySelector('.minimal-slideshow__track');
    const slides = [...root.querySelectorAll('.minimal-slide')];
    const pagination = root.querySelector('.minimal-slideshow__pagination');
    if (!track || slides.length < 1) return;
    let index = 0;
    const render = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
      slides.forEach((slide, i) => slide.setAttribute('aria-hidden', i === index ? 'false' : 'true'));
      if (pagination) pagination.querySelectorAll('button').forEach((button, i) => button.setAttribute('aria-selected', i === index ? 'true' : 'false'));
    };
    if (pagination) slides.forEach((_, i) => { const button = document.createElement('button'); button.type = 'button'; button.setAttribute('role', 'tab'); button.setAttribute('aria-label', `Go to slide ${i + 1}`); button.addEventListener('click', () => { index = i; render(); }); pagination.appendChild(button); });
    root.querySelector('.minimal-slideshow__arrow--previous')?.addEventListener('click', () => { index = (index - 1 + slides.length) % slides.length; render(); });
    root.querySelector('.minimal-slideshow__arrow--next')?.addEventListener('click', () => { index = (index + 1) % slides.length; render(); });
    render();
    if (root.dataset.autoplay === 'true' && slides.length > 1) window.setInterval(() => { index = (index + 1) % slides.length; render(); }, Number(root.dataset.delay) || 5000);
  });
})();
