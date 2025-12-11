/**
 * Gallery Lightbox Module
 * Handles image gallery and lightbox functionality with keyboard navigation
 */

import './chatbot.js';

class GalleryLightbox {
  constructor() {
    this.galleryItems = document.querySelectorAll('.gallery-item');
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImg = document.getElementById('lightbox-img');
    this.lightboxCaption = document.getElementById('lightbox-caption');
    this.currentIndex = 0;

    if (!this.lightbox || this.galleryItems.length === 0) {
      return;
    }

    this.init();
  }

  init() {
    this.setupGalleryItems();
    this.setupLightboxClose();
    this.setupKeyboardNavigation();
  }

  setupGalleryItems() {
    this.galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => this.openLightbox(index));

      // Add keyboard support
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openLightbox(index);
        }
      });
    });
  }

  openLightbox(index) {
    this.currentIndex = index;
    const item = this.galleryItems[index];
    const img = item.querySelector('img');

    if (!img) {
      return;
    }

    const imgSrc = img.getAttribute('src') || img.getAttribute('data-src');
    const imgAlt = img.getAttribute('alt') || '';

    this.lightboxImg.setAttribute('src', imgSrc);
    this.lightboxImg.setAttribute('alt', imgAlt);
    this.lightboxCaption.textContent = imgAlt;

    this.lightbox.classList.add('active');
    this.lightbox.setAttribute('aria-hidden', 'false');

    // Trap focus in lightbox
    this.lightboxImg.focus();
  }

  closeLightbox() {
    this.lightbox.classList.remove('active');
    this.lightbox.setAttribute('aria-hidden', 'true');

    // Return focus to the gallery item
    if (this.galleryItems[this.currentIndex]) {
      this.galleryItems[this.currentIndex].focus();
    }
  }

  setupLightboxClose() {
    this.lightbox.addEventListener('click', (e) => {
      // Close only if clicking the background, not the image
      if (e.target === this.lightbox) {
        this.closeLightbox();
      }
    });
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('active')) {
        return;
      }

      switch (e.key) {
        case 'Escape':
          this.closeLightbox();
          break;
        case 'ArrowLeft':
          this.navigatePrevious();
          break;
        case 'ArrowRight':
          this.navigateNext();
          break;
      }
    });
  }

  navigatePrevious() {
    this.currentIndex =
      (this.currentIndex - 1 + this.galleryItems.length) % this.galleryItems.length;
    this.openLightbox(this.currentIndex);
  }

  navigateNext() {
    this.currentIndex = (this.currentIndex + 1) % this.galleryItems.length;
    this.openLightbox(this.currentIndex);
  }
}

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new GalleryLightbox();
});

export default GalleryLightbox;
