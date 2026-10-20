import { MENSAJES } from './mensajes';

export function validarEntrega(datos) {
    if (!datos.nombre) {
        return [MENSAJES.FALTA_NOMBRE_CI];
    }
    return [];
}