export function prepararListado(objetos) {
    return objetos
        .filter((objeto) => objeto.estado === 'publicado')
        .sort((primero, segundo) =>
            segundo.fechaHallazgo.localeCompare(primero.fechaHallazgo) || segundo.numero - primero.numero)
        .map(({ id, categoria, fechaHallazgo, fotoPath }) => ({ id, categoria, fechaHallazgo, fotoPath }));
}

export function filtrarListado(tarjetas, { categoria, desde, hasta }) {
    return tarjetas.filter((tarjeta) =>
        (!categoria || tarjeta.categoria === categoria) &&
        (!desde || tarjeta.fechaHallazgo >= desde) &&
        (!hasta || tarjeta.fechaHallazgo <= hasta));
}
