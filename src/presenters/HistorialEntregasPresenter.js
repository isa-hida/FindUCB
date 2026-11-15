import { crearFilaHistorial } from '../domain/historial';
import { MENSAJES } from '../domain/mensajes';

export class HistorialEntregasPresenter {
    constructor(vista, objetosRepository, fotosStorage) {
        this.vista = vista;
        this.objetosRepository = objetosRepository;
        this.fotosStorage = fotosStorage;
    }

    async cargar() {
        const entregados = await this.objetosRepository.listarEntregados();
        const urlsFotos = await this.fotosStorage.urlsFirmadas(
            entregados.map((objeto) => objeto.rutaFoto),
        );
        const filas = entregados.map((objeto, indice) => ({
            ...crearFilaHistorial(objeto),
            fotoUrl: urlsFotos[indice],
        }));
        this.vista.mostrarFilas(filas);
        if (entregados.length === 0) {
            this.vista.mostrarMensajeVacio(MENSAJES.SIN_OBJETOS_ENTREGADOS);
        }
    }
}