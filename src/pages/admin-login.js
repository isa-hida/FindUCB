import { autenticacion } from '../services/index.js';
import { LoginAdminVista } from '../views/LoginAdminVista.js';
import { LoginAdminPresenter } from '../presenters/LoginAdminPresenter.js';

const vista = new LoginAdminVista(document);
const presenter = new LoginAdminPresenter(vista, autenticacion);

vista.alEnviar((correo, password) => presenter.ingresar(correo, password));