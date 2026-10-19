import { MENSAJES } from '../domain/mensajes';
import { prepararListado } from '../domain/listado';

export class ListadoPublicoPresenter {
    constructor(vista, objetosRepository, fotosStorage) {
        this.vista = vista;
        this.objetosRepository = objetosRepository;
        this.fotosStorage = fotosStorage;
    }

    async cargar() {
        const objetos = await this.objetosRepository.listarPublicados();
        const tarjetas = prepararListado(objetos);
        if (tarjetas.length === 0) {
            this.vista.mostrarVacio(MENSAJES.SIN_OBJETOS_HALLADOS);
            return;
        }
        const urls = await this.fotosStorage.urlsFirmadas(tarjetas.map((tarjeta) => tarjeta.fotoPath));
        this.vista.mostrarTarjetas(tarjetas.map((tarjeta, indice) => ({ ...tarjeta, fotoUrl: urls[indice] })));
    }
}
