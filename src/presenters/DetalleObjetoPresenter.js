import { MENSAJES } from '../domain/mensajes';
import { prepararDetalle } from '../domain/detalle';

export class DetalleObjetoPresenter {
    constructor(vista, objetosRepository) {
        this.vista = vista;
        this.objetosRepository = objetosRepository;
    }

    async cargar(id) {
        const objeto = await this.objetosRepository.obtenerPorId(id);
        if (!objeto) {
            this.vista.mostrarNoEncontrado(MENSAJES.OBJETO_NO_ENCONTRADO);
            return;
        }
        this.vista.mostrarDetalle(prepararDetalle(objeto));
    }
}
