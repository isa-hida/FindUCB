export function formatearFecha(fecha) {
    const [anio, mes, dia] = fecha.split('-');
    return `${dia}/${mes}/${anio}`;
}

const conCeros = (numero) => String(numero).padStart(2, '0');

export function aFechaIso(fecha) {
    return `${fecha.getFullYear()}-${conCeros(fecha.getMonth() + 1)}-${conCeros(fecha.getDate())}`;
}