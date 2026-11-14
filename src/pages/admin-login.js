import { autenticacion } from '../services/index.js';
import { LoginAdminVista } from '../views/LoginAdminVista.js';
import { LoginAdminPresenter } from '../presenters/LoginAdminPresenter.js';

const vista = new LoginAdminVista(document);
const presenter = new LoginAdminPresenter(vista, autenticacion);

vista.alEnviar((correo, password) => presenter.ingresar(correo, password));

window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) form.reset();
});