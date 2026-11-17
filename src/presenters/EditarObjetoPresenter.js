import { CATEGORIAS } from '../domain/catalogos';
import { MENSAJES } from '../domain/mensajes';
import { validarObjetoHallado } from '../domain/objetoHallado';
import { aFechaIso } from '../domain/fecha';
import { RUTAS } from '../config';

export class EditarObjetoPresenter {
    constructor(vista, objetosRepository, fotosStorage, obtenerHoy = () => aFechaIso(new Date()), retardo = 1500) {
        this.vista = vista;
        this.objetosRepository = objetosRepository;
        this.fotosStorage = fotosStorage;
        this.obtenerHoy = obtenerHoy;
        this.retardo = retardo;
    }

    async iniciar(id) {
        this.id = id;
        this.vista.mostrarCategorias(CATEGORIAS);
        const objeto = await this.objetosRepository.obtenerPorId(id);
        if (!objeto) {
            this.vista.mostrarNoEncontrado(MENSAJES.OBJETO_NO_ENCONTRADO);
            return;
        }
        this.fotoActual = objeto.rutaFoto;
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

        const { fotoContenido, ...datosObjeto } = datos;
        const errores = validarObjetoHallado({ ...datosObjeto, hoy: this.obtenerHoy(), fotoActual: this.fotoActual });
        if (errores.length > 0) {
            this.vista.mostrarError(errores[0]);
            return;
        }

        const rutaFoto = fotoContenido
            ? await this.fotosStorage.guardar(datosObjeto.rutaFoto, fotoContenido)
            : this.fotoActual;
        await this.objetosRepository.actualizar(this.id, { ...datosObjeto, rutaFoto });
        this.fotoActual = rutaFoto;
        this.vista.mostrarExito(MENSAJES.AVISO_ACTUALIZADO);
        await this._redirigirAlPanel();
    }

    async _redirigirAlPanel() {
        await new Promise((resolver) => setTimeout(resolver, this.retardo));
        this.vista.redirigir(RUTAS.PANEL_ADMIN);
    }
}