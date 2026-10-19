import { MENSAJES } from '../domain/mensajes';

export class ListadoPublicoPresenter {
    constructor(vista, objetosRepository) {
        this.vista = vista;
        this.objetosRepository = objetosRepository;
    }

    async cargar() {
        this.vista.mostrarVacio(MENSAJES.SIN_OBJETOS_HALLADOS);
    }
}
