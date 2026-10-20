import { MENSAJES } from './mensajes';

export function validarObjetoHallado({ categoria, descripcion, fechaHallazgo, hoy }) {
    if (!categoria || !descripcion) {
        return [MENSAJES.FALTA_CATEGORIA_DESCRIPCION];
    }
    if (fechaHallazgo && hoy && fechaHallazgo > hoy) {
        return [MENSAJES.FECHA_FUTURA];
    }
    return [];
}