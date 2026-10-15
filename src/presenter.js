import { esCorreoInstitucional } from './auth/validadorCorreo.js';

const form = document.querySelector('#login-form');
const emailInput = document.querySelector('#login-email');
const passInput = document.querySelector('#login-pass');
const errorDiv = document.querySelector('#login-error');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const correo = emailInput.value.trim();
  const password = passInput.value.trim();

  if (!correo || !password) {
    errorDiv.textContent = 'Por favor, ingrese correo y contraseña';
    errorDiv.style.display = 'block';
    return;
  }

  if (!esCorreoInstitucional(correo)) {
    errorDiv.textContent = 'Correo o contraseña no son válidos';
    errorDiv.style.display = 'block';
    return;
  }

  errorDiv.style.display = 'none';
});