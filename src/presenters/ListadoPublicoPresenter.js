import { MENSAJES } from '../domain/mensajes';
import { prepararListado, filtrarListado, validarFiltros } from '../domain/listado';
import { formatearFecha } from '../domain/fecha';
import { CATEGORIAS } from '../domain/catalogos';
import { RUTAS } from '../config';

export class ListadoPublicoPresenter {
    constructor(vista, objetosRepository, fotosStorage) {
        this.vista = vista;
        this.objetosRepository = objetosRepository;
        this.fotosStorage = fotosStorage;
        this.tarjetas = [];
    }

    async cargar() {
        this.vista.mostrarCategorias(CATEGORIAS);
        const objetos = await this.objetosRepository.listarPublicados();
        const tarjetas = prepararListado(objetos);
        if (tarjetas.length === 0) {
            this.vista.mostrarVacio(MENSAJES.SIN_OBJETOS_HALLADOS);
            return;
        }
        const urls = await this.fotosStorage.urlsFirmadas(tarjetas.map((tarjeta) => tarjeta.fotoPath));
        this.tarjetas = tarjetas.map((tarjeta, indice) => ({
            ...tarjeta,
            fotoUrl: urls[indice],
            url: `${RUTAS.DETALLE}?id=${tarjeta.id}`,
            fechaTexto: formatearFecha(tarjeta.fechaHallazgo),
        }));
        this.vista.mostrarTarjetas(this.tarjetas);
    }

    filtrar(filtros) {
        this.vista.limpiarError();
        const errores = validarFiltros(filtros);
        if (errores.length > 0) {
            this.vista.mostrarError(errores[0]);
            return;
        }
        const filtradas = filtrarListado(this.tarjetas, filtros);
        if (filtradas.length === 0) {
            this.vista.mostrarVacio(MENSAJES.SIN_COINCIDENCIAS);
            return;
        }
        this.vista.mostrarTarjetas(filtradas);
    }
}
