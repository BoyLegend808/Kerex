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

    // Close menu when clicking a link or button
    mobileNav.querySelectorAll("a, button").forEach((element) => {
      element.addEventListener("click", () => {
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

  // Modal Dialog Functionality
  const modalTriggers = document.querySelectorAll(".modal-trigger");
  const modals = document.querySelectorAll(".modal");
  const modalCloseButtons = document.querySelectorAll(".modal-close");

  // Open modals
  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const modalId = trigger.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.showModal();
        document.body.style.overflow = "hidden";
      }
    });
  });

  // Close modals with close button
  modalCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      modal.close();
      document.body.style.overflow = "";
    });
  });

  // Close modals when clicking backdrop
  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.close();
        document.body.style.overflow = "";
      }
    });
  });

  // Close modals with Escape key
  modals.forEach((modal) => {
    modal.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        modal.close();
        document.body.style.overflow = "";
      }
    });
  });
});
