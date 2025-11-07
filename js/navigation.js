/**
 * Navigation Module
 * Handles mobile menu toggle and responsive navigation
 */

class Navigation {
  constructor() {
    // Support both navigation structures (index.html and other pages)
    this.mobileMenuBtn =
      document.getElementById('mobileMenuBtn') || document.getElementById('hamburger');
    this.mainNav = document.querySelector('.main-nav');
    this.navUl = document.querySelector('.main-nav ul') || document.getElementById('nav-links');
    this.breakpoint = 900;

    this.init();
  }

  init() {
    if (this.mobileMenuBtn && this.navUl) {
      this.setupMobileMenu();
      this.setupResponsiveNav();
    }

    this.setupSmoothScroll();
  }

  setupMobileMenu() {
    // Set initial ARIA attributes
    this.mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
    this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
    this.mobileMenuBtn.setAttribute('aria-controls', 'main-navigation');
    this.navUl.setAttribute('id', 'main-navigation');

    // Hide menu button initially
    this.mobileMenuBtn.style.display = 'none';

    // Check width and set initial state
    this.checkWidth();

    // Toggle menu on button click
    this.mobileMenuBtn.addEventListener('click', () => {
      const isHidden = this.navUl.style.display === 'none';

      if (isHidden) {
        this.navUl.style.display = 'flex';
        this.navUl.classList.add('active');
        this.mobileMenuBtn.setAttribute('aria-expanded', 'true');
      } else {
        this.navUl.style.display = 'none';
        this.navUl.classList.remove('active');
        this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when clicking a link
    this.navUl.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= this.breakpoint) {
          this.navUl.style.display = 'none';
          this.navUl.classList.remove('active');
          this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  checkWidth() {
    if (window.innerWidth <= this.breakpoint) {
      this.mobileMenuBtn.style.display = 'block';
      this.navUl.style.display = 'none';
      this.navUl.classList.remove('active');
    } else {
      this.mobileMenuBtn.style.display = 'none';
      this.navUl.style.display = 'flex';
      this.navUl.classList.remove('active');
    }
  }

  setupResponsiveNav() {
    window.addEventListener('resize', () => {
      this.checkWidth();
    });
  }

  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') {
          return;
        }

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  }
}

// Initialize navigation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new Navigation());
} else {
  new Navigation();
}

export default Navigation;
