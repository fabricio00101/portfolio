document.addEventListener("DOMContentLoaded", () => {
  // ScrollReveal con Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll(".reveal");
  revealElements.forEach((el) => observer.observe(el));

  // Dark Mode Toggle
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (themeToggleBtn) {
    // Chequear preferencia guardada
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      updateToggleIcon(savedTheme);
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      // Chequear preferencia del sistema
      document.documentElement.setAttribute("data-theme", "dark");
      updateToggleIcon("dark");
    }

    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateToggleIcon(newTheme);
    });

    function updateToggleIcon(theme) {
      if (theme === "dark") {
        themeToggleBtn.innerHTML = "☀️";
      } else {
        themeToggleBtn.innerHTML = "🌙";
      }
    }
  }
});
