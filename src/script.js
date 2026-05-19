/* ============================================
   KEREX NIGERIA - SIMPLE VANILLA JAVASCRIPT
   Mobile menu toggle & scroll reveal
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("is-open");
      menuToggle.setAttribute(
        "aria-expanded",
        menuToggle.getAttribute("aria-expanded") === "true" ? "false" : "true",
      );
    });

    // Close menu when clicking a link
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll Reveal Animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with .reveal class
  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      mobileNav &&
      !mobileNav.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      mobileNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Smooth scroll for hash links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
