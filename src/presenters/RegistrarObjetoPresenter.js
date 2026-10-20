import { MENSAJES } from '../domain/mensajes';
import { validarObjetoHallado } from '../domain/objetoHallado';

export class RegistrarObjetoPresenter {
    constructor(vista, objetosRepository) {
        this.vista = vista;
        this.objetosRepository = objetosRepository;
    }

    async registrar(datos) {
        this.vista.limpiarError();

        const errores = validarObjetoHallado(datos);
        if (errores.length > 0) {
            this.vista.mostrarError(errores[0]);
            return;
        }

        await this.objetosRepository.registrar(datos);
        this.vista.mostrarExito(MENSAJES.AVISO_PUBLICADO);
    }
}