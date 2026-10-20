import { MENSAJES } from './mensajes';

export function validarLoginAdmin({ correo, password }) {
    if (!correo || !password) {
        return [MENSAJES.CAMPOS_LOGIN_VACIOS];
    }
    return [];
}

export function esCorreoInstitucional(correo) {
    if (!correo) {
        return false;
    }
    return correo.trim().toLowerCase().endsWith('@ucb.edu.bo');
}

export function validarCorreoComunidad(correo) {
    if (!esCorreoInstitucional(correo)) {
        return [MENSAJES.CORREO_NO_INSTITUCIONAL];
    }
    return [];
}