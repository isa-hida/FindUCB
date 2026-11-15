import { crearFilaHistorial } from '../domain/historial';
import { MENSAJES } from '../domain/mensajes';

export class HistorialEntregasPresenter {
    constructor(vista, objetosRepository) {
        this.vista = vista;
        this.objetosRepository = objetosRepository;
    }

    async cargar() {
        const entregados = await this.objetosRepository.listarEntregados();
        this.vista.mostrarFilas(entregados.map(crearFilaHistorial));
        if (entregados.length === 0) {
            this.vista.mostrarMensajeVacio(MENSAJES.SIN_OBJETOS_ENTREGADOS);
        }
    }
}