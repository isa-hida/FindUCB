import { MENSAJES } from './mensajes';

export function validarObjetoHallado({ categoria, descripcion, senas, fechaHallazgo, hoy }) {
    if (!categoria || !descripcion) {
        return [MENSAJES.FALTA_CATEGORIA_DESCRIPCION];
    }
    if ((descripcion && descripcion.length > 500) || (senas && senas.length > 500)) {
        return [MENSAJES.TEXTO_MUY_LARGO];
    }
    if (fechaHallazgo && hoy && fechaHallazgo > hoy) {
        return [MENSAJES.FECHA_FUTURA];
    }
    return [];
}