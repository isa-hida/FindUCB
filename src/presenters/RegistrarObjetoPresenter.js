import { MENSAJES } from '../domain/mensajes';
import { validarObjetoHallado } from '../domain/objetoHallado';
import { aFechaIso } from '../domain/fecha';
import { CATEGORIAS } from '../domain/catalogos';
import { RUTAS } from '../config';

export class RegistrarObjetoPresenter {
    constructor(vista, objetosRepository, fotosStorage, obtenerHoy = () => aFechaIso(new Date()), retardo = 1500) {
        this.vista = vista;
        this.objetosRepository = objetosRepository;
        this.fotosStorage = fotosStorage;
        this.obtenerHoy = obtenerHoy;
        this.retardo = retardo;
    }
    async registrar(datos) {
        this.vista.limpiarError();

        const { fotoContenido, ...datosObjeto } = datos;
        const errores = validarObjetoHallado({ ...datosObjeto, hoy: this.obtenerHoy() });
        if (errores.length > 0) {
            this.vista.mostrarError(errores[0]);
            return;
        }

        const rutaFoto = fotoContenido
            ? await this.fotosStorage.guardar(datosObjeto.rutaFoto, fotoContenido)
            : datosObjeto.rutaFoto;
        await this.objetosRepository.registrar({ ...datosObjeto, rutaFoto });
        this.vista.mostrarExito(MENSAJES.AVISO_PUBLICADO);
        await this._redirigirAlPanel();
    }
    async _redirigirAlPanel() {
        await new Promise((resolver) => setTimeout(resolver, this.retardo));
        this.vista.redirigir(RUTAS.PANEL_ADMIN);
    }
    iniciar() {
        this.vista.mostrarCategorias(CATEGORIAS);
    }
}