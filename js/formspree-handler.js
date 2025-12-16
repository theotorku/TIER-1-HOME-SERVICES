/**
 * Formspree Form Handler
 * Handles form submission feedback and success messages
 */

class FormspreeHandler {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.statusDiv = document.getElementById('formStatus');
    this.submitBtn = document.getElementById('submitBtn');
    
    if (this.form) {
      this.init();
    }
  }

  init() {
    // Check for success parameter in URL
    this.checkUrlParams();
    
    // Add submit event listener
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('success') === 'true') {
      this.showSuccess();
      // Remove the success parameter from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    // Disable submit button
    this.submitBtn.disabled = true;
    this.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    try {
      const formData = new FormData(this.form);
      const response = await fetch(this.form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        this.showSuccess();
        this.form.reset();
      } else {
        const data = await response.json();
        if (data.errors) {
          this.showError(data.errors.map(error => error.message).join(', '));
        } else {
          this.showError('Oops! There was a problem submitting your form.');
        }
      }
    } catch (error) {
      this.showError('Network error. Please check your connection and try again.');
    } finally {
      // Re-enable submit button
      this.submitBtn.disabled = false;
      this.submitBtn.innerHTML = this.getOriginalButtonText();
    }
  }

  getOriginalButtonText() {
    const formId = this.form.id;
    if (formId === 'contactForm') {
      return '<i class="fas fa-paper-plane"></i> Send Message';
    } else if (formId === 'estimateForm') {
      return 'Submit Request';
    }
    return 'Submit';
  }

  showSuccess() {
    this.statusDiv.style.display = 'block';
    this.statusDiv.style.backgroundColor = '#d4edda';
    this.statusDiv.style.color = '#155724';
    this.statusDiv.style.border = '1px solid #c3e6cb';
    this.statusDiv.innerHTML = `
      <i class="fas fa-check-circle"></i> 
      <strong>Thank you!</strong> Your message has been sent successfully. 
      We'll get back to you within 24 hours.
    `;
    
    // Scroll to message
    this.statusDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Hide after 10 seconds
    setTimeout(() => {
      this.statusDiv.style.display = 'none';
    }, 10000);
  }

  showError(message) {
    this.statusDiv.style.display = 'block';
    this.statusDiv.style.backgroundColor = '#f8d7da';
    this.statusDiv.style.color = '#721c24';
    this.statusDiv.style.border = '1px solid #f5c6cb';
    this.statusDiv.innerHTML = `
      <i class="fas fa-exclamation-circle"></i> 
      <strong>Error:</strong> ${message}
    `;
    
    // Scroll to message
    this.statusDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Initialize form handlers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check which page we're on and initialize appropriate form
  if (document.getElementById('contactForm')) {
    new FormspreeHandler('contactForm');
  }
  
  if (document.getElementById('estimateForm')) {
    new FormspreeHandler('estimateForm');
  }
});

export default FormspreeHandler;

