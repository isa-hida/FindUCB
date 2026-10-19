export function prepararListado(objetos) {
    return objetos
        .filter((objeto) => objeto.estado === 'publicado')
        .sort((primero, segundo) =>
            segundo.fechaHallazgo.localeCompare(primero.fechaHallazgo) || segundo.numero - primero.numero);
}
