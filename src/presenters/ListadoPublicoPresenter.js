import { MENSAJES } from '../domain/mensajes';
import { prepararListado } from '../domain/listado';

export class ListadoPublicoPresenter {
    constructor(vista, objetosRepository) {
        this.vista = vista;
        this.objetosRepository = objetosRepository;
    }

    async cargar() {
        const objetos = await this.objetosRepository.listarPublicados();
        const tarjetas = prepararListado(objetos);
        if (tarjetas.length === 0) {
            this.vista.mostrarVacio(MENSAJES.SIN_OBJETOS_HALLADOS);
            return;
        }
        this.vista.mostrarTarjetas(tarjetas);
    }
}
