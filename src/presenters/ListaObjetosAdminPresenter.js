import { crearFilaAdmin ,filtrarPublicados } from '../domain/listaAdmin';
import { MENSAJES } from '../domain/mensajes';
import { RUTAS } from '../config';


export class ListaObjetosAdminPresenter {
    constructor(vista, objetosRepository) {
        this.vista = vista;
        this.objetosRepository = objetosRepository;
    }

    async cargar() {
        const objetos = await this.objetosRepository.listarParaAdmin();
        const publicados = filtrarPublicados(objetos);
        const filas = publicados.map((objeto) => ({
            ...crearFilaAdmin(objeto),
            urlEntrega: `${RUTAS.REGISTRAR_ENTREGA}?id=${objeto.id}`,
        }));
        this.vista.mostrarFilas(filas);
        if (publicados.length === 0) {
            this.vista.mostrarMensajeVacio(MENSAJES.SIN_OBJETOS_PUBLICADOS);
        }
    }
}