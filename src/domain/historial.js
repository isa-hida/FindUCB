export function crearFilaHistorial(objeto) {
    return {
        id: objeto.id,
        numero: objeto.numero,
        categoria: objeto.categoria,
        rutaFoto: objeto.rutaFoto,
        nombreReceptor: objeto.entrega.nombre,
        fechaEntrega: objeto.entrega.fechaEntrega,
    };
}