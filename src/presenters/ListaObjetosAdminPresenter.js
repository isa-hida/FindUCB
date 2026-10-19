import { crearFilaAdmin ,filtrarPublicados } from '../domain/listaAdmin';
import { MENSAJES } from '../domain/mensajes';


export class ListaObjetosAdminPresenter {
    constructor(vista, objetosRepository) {
        this.vista = vista;
        this.objetosRepository = objetosRepository;
    }

    async cargar() {
        const objetos = await this.objetosRepository.listarParaAdmin();
        const publicados = filtrarPublicados(objetos);
        this.vista.mostrarFilas(publicados.map(crearFilaAdmin));
        if (publicados.length === 0) {
            this.vista.mostrarMensajeVacio(MENSAJES.SIN_OBJETOS_PUBLICADOS);
        }
    }
}