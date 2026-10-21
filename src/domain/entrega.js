import { MENSAJES } from './mensajes';

export function validarEntrega(datos) {
    if (!datos.nombre.trim() || !datos.ci.trim()) {
        return [MENSAJES.FALTA_NOMBRE_CI];
    }
    return [];
}

export function fechaEntregaPorDefecto(hoy = new Date()) {
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');

    return `${anio}-${mes}-${dia}`;
}