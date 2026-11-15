import { HistorialEntregasPresenter } from './HistorialEntregasPresenter';
import { ObjetosEnMemoria } from '../services/memoria/ObjetosEnMemoria';

const crearEscenario = (objetos = []) => {
    const vista = {
        filas: [],
        mensajesVacios: [],
        mostrarFilas(filas) {
            this.filas = filas;
        },
        mostrarMensajeVacio(mensaje) {
            this.mensajesVacios.push(mensaje);
        },
    };
        const fotosStorage = {
        urlsFirmadas: async (rutas) => rutas.map((ruta) => (ruta ? `url-de-${ruta}` : undefined)),
    };
    const objetosRepository = new ObjetosEnMemoria({ objetos });
    const presenter = new HistorialEntregasPresenter(vista, objetosRepository, fotosStorage);
    return { vista, presenter };
};

describe('HistorialEntregasPresenter', () => {
    it('muestra una fila por cada objeto entregado', async () => {
        const entregado = {
            id: 5,
            numero: 5,
            categoria: 'Útiles',
            estado: 'entregado',
            entrega: { nombre: 'Pedro Gutiérrez', fechaEntrega: '2026-10-17' },
        };
        const { vista, presenter } = crearEscenario([entregado, { id: 1, numero: 1, estado: 'publicado' }]);

        await presenter.cargar();

        expect(vista.filas).toEqual([{
            id: 5,
            numero: 5,
            categoria: 'Útiles',
            nombreReceptor: 'Pedro Gutiérrez',
            fechaEntrega: '2026-10-17',
        }]);
    });
    it('avisa que no hay objetos entregados si el historial esta vacio', async () => {
        const { vista, presenter } = crearEscenario([{ id: 1, numero: 1, estado: 'publicado' }]);

        await presenter.cargar();

        expect(vista.mensajesVacios).toEqual(['No hay objetos entregados']);
    });
    it('entrega a la vista la URL de la foto de cada objeto', async () => {
        const entregado = {
            id: 5,
            numero: 5,
            categoria: 'Útiles',
            estado: 'entregado',
            rutaFoto: 'ejemplos/cuaderno.svg',
            entrega: { nombre: 'Pedro Gutiérrez', fechaEntrega: '2026-10-17' },
        };
        const { vista, presenter } = crearEscenario([entregado]);

        await presenter.cargar();

        expect(vista.filas[0].fotoUrl).toBe('url-de-ejemplos/cuaderno.svg');
    });
});