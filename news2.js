document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade-in');

  // Khi load trang, cho những phần nằm trong màn hình hiện luôn
  faders.forEach(fader => {
    if (fader.getBoundingClientRect().top < window.innerHeight) {
      fader.classList.add('visible');
    }
  });

  // Các phần nằm ngoài màn hình thì sẽ hiện khi cuộn tới
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});
