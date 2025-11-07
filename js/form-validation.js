/**
 * Form Validation Module
 * Handles client-side form validation with accessibility support
 */

class FormValidator {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    if (!this.form) {
      return;
    }

    this.fields = {
      name: this.form.querySelector('#name'),
      email: this.form.querySelector('#email'),
      phone: this.form.querySelector('#phone'),
      service: this.form.querySelector('#service'),
      message: this.form.querySelector('#message'),
    };

    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Add real-time validation on blur
    Object.values(this.fields).forEach((field) => {
      if (field) {
        field.addEventListener('blur', () => this.validateField(field));
      }
    });
  }

  handleSubmit(e) {
    let isValid = true;
    let firstInvalid = null;

    this.clearErrors();

    // Trim all text fields
    Object.entries(this.fields).forEach(([key, field]) => {
      if (field && field.type !== 'select-one') {
        field.value = field.value.trim();
      }
    });

    // Validate each field
    Object.entries(this.fields).forEach(([key, field]) => {
      if (field && !this.validateField(field)) {
        isValid = false;
        firstInvalid = firstInvalid || field;
      }
    });

    if (!isValid) {
      e.preventDefault();
      if (firstInvalid) {
        firstInvalid.focus();
      }
    }
  }

  validateField(field) {
    const fieldName = field.id;
    const value = field.value.trim();
    let errorMessage = '';

    switch (fieldName) {
      case 'name':
        if (!value) {
          errorMessage = 'Name is required.';
        } else if (value.length < 2) {
          errorMessage = 'Name must be at least 2 characters.';
        }
        break;

      case 'email':
        if (!value) {
          errorMessage = 'Email is required.';
        } else if (!this.isValidEmail(value)) {
          errorMessage = 'Please enter a valid email address.';
        }
        break;

      case 'phone':
        if (value && !this.isValidPhone(value)) {
          errorMessage = 'Please enter a valid phone number (10-15 digits).';
        }
        break;

      case 'service':
        if (!value) {
          errorMessage = 'Please select a service.';
        }
        break;

      case 'message':
        if (!value) {
          errorMessage = 'Message is required.';
        } else if (value.length < 10) {
          errorMessage = 'Please provide more details (at least 10 characters).';
        }
        break;
    }

    if (errorMessage) {
      this.showError(field, errorMessage);
      return false;
    }

    this.clearFieldError(field);
    return true;
  }

  showError(field, message) {
    this.clearFieldError(field);

    const error = document.createElement('small');
    error.className = 'form-error';
    error.setAttribute('role', 'alert');
    error.style.color = '#d32f2f';
    error.style.display = 'block';
    error.style.marginTop = '4px';
    error.style.fontSize = '0.875rem';
    error.textContent = message;

    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', `${field.id}-error`);
    error.id = `${field.id}-error`;

    field.parentElement.appendChild(error);
  }

  clearFieldError(field) {
    const existingError = field.parentElement.querySelector('.form-error');
    if (existingError) {
      existingError.remove();
    }
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
  }

  clearErrors() {
    const errors = this.form.querySelectorAll('.form-error');
    errors.forEach((error) => error.remove());

    Object.values(this.fields).forEach((field) => {
      if (field) {
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
      }
    });
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    const digitsOnly = phone.replace(/\D/g, '');
    return phoneRegex.test(phone) && digitsOnly.length >= 10 && digitsOnly.length <= 15;
  }
}

// Initialize form validation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new FormValidator('form');
});

export default FormValidator;