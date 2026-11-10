import { LoginComunidadVista } from '../views/LoginComunidadVista.js';
import { LoginComunidadPresenter } from '../presenters/LoginComunidadPresenter.js';
import { autenticacion } from '../services/index.js';

const vista = new LoginComunidadVista();
const presenter = new LoginComunidadPresenter(vista, autenticacion);

vista.alEnviar(async () => {
    const correo = vista.obtenerCorreo();
    await presenter.ingresar(correo);
});