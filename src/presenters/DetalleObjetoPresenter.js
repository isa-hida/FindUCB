import { MENSAJES } from '../domain/mensajes';

export class DetalleObjetoPresenter {
    constructor(vista, objetosRepository) {
        this.vista = vista;
        this.objetosRepository = objetosRepository;
    }

    async cargar() {
        this.vista.mostrarNoEncontrado(MENSAJES.OBJETO_NO_ENCONTRADO);
    }
}
