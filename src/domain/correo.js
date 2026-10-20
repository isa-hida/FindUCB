import { MENSAJES } from './mensajes';

export function esCorreoInstitucional(correo) {
    if (!correo) {
        return false;
    }
    return correo.trim().toLowerCase().endsWith('@ucb.edu.bo');
}

export function validarCorreoComunidad(correo) {
    if (!correo || !correo.trim()) {
        return [MENSAJES.CAMPOS_LOGIN_VACIOS];
    }
    if (!esCorreoInstitucional(correo)) {
        return [MENSAJES.CORREO_NO_INSTITUCIONAL];
    }
    return [];
}