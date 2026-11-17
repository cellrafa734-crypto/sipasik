const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuButton?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Galeri otomatis berganti setiap lima detik.
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

if (slides.length > 1) {
  setInterval(() => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }, 5000);
}

// Animasi elemen ketika masuk ke area layar.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => {
  revealObserver.observe(element);
});

// ===== SIPAFIK SCROLL REVEAL & VIDEO FALLBACK =====
document.addEventListener("DOMContentLoaded", () => {
    const revealItems = document.querySelectorAll(
        "main section, .gallery-card, .event-card, .facility-card, .quick-card, .role-card"
    );

    revealItems.forEach((item, index) => {
        if (!item.closest(".hero, .hero-section")) {
            item.classList.add("sipafik-reveal");
            item.style.transitionDelay = `${(index % 4) * 90}ms`;
        }
    });

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealItems.forEach((item) => {
            if (!item.closest(".hero, .hero-section")) observer.observe(item);
        });
    } else {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    // Jika video belum tersedia, tampilkan poster/foto hero.
    document.querySelectorAll("video").forEach((video) => {
        video.addEventListener("error", () => {
            video.style.display = "none";
        });
        video.addEventListener("loadeddata", () => {
            video.style.display = "block";
        });
    });
});
