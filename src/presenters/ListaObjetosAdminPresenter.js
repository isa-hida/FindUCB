import { crearFilaAdmin ,filtrarPublicados } from '../domain/listaAdmin';

export class ListaObjetosAdminPresenter {
    constructor(vista, objetosRepository) {
        this.vista = vista;
        this.objetosRepository = objetosRepository;
    }

    async cargar() {
        const objetos = await this.objetosRepository.listarParaAdmin();
        const publicados = filtrarPublicados(objetos);
        this.vista.mostrarFilas(publicados.map(crearFilaAdmin));
    }
}