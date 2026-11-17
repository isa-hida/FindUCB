import { MENSAJES } from './mensajes';

export function prepararListado(objetos) {
    return objetos
        .filter((objeto) => objeto.estado === 'publicado')
        .sort((primero, segundo) =>
            segundo.fechaHallazgo.localeCompare(primero.fechaHallazgo) || segundo.numero - primero.numero)
        .map(({ id, categoria, color, fechaHallazgo, rutaFoto }) => ({ id, categoria, color, fechaHallazgo, rutaFoto }));
}

const normalizar = (texto) => texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// "Negro" queda en "negr" para que coincida con negra, negros y negras
const raizDeColor = (color) => normalizar(color).replace(/[oa]$/, '');

const esPosteriorA =(fecha, desde) => !desde || fecha >= desde;
const esAnteriorA = (fecha, hasta) => !hasta || fecha <= hasta;

const CRITERIOS_DE_FILTRO = [
    {
        estaActivo: ({ categoria }) => Boolean(categoria),
        cumple: (tarjeta, { categoria }) => tarjeta.categoria === categoria,
        mensajeSinResultados: MENSAJES.SIN_COINCIDENCIAS,
    },
    {
        estaActivo: ({ desde, hasta }) => Boolean(desde || hasta),
        cumple: ({ fechaHallazgo }, { desde, hasta }) =>
            esPosteriorA(fechaHallazgo, desde) && esAnteriorA(fechaHallazgo, hasta),
        mensajeSinResultados: MENSAJES.SIN_OBJETOS_EN_FECHAS,
    },
    {
        estaActivo: ({ color }) => Boolean(color),
        cumple: (tarjeta, { color }) => normalizar(tarjeta.color).includes(raizDeColor(color)),
        mensajeSinResultados: MENSAJES.SIN_OBJETOS_DEL_COLOR,
    },
];

const criteriosActivos = (filtros) => CRITERIOS_DE_FILTRO.filter((criterio) => criterio.estaActivo(filtros));

export function filtrarListado(tarjetas, filtros) {
    const criterios = criteriosActivos(filtros);
    return tarjetas.filter((tarjeta) => criterios.every((criterio) => criterio.cumple(tarjeta, filtros)));
}

export function mensajeSinResultados(filtros) {
    const [criterio] = criteriosActivos(filtros);
    return criterio.mensajeSinResultados;
}

export function validarFiltros({ desde, hasta }) {
    if (desde && hasta && desde > hasta) {
        return [MENSAJES.FECHAS_INVERTIDAS];
    }
    return [];
}
