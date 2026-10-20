import { MENSAJES } from '../domain/mensajes';
import { prepararDetalle } from '../domain/detalle';
import { formatearFecha } from '../domain/fecha';

export class DetalleObjetoPresenter {
    constructor(vista, objetosRepository, fotosStorage) {
        this.vista = vista;
        this.objetosRepository = objetosRepository;
        this.fotosStorage = fotosStorage;
    }

    async cargar(id) {
        const objeto = await this.objetosRepository.obtenerPorId(id);
        if (!objeto) {
            this.vista.mostrarNoEncontrado(MENSAJES.OBJETO_NO_ENCONTRADO);
            return;
        }
        const detalle = prepararDetalle(objeto);
        const [fotoUrl] = await this.fotosStorage.urlsFirmadas([detalle.fotoPath]);
        this.vista.mostrarDetalle({
            ...detalle,
            fotoUrl,
            fechaTexto: formatearFecha(detalle.fechaHallazgo),
        });
    }
}
