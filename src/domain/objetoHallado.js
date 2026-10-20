import { MENSAJES } from './mensajes';

export function validarObjetoHallado({ categoria, descripcion }) {
    if (!categoria || !descripcion) {
        return [MENSAJES.FALTA_CATEGORIA_DESCRIPCION];
    }
    return [];
}