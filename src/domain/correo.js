import { MENSAJES } from './mensajes';

export function validarLoginAdmin({ correo, password }) {
    if (!correo || !password) {
        return [MENSAJES.CAMPOS_LOGIN_VACIOS];
    }
    return [];
}