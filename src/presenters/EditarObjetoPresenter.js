import { CATEGORIAS } from '../domain/catalogos';
import { MENSAJES } from '../domain/mensajes';

export class EditarObjetoPresenter {
    constructor(vista, objetosRepository, fotosStorage) {
        this.vista = vista;
        this.objetosRepository = objetosRepository;
        this.fotosStorage = fotosStorage;
    }

    async iniciar(id) {
        this.id = id;
        this.vista.mostrarCategorias(CATEGORIAS);
        const objeto = await this.objetosRepository.obtenerPorId(id);
        if (!objeto) {
            this.vista.mostrarNoEncontrado(MENSAJES.OBJETO_NO_ENCONTRADO);
            return;
        }
        const [fotoUrl] = await this.fotosStorage.urlsFirmadas([objeto.rutaFoto]);
        this.vista.mostrarFormulario({
            numero: objeto.numero,
            fechaHallazgo: objeto.fechaHallazgo,
            lugar: objeto.lugar,
            categoria: objeto.categoria,
            color: objeto.color,
            marca: objeto.marca,
            descripcion: objeto.descripcion,
            senas: objeto.senas,
            encontradoPor: objeto.encontradoPor,
            fotoUrl,
        });
    }


    async guardar(datos) {
        this.vista.limpiarError();
        await this.objetosRepository.actualizar(this.id, datos);
        this.vista.mostrarExito(MENSAJES.AVISO_ACTUALIZADO);
    }
}