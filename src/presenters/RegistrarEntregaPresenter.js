import { fechaEntregaPorDefecto , validarEntrega } from '../domain/entrega';
import { MENSAJES } from '../domain/mensajes';

export class RegistrarEntregaPresenter {
    constructor(vista, objetosRepository) {
        this.vista = vista;
        this.objetosRepository = objetosRepository;
        this.objetoId = null;
    }

    async cargar(objetoId, hoy = new Date()) {
        const objeto = await this.objetosRepository.obtenerPorId(objetoId);
        if (!objeto) {
            this.vista.mostrarError(MENSAJES.OBJETO_NO_ENCONTRADO);
            return;
        }
        this.objetoId = objetoId;
        this.vista.mostrarFechaEntrega(fechaEntregaPorDefecto(hoy));
    }

    async confirmar(datos) {
        this.vista.limpiarError();
        const errores = validarEntrega(datos);
        if (errores.length > 0) {
            this.vista.mostrarError(errores[0]);
        }
        await this.objetosRepository.registrarEntrega(this.objetoId, datos);
    }
}