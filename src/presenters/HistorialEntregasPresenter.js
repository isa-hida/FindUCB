import { crearFilaHistorial } from '../domain/historial';

export class HistorialEntregasPresenter {
    constructor(vista, objetosRepository) {
        this.vista = vista;
        this.objetosRepository = objetosRepository;
    }

    async cargar() {
        const entregados = await this.objetosRepository.listarEntregados();
        this.vista.mostrarFilas(entregados.map(crearFilaHistorial));
    }
}