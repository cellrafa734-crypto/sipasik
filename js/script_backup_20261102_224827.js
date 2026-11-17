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

// ===== SIPAFIK PREMIUM MOTION V2 =====
(() => {
    if (window.sipafikPremiumMotionV2) return;
    window.sipafikPremiumMotionV2 = true;

    document.addEventListener("DOMContentLoaded", () => {
        // Progress bar saat halaman digulir
        const progress = document.createElement("div");
        progress.className = "sipafik-scroll-progress";
        progress.setAttribute("aria-hidden", "true");
        document.body.appendChild(progress);

        const updateProgress = () => {
            const maxScroll =
                document.documentElement.scrollHeight - window.innerHeight;

            const percent = maxScroll > 0
                ? (window.scrollY / maxScroll) * 100
                : 0;

            progress.style.width = `${Math.min(100, percent)}%`;
        };

        window.addEventListener("scroll", updateProgress, { passive: true });
        window.addEventListener("resize", updateProgress);
        updateProgress();

        // Reveal bertahap untuk bagian halaman dan kartu
        const elements = document.querySelectorAll(
            "main section, section, .event-card, .facility-card, " +
            ".role-card, .quick-card, .gallery-card"
        );

        const uniqueElements = [...new Set(elements)];

        uniqueElements.forEach((element, index) => {
            if (
                element.closest(".hero, .hero-section") ||
                element.classList.contains("sipafik-reveal")
            ) return;

            element.classList.add("sipafik-premium-reveal");
            element.style.transitionDelay = `${(index % 4) * 100}ms`;
        });

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(
                            "sipafik-premium-visible"
                        );
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });

            uniqueElements.forEach((element) => {
                if (element.classList.contains("sipafik-premium-reveal")) {
                    observer.observe(element);
                }
            });
        } else {
            uniqueElements.forEach((element) => {
                element.classList.add("sipafik-premium-visible");
            });
        }
    });
})();
