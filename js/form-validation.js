document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const name = form.querySelector("#name");
  const email = form.querySelector("#email");
  const phone = form.querySelector("#phone");
  const service = form.querySelector("#service");
  const message = form.querySelector("#message");

  form.addEventListener("submit", function (e) {
    let valid = true;
    clearErrors();
    let firstInvalid = null;

    // Trim all fields
    name.value = name.value.trim();
    email.value = email.value.trim();
    phone.value = phone.value.trim();
    message.value = message.value.trim();

    if (name.value === "") {
      showError(name, "Name is required.");
      valid = false;
      firstInvalid = firstInvalid || name;
    }

    if (!validateEmail(email.value)) {
      showError(email, "Enter a valid email.");
      valid = false;
      firstInvalid = firstInvalid || email;
    }

    if (phone.value && !/^\d{10,15}$/.test(phone.value)) {
      showError(phone, "Enter a valid phone number.");
      valid = false;
      firstInvalid = firstInvalid || phone;
    }

    if (!service.value) {
      showError(service, "Please select a service.");
      valid = false;
      firstInvalid = firstInvalid || service;
    }

    if (message.value.length < 10) {
      showError(message, "Please provide more details (at least 10 characters).");
      valid = false;
      firstInvalid = firstInvalid || message;
    }

    if (!valid) {
      e.preventDefault();
      if (firstInvalid) firstInvalid.focus();
    }
  });

  function showError(field, message) {
    // Prevent duplicate errors
    if (field.parentElement.querySelector(".form-error")) return;
    const error = document.createElement("small");
    error.className = "form-error";
    error.style.color = "red";
    error.style.display = "block";
    error.style.marginTop = "4px";
    error.innerText = message;
    field.parentElement.appendChild(error);
  }

  function clearErrors() {
    const errors = document.querySelectorAll(".form-error");
    errors.forEach((e) => e.remove());
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    // Accessibility: ARIA attributes
    hamburger.setAttribute("aria-label", "Open navigation menu");
    hamburger.setAttribute("aria-controls", "nav-links");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("tabindex", "0");
    navLinks.setAttribute("aria-hidden", "true");

    function toggleMenu() {
      const isActive = navLinks.classList.toggle("active");
      hamburger.setAttribute("aria-expanded", isActive ? "true" : "false");
      navLinks.setAttribute("aria-hidden", isActive ? "false" : "true");
    }

    hamburger.addEventListener("click", toggleMenu);

    // Keyboard accessibility
    hamburger.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleMenu();
      }
    });

    // Close menu when a link is clicked (mobile UX)
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          hamburger.setAttribute("aria-expanded", "false");
          navLinks.setAttribute("aria-hidden", "true");
        }
      });
    });
  }
});