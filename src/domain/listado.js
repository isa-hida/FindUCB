import { MENSAJES } from './mensajes';

export function prepararListado(objetos) {
    return objetos
        .filter((objeto) => objeto.estado === 'publicado')
        .sort((primero, segundo) =>
            segundo.fechaHallazgo.localeCompare(primero.fechaHallazgo) || segundo.numero - primero.numero)
        .map(({ id, categoria, color, fechaHallazgo, rutaFoto }) => ({ id, categoria, color, fechaHallazgo, rutaFoto }));
}

const esPosteriorA = (fecha, desde) => !desde || fecha >= desde;
const esAnteriorA = (fecha, hasta) => !hasta || fecha <= hasta;

const CRITERIOS_DE_FILTRO = [
    {
        estaActivo: ({ categoria }) => Boolean(categoria),
        cumple: (tarjeta, { categoria }) => tarjeta.categoria === categoria,
    },
    {
        estaActivo: ({ desde, hasta }) => Boolean(desde || hasta),
        cumple: ({ fechaHallazgo }, { desde, hasta }) =>
            esPosteriorA(fechaHallazgo, desde) && esAnteriorA(fechaHallazgo, hasta),
    },
    {
        estaActivo: ({ color }) => Boolean(color),
        cumple: (tarjeta, { color }) => tarjeta.color === color,
    },
];

const criteriosActivos = (filtros) => CRITERIOS_DE_FILTRO.filter((criterio) => criterio.estaActivo(filtros));

export function filtrarListado(tarjetas, filtros) {
    const criterios = criteriosActivos(filtros);
    return tarjetas.filter((tarjeta) => criterios.every((criterio) => criterio.cumple(tarjeta, filtros)));
}

export function validarFiltros({ desde, hasta }) {
    if (desde && hasta && desde > hasta) {
        return [MENSAJES.FECHAS_INVERTIDAS];
    }
    return [];
}
