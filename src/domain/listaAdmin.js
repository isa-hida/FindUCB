export function filtrarPublicados(objetos) {
    return objetos .filter(objeto => objeto.estado === 'publicado');
}

export function crearFilaAdmin(objeto) {
    return { numero: objeto.numero, categoria: objeto.categoria , 
        fechaHallazgo: objeto.fechaHallazgo , fotoPath: objeto.fotoPath };
}