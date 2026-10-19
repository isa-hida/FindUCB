import { crearFilaAdmin } from '../domain/listaAdmin';

export class ListaObjetosAdminPresenter {
    constructor(vista, objetosRepository) {
        this.vista = vista;
        this.objetosRepository = objetosRepository;
    }

    async cargar() {
        const objetos = await this.objetosRepository.listarParaAdmin();
        this.vista.mostrarFilas(objetos.map(crearFilaAdmin));
    }
}