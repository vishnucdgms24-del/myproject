const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    menuToggle.setAttribute('aria-label', isExpanded ? 'Open navigation menu' : 'Close navigation menu');
    navLinks.classList.toggle('is-open', !isExpanded);
  });

  navLinks.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
      navLinks.classList.remove('is-open');
    }
  });
}

const currentYear = document.querySelector('#current-year');
if (currentYear) currentYear.textContent = new Date().getFullYear();

const form = document.querySelector('#join-form');

if (form) {
  const fields = ['name', 'email', 'department', 'year'];
  const formMessage = document.querySelector('#form-message');

  function getFieldError(field) {
    const value = field.value.trim();

    if (!value) {
      return field.tagName === 'SELECT' ? 'Please choose an option.' : 'Please fill out this field.';
    }
    if (field.name === 'name' && value.length < 2) {
      return 'Please enter at least 2 characters.';
    }
    if (field.name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please enter a valid email address.';
    }
    return '';
  }

  function validateField(field) {
    const error = getFieldError(field);
    const errorElement = document.querySelector(`#${field.name}-error`);
    field.setAttribute('aria-invalid', String(Boolean(error)));
    errorElement.textContent = error;
    return !error;
  }

  fields.forEach((name) => {
    const field = form.elements[name];
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validateField(field);
    });
    field.addEventListener('change', () => validateField(field));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const isValid = fields
      .map((name) => validateField(form.elements[name]))
      .every(Boolean);

    if (!isValid) {
      formMessage.textContent = 'A couple of details need your attention above.';
      formMessage.classList.add('error-message');
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }

    formMessage.textContent = 'Thanks for reaching out! Your details are ready to send to the club team.';
    formMessage.classList.remove('error-message');
    form.reset();
    fields.forEach((name) => {
      form.elements[name].removeAttribute('aria-invalid');
      document.querySelector(`#${name}-error`).textContent = '';
    });
  });
}
