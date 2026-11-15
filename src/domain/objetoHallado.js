import { MENSAJES } from './mensajes';

function falta(texto) {
    return !texto || !texto.trim();
}

function faltanDatosDelHallazgo({ fechaHallazgo, lugar, color, encontradoPor }) {
    const { nombre, celular } = encontradoPor ?? {};
    return [fechaHallazgo, lugar, color, nombre, celular].some(falta);
}

export function validarObjetoHallado(datos) {
    const { categoria, descripcion, senas, fechaHallazgo, hoy, rutaFoto } = datos;

    if (!categoria || !descripcion) {
        return [MENSAJES.FALTA_CATEGORIA_DESCRIPCION];
    }
    if (faltanDatosDelHallazgo(datos)) {
        return [MENSAJES.FALTAN_DATOS_HALLAZGO];
    }
    if (!rutaFoto) {
        return [MENSAJES.FOTO_OBLIGATORIA];
    }
    const extensionesValidas = ['.jpg', '.jpeg', '.png'];
    const esFormatoValido = extensionesValidas.some((ext) => rutaFoto.toLowerCase().endsWith(ext));
    if (!esFormatoValido) {
        return [MENSAJES.FORMATO_FOTO_INVALIDO];
    }

    if ((descripcion && descripcion.length > 500) || (senas && senas.length > 500)) {
        return [MENSAJES.TEXTO_MUY_LARGO];
    }
    if (fechaHallazgo && hoy && fechaHallazgo > hoy) {
        return [MENSAJES.FECHA_FUTURA];
    }
    return [];
}