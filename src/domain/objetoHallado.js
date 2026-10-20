import { MENSAJES } from './mensajes';

export function validarObjetoHallado({ categoria, descripcion, senas, fechaHallazgo, hoy, fotoPath }) {
    if (!categoria || !descripcion) {
        return [MENSAJES.FALTA_CATEGORIA_DESCRIPCION];
    }
    if (!fotoPath) {
        return [MENSAJES.FOTO_OBLIGATORIA];
    }
    const extensionesValidas = ['.jpg', '.jpeg', '.png'];
    const esFormatoValido = extensionesValidas.some((ext) => fotoPath.toLowerCase().endsWith(ext));
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