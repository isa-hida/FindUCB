import { fechaEntregaPorDefecto , validarEntrega } from '../domain/entrega';
import { MENSAJES } from '../domain/mensajes';
import { RUTAS } from '../config';

export class RegistrarEntregaPresenter {
    constructor(vista, objetosRepository, retardo = 1500) {
        this.vista = vista;
        this.objetosRepository = objetosRepository;
        this.objetoId = null;
        this.retardo = retardo;
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
        await this._redirigirAlPanel();
    }

    async _redirigirAlPanel() {
        await new Promise((resolver) => setTimeout(resolver, this.retardo));
        this.vista.redirigir(RUTAS.PANEL_ADMIN);
    }

    cancelar() {
        this.vista.redirigir(RUTAS.PANEL_ADMIN);
    }
}