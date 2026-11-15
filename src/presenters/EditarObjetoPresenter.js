import { CATEGORIAS } from '../domain/catalogos';

export class EditarObjetoPresenter {
    constructor(vista, objetosRepository, fotosStorage) {
        this.vista = vista;
        this.objetosRepository = objetosRepository;
        this.fotosStorage = fotosStorage;
    }

    async iniciar(id) {
        this.vista.mostrarCategorias(CATEGORIAS);
        const objeto = await this.objetosRepository.obtenerPorId(id);
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
}