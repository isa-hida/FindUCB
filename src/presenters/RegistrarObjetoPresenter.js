import { MENSAJES } from '../domain/mensajes';
import { validarObjetoHallado } from '../domain/objetoHallado';
import { aFechaIso } from '../domain/fecha';
import { CATEGORIAS } from '../domain/catalogos';

export class RegistrarObjetoPresenter {
    constructor(vista, objetosRepository, obtenerHoy = () => aFechaIso(new Date())) {
        this.vista = vista;
        this.objetosRepository = objetosRepository;
        this.obtenerHoy = obtenerHoy;
    }
    async registrar(datosObjeto) {
        this.vista.limpiarError();

        const errores = validarObjetoHallado({ ...datosObjeto, hoy: this.obtenerHoy() });
        if (errores.length > 0) {
            this.vista.mostrarError(errores[0]);
            return;
        }

        await this.objetosRepository.registrar(datosObjeto);
        this.vista.mostrarExito(MENSAJES.AVISO_PUBLICADO);
    }
    iniciar() {
        this.vista.mostrarCategorias(CATEGORIAS);
    }
}