import { LoginComunidadVista } from '../views/LoginComunidadVista';
import { LoginComunidadPresenter } from '../presenters/LoginComunidadPresenter';
import { authService } from '../services';

const vista = new LoginComunidadVista();
const presenter = new LoginComunidadPresenter(vista, authService);

vista.alEnviar(async () => {
    const correo = vista.obtenerCorreo();
    await presenter.ingresar(correo);
});