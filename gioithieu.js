document.addEventListener("DOMContentLoaded", function() {
    // Hiệu ứng cuộn mượt cho các liên kết
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Hiệu ứng xuất hiện khi cuộn
    const faders = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    const appearOptions = {
        threshold: 0.2, // Phần tử sẽ xuất hiện khi 20% của nó nằm trong khung nhìn
        rootMargin: "0px 0px -50px 0px" // Bắt đầu hiệu ứng sớm hơn một chút
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target); // Ngừng theo dõi sau khi đã xuất hiện
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});
