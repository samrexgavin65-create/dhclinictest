(function () {
  var navToggle = document.querySelector(".nav-toggle");
  var navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", function (event) {
      if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var revealElements = document.querySelectorAll(".reveal");
  revealElements.forEach(function (el, index) {
    el.style.animationDelay = String(index * 70) + "ms";
  });

  var carousels = document.querySelectorAll(".testimonial-carousel");
  carousels.forEach(function (carousel) {
    var track = carousel.querySelector(".testimonial-track");
    var slides = carousel.querySelectorAll(".testimonial");
    var buttons = carousel.querySelectorAll("[data-carousel]");
    if (!track || slides.length === 0) {
      return;
    }

    var current = 0;
    var timer = null;

    function render() {
      track.style.transform = "translateX(" + String(current * -100) + "%)";
    }

    function go(step) {
      current = (current + step + slides.length) % slides.length;
      render();
    }

    function startAuto() {
      stopAuto();
      timer = window.setInterval(function () {
        go(1);
      }, 6500);
    }

    function stopAuto() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var dir = Number(btn.getAttribute("data-carousel"));
        go(dir);
      });
    });

    carousel.addEventListener("mouseenter", stopAuto);
    carousel.addEventListener("mouseleave", startAuto);
    carousel.addEventListener("focusin", stopAuto);
    carousel.addEventListener("focusout", startAuto);

    render();
    startAuto();
  });

  var root = document.body;
  var contrastBtn = document.getElementById("toggle-contrast");
  var fontBtn = document.getElementById("toggle-font");

  function applyAccessibilityFromStorage() {
    if (localStorage.getItem("dhc-contrast") === "on") {
      root.classList.add("high-contrast");
    }
    if (localStorage.getItem("dhc-large-text") === "on") {
      root.classList.add("large-text");
    }
  }

  function toggleClass(button, className, storageKey) {
    if (!button) {
      return;
    }
    button.addEventListener("click", function () {
      var enabled = root.classList.toggle(className);
      localStorage.setItem(storageKey, enabled ? "on" : "off");
      button.setAttribute("aria-pressed", String(enabled));
    });
  }

  applyAccessibilityFromStorage();
  if (contrastBtn) {
    contrastBtn.setAttribute("aria-pressed", String(root.classList.contains("high-contrast")));
  }
  if (fontBtn) {
    fontBtn.setAttribute("aria-pressed", String(root.classList.contains("large-text")));
  }
  toggleClass(contrastBtn, "high-contrast", "dhc-contrast");
  toggleClass(fontBtn, "large-text", "dhc-large-text");

  var forms = document.querySelectorAll(".js-form");
  forms.forEach(function (form) {
    var status = form.querySelector(".form-status");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = form.querySelector("[name='name']");
      var email = form.querySelector("[name='email']");
      var message = form.querySelector("[name='message']");

      var valid = true;
      if (name && name.value.trim().length < 2) {
        valid = false;
      }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        valid = false;
      }
      if (message && message.value.trim().length < 8) {
        valid = false;
      }

      if (status) {
        if (!valid) {
          status.className = "form-status error";
          status.textContent = "Please complete all required fields with valid information.";
          return;
        }

        status.className = "form-status success";
        if (form.getAttribute("data-form-type") === "newsletter") {
          status.textContent = "Thanks for subscribing. We will send the next patient education update by email.";
        } else {
          status.textContent = "Thank you. Your message is ready to send. Connect this form to your preferred backend endpoint.";
        }
      }

      form.reset();
    });
  });

  var years = document.querySelectorAll(".js-year");
  var year = String(new Date().getFullYear());
  years.forEach(function (node) {
    node.textContent = year;
  });
})();
