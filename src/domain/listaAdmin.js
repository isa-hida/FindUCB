export function filtrarPublicados(objetos) {
    return objetos .filter(objeto => objeto.estado === 'publicado');
}