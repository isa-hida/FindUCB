export function prepararListado(objetos) {
    return objetos.filter((objeto) => objeto.estado === 'publicado');
}
