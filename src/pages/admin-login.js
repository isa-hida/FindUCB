import { autenticacion } from '../services/index.js';
import { LoginAdminVista } from '../views/LoginAdminVista.js';
import { LoginAdminPresenter } from '../presenters/LoginAdminPresenter.js';

const vista = new LoginAdminVista(document);
const presenter = new LoginAdminPresenter(vista, autenticacion);

vista.alEnviar((correo, password) => presenter.ingresar(correo, password));

window.addEventListener('pageshow', (event) => {
    const form = document.getElementById('login-form');
    if (form) {
        form.reset();
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    if (form) {
        form.reset();
    }
});