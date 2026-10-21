import { fechaEntregaPorDefecto , validarEntrega } from '../domain/entrega';
import { MENSAJES } from '../domain/mensajes';
import { RUTAS } from '../config';

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
            this.vista.ocultarFormulario();
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
            return;
        }
        await this.objetosRepository.registrarEntrega(this.objetoId, datos);
        this.vista.mostrarExito(MENSAJES.ENTREGA_REGISTRADA);
        this.vista.ocultarFormulario();
    }
    cancelar() {
        this.vista.redirigir(RUTAS.PANEL_ADMIN);
    }
}