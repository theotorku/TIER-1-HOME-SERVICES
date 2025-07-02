// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    // Accessibility: ARIA attributes
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    hamburger.setAttribute('aria-controls', 'nav-links');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('tabindex', '0');
    navLinks.setAttribute('aria-hidden', 'true');

    function toggleMenu() {
      const isActive = navLinks.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      navLinks.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    }

    hamburger.addEventListener('click', toggleMenu);

    // Keyboard accessibility
    hamburger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });

    // Close menu when a link is clicked (mobile UX)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
          navLinks.setAttribute('aria-hidden', 'true');
        }
      });
    });
  }
});