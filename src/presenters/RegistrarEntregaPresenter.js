import { fechaEntregaPorDefecto } from '../domain/entrega';

export class RegistrarEntregaPresenter {
    constructor(vista) {
        this.vista = vista;
    }

    cargar(_objetoId, hoy = new Date()) {
        this.vista.mostrarFechaEntrega(fechaEntregaPorDefecto(hoy));
    }
}