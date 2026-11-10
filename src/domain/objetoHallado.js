import { MENSAJES } from './mensajes';

export function validarObjetoHallado({ categoria, descripcion, senas, fechaHallazgo, hoy, rutaFoto }) {
    if (!categoria || !descripcion) {
        return [MENSAJES.FALTA_CATEGORIA_DESCRIPCION];
    }
    if (!rutaFoto) {
        return [MENSAJES.FOTO_OBLIGATORIA];
    }
    const extensionesValidas = ['.jpg', '.jpeg', '.png'];
    const esFormatoValido = extensionesValidas.some((ext) => rutaFoto.toLowerCase().endsWith(ext));
    if (!esFormatoValido) {
        return ['El formato de la foto debe ser JPG o PNG'];
    }

    if ((descripcion && descripcion.length > 500) || (senas && senas.length > 500)) {
        return [MENSAJES.TEXTO_MUY_LARGO];
    }
    if (fechaHallazgo && hoy && fechaHallazgo > hoy) {
        return [MENSAJES.FECHA_FUTURA];
    }
    return [];
}