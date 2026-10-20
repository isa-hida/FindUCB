import { MENSAJES } from './mensajes';

export function validarEntrega(datos) {
    if (!datos.nombre.trim() || !datos.ci) {
        return [MENSAJES.FALTA_NOMBRE_CI];
    }
    return [];
}