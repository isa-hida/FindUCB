import { HistorialEntregasPresenter } from './HistorialEntregasPresenter';
import { ObjetosEnMemoria } from '../services/memoria/ObjetosEnMemoria';

const crearEscenario = (objetos = []) => {
    const vista = {
        filas: [],
        mostrarFilas(filas) {
            this.filas = filas;
        },
    };
    const objetosRepository = new ObjetosEnMemoria({ objetos });
    const presenter = new HistorialEntregasPresenter(vista, objetosRepository);
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
});