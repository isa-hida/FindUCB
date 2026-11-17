import { MENSAJES } from './mensajes';
import { MAX_CARACTERES_TEXTO } from './limites';
import { estaVacio } from './texto';

const EXTENSIONES_FOTO = ['.jpg', '.jpeg', '.png'];

function faltanDatosDelHallazgo({ fechaHallazgo, lugar, color, encontradoPor }) {
    const { nombre, celular } = encontradoPor ?? {};
    return [fechaHallazgo, lugar, color, nombre, celular].some(estaVacio);
}

function tieneFormatoDeFotoValido(rutaFoto) {
    return EXTENSIONES_FOTO.some((extension) => rutaFoto.toLowerCase().endsWith(extension));
}

function mensajeDeFotoInvalida({ rutaFoto, fotoActual }) {
    if (!rutaFoto) {
        return fotoActual ? null : MENSAJES.FOTO_OBLIGATORIA;
    }
    return tieneFormatoDeFotoValido(rutaFoto) ? null : MENSAJES.FORMATO_FOTO_INVALIDO;
}

export function validarObjetoHallado(datos) {
    const { categoria, descripcion, senas, fechaHallazgo, hoy } = datos;

    if (!categoria || !descripcion) {
        return [MENSAJES.FALTA_CATEGORIA_DESCRIPCION];
    }
    if (faltanDatosDelHallazgo(datos)) {
        return [MENSAJES.FALTAN_DATOS_HALLAZGO];
    }
    const mensajeFoto = mensajeDeFotoInvalida(datos);
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