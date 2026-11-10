import { MENSAJES } from '../domain/mensajes';
import { validarObjetoHallado } from '../domain/objetoHallado';

export class RegistrarObjetoPresenter {
    constructor(vista, objetosRepository) {
        this.vista = vista;
        this.objetosRepository = objetosRepository;
    }

    async registrar(datosObjeto) {
        this.vista.limpiarError();

        const errores = validarObjetoHallado(datosObjeto);
        if (errores.length > 0) {
            this.vista.mostrarError(errores[0]);
            return;
        }

        await this.objetosRepository.registrar(datosObjeto);
        this.vista.mostrarExito(MENSAJES.AVISO_PUBLICADO);
    }
}