import { MENSAJES } from './mensajes';
import { MAX_CARACTERES_TEXTO } from './limites';

const EXTENSIONES_FOTO = ['.jpg', '.jpeg', '.png'];

function falta(texto) {
    return !texto || !texto.trim();
}

function faltanDatosDelHallazgo({ fechaHallazgo, lugar, color, encontradoPor }) {
    const { nombre, celular } = encontradoPor ?? {};
    return [fechaHallazgo, lugar, color, nombre, celular].some(falta);
}

function errorDeFoto({ rutaFoto, fotoActual }) {
    if (!rutaFoto) {
        return fotoActual ? null : MENSAJES.FOTO_OBLIGATORIA;
    }
    const esFormatoValido = EXTENSIONES_FOTO.some((ext) => rutaFoto.toLowerCase().endsWith(ext));
    return esFormatoValido ? null : MENSAJES.FORMATO_FOTO_INVALIDO;
}

export function validarObjetoHallado(datos) {
    const { categoria, descripcion, senas, fechaHallazgo, hoy } = datos;

    if (!categoria || !descripcion) {
        return [MENSAJES.FALTA_CATEGORIA_DESCRIPCION];
    }
    if (faltanDatosDelHallazgo(datos)) {
        return [MENSAJES.FALTAN_DATOS_HALLAZGO];
    }
    const mensajeFoto = errorDeFoto(datos);
    if (mensajeFoto) {
        return [mensajeFoto];
    }
    if ((descripcion && descripcion.length > MAX_CARACTERES_TEXTO) || (senas && senas.length > MAX_CARACTERES_TEXTO)) {
        return [MENSAJES.TEXTO_MUY_LARGO];
    }
    if (fechaHallazgo && hoy && fechaHallazgo > hoy) {
        return [MENSAJES.FECHA_FUTURA];
    }
    return [];
}