const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  }
}, { threshold: 0.2 });

sections.forEach(s => observer.observe(s));
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('scrollProgress').style.width = scrollPercent + '%';
});
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 80) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});
document.querySelectorAll('.fade-up').forEach((el) => {
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      el.classList.add('visible');
    }
  }, { threshold: 0.2 }).observe(el);
});
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${e.offsetX}px`;
    sparkle.style.top = `${e.offsetY}px`;
    btn.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 500);
  });
});
document.querySelectorAll('.report-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('span');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      card.appendChild(particle);
      setTimeout(() => particle.remove(), 600);
    }
  });
});
const texts = [
  "Committed to Global Health",
  "Building a Healthier Future",
  "For Everyone, Everywhere"
];
let i = 0, j = 0, isDeleting = false;
const typingElement = document.querySelector(".typing-text");

function type() {
  if (!typingElement) return;
  let currentText = texts[i];
  if (!isDeleting) {
    typingElement.textContent = currentText.substring(0, j++);
    if (j > currentText.length) {
      isDeleting = true;
      setTimeout(type, 1000);
      return;
    }
  } else {
    typingElement.textContent = currentText.substring(0, j--);
    if (j < 0) {
      isDeleting = false;
      i = (i + 1) % texts.length;
    }
  }
  setTimeout(type, isDeleting ? 60 : 100);
}
type();
document.addEventListener("scroll", () => {
  document.querySelectorAll(".fade-up").forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add("visible");
    }
  });
});
document.querySelectorAll(".news-card").forEach(card => {
  card.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    
    const rect = card.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height)}px`;

    card.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
    
  });
});
// Mở trang khi click vào report-card
document.querySelectorAll('.report-card').forEach(card => {
  card.style.cursor = 'pointer'; // đổi con trỏ
  card.addEventListener('click', () => {
    const url = card.getAttribute('data-link');
    if (url) window.location.href = url;
  });
});
document.querySelectorAll(".news-card").forEach(card => {
  card.style.cursor = 'pointer'; // Thêm con trỏ để người dùng biết có thể click
  card.addEventListener("click", function (e) {
    // Tìm thẻ <a> bên trong news-card
    const link = card.querySelector('a');
    if (link && link.href) {
      // Chuyển hướng đến URL của thẻ <a>
      window.location.href = link.href;
    }
  });
});


