import { MENSAJES } from './mensajes';
import { aFechaIso } from './fecha';

export function validarEntrega(entrega) {
    if (!entrega.nombre.trim() || !entrega.ci.trim()) {
        return [MENSAJES.FALTA_NOMBRE_CI];
    }
    return [];
}

export function fechaEntregaPorDefecto(hoy = new Date()) {
    return aFechaIso(hoy);
}