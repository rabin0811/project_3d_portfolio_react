const API_BASE = 'http://localhost:5000';

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    const toast = form.querySelector('.form-toast');
    const btn = form.querySelector('button[type="submit"]');

    btn.classList.add('btn--loading');
    toast.hidden = true;
    toast.className = 'form-toast';

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const body = await res.json();

      if (!res.ok) {
        throw new Error(body.error || 'Server error');
      }

      showToast(form, 'Message sent successfully! I\'ll get back to you soon.', 'success');
      form.reset();
    } catch (err) {
      showToast(form, err.message || 'Failed to send. Please try again later.', 'error');
    } finally {
      btn.classList.remove('btn--loading');
    }
  });

  form.querySelectorAll('input, textarea').forEach((el) => {
    el.addEventListener('blur', () => {
      const errorEl = el.closest('.form-field')?.querySelector('.form-field__error');
      if (!errorEl) return;
      if (el.validity.valid) {
        errorEl.textContent = '';
      } else {
        errorEl.textContent = getFieldError(el);
      }
    });

    el.addEventListener('input', () => {
      const errorEl = el.closest('.form-field')?.querySelector('.form-field__error');
      if (errorEl && el.validity.valid) {
        errorEl.textContent = '';
      }
    });
  });
}

function validateForm(form) {
  let valid = true;

  ['name', 'email', 'message'].forEach((id) => {
    const el = form[id];
    const errorEl = el.closest('.form-field')?.querySelector('.form-field__error');
    if (!el.validity.valid) {
      errorEl.textContent = getFieldError(el);
      valid = false;
    } else if (errorEl) {
      errorEl.textContent = '';
    }
  });

  return valid;
}

function getFieldError(el) {
  if (el.validity.valueMissing) {
    return 'This field is required';
  }
  if (el.validity.tooShort) {
    return `Minimum ${el.minLength} characters`;
  }
  if (el.validity.typeMismatch && el.type === 'email') {
    return 'Please enter a valid email address';
  }
  return 'Invalid value';
}

function showToast(form, message, type) {
  const toast = form.querySelector('.form-toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = `form-toast form-toast--${type}`;
  toast.hidden = false;

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.hidden = true;
      toast.style.opacity = '1';
    }, 300);
  }, 5000);
}
