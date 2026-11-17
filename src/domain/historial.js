export function crearFilaHistorial(objeto) {
    return {
        id: objeto.id,
        numero: objeto.numero,
        categoria: objeto.categoria,
        rutaFoto: objeto.rutaFoto,
        nombreReceptor: objeto.entrega.nombre,
        celularReceptor: objeto.entrega.celular,
        fechaEntrega: objeto.entrega.fechaEntrega,
    };
}