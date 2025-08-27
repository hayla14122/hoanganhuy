document.addEventListener("DOMContentLoaded", function () {
    // Hiệu ứng cuộn
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up, .fade-in-up-delay, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
    });

    // Nút Chat rung khi load
    const chatBtn = document.getElementById('chat-toggle-btn');
    if (chatBtn) {
        chatBtn.classList.add('shake');
        setTimeout(() => {
            chatBtn.classList.remove('shake');
        }, 2000);
    }
});