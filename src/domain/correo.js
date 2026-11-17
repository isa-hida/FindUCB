import { MENSAJES } from './mensajes';
import { estaVacio } from './texto';

export function esCorreoInstitucional(correo) {
    if (!correo) {
        return false;
    }
    return correo.trim().toLowerCase().endsWith('@ucb.edu.bo');
}

export function validarCorreoComunidad(correo) {
    if (estaVacio(correo)) {
        return [MENSAJES.CAMPOS_LOGIN_VACIOS];
    }
    if (!esCorreoInstitucional(correo)) {
        return [MENSAJES.CORREO_NO_INSTITUCIONAL];
    }
    return [];
}