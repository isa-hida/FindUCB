import { MENSAJES } from './mensajes';
import { aFechaIso } from './fecha';

export function validarEntrega(datos) {
    if (!datos.nombre.trim() || !datos.ci.trim()) {
        return [MENSAJES.FALTA_NOMBRE_CI];
    }
    return [];
}

export function fechaEntregaPorDefecto(hoy = new Date()) {
    return aFechaIso(hoy);
}