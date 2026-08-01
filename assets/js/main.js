(function () {
  "use strict";

  const body = document.body;
  const header = document.querySelector("#header");
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const scrollTop = document.querySelector("#scroll-top");

  function updateScrollState() {
    const hasScrolled = window.scrollY > 80;
    body.classList.toggle("scrolled", hasScrolled);
    if (scrollTop) scrollTop.classList.toggle("active", hasScrolled);
  }

  function toggleMobileNavigation() {
    body.classList.toggle("mobile-nav-active");
    mobileToggle.classList.toggle("bi-list");
    mobileToggle.classList.toggle("bi-x");
  }

  if (mobileToggle) {
    mobileToggle.addEventListener("click", toggleMobileNavigation);
    mobileToggle.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") toggleMobileNavigation();
    });
  }

  document.querySelectorAll("#navmenu a").forEach((link) => {
    link.addEventListener("click", () => {
      if (body.classList.contains("mobile-nav-active")) toggleMobileNavigation();
    });
  });

  document.querySelectorAll("main section[id]").forEach((section) => {
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll("#navmenu a").forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${section.id}`);
        });
      });
    }, { rootMargin: "-35% 0px -55%" }).observe(section);
  });

  if (scrollTop) {
    scrollTop.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("load", () => {
    updateScrollState();
    AOS.init({ duration: 650, easing: "ease-in-out", once: true, mirror: false });
    new PureCounter();
  });
  document.addEventListener("scroll", updateScrollState, { passive: true });
})();
