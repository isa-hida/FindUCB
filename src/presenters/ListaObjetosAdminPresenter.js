import { crearFilaAdmin ,filtrarPublicados } from '../domain/listaAdmin';
import { MENSAJES } from '../domain/mensajes';
import { RUTAS } from '../config';


export class ListaObjetosAdminPresenter {
    constructor(vista, objetosRepository,fotosStorage) {
        this.vista = vista;
        this.objetosRepository = objetosRepository;
        this.fotosStorage = fotosStorage;
    }

    async cargar() {
        const objetos = await this.objetosRepository.listarParaAdmin();
        const publicados = filtrarPublicados(objetos);
        const urlsFotos = await this.fotosStorage.urlsFirmadas(
            publicados.map((objeto) => objeto.fotoPath),
        );
        const filas = publicados.map((objeto,indice) => ({
            ...crearFilaAdmin(objeto),
            fotoUrl: urlsFotos[indice],
            urlEntrega: `${RUTAS.REGISTRAR_ENTREGA}?id=${objeto.id}`,
        }));
        this.vista.mostrarFilas(filas);
        if (publicados.length === 0) {
            this.vista.mostrarMensajeVacio(MENSAJES.SIN_OBJETOS_PUBLICADOS);
        }
    }
}