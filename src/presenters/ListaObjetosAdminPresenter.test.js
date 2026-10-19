import { ListaObjetosAdminPresenter } from './ListaObjetosAdminPresenter';
import { ObjetosRepositoryEnMemoria } from '../services/memoria/ObjetosRepositoryEnMemoria';

const crearEscenario = (objetos = []) => {
    const vista = {
        filas: [],
        mostrarFilas(filas) {
            this.filas = filas;
        },
    };
    const objetosRepository = new ObjetosRepositoryEnMemoria({ objetos });
    const presenter = new ListaObjetosAdminPresenter(vista, objetosRepository);
    return { vista, presenter };
};

describe('ListaObjetosAdminPresenter', () => {
    it('muestra la fila de un objeto publicado', async () => {
        const { vista, presenter } = crearEscenario([
            { id: 1, numero: 7, estado: 'publicado' },
        ]);

        await presenter.cargar();

        expect(vista.filas.map((fila) => fila.numero)).toEqual([7]);
    });
  
    it('no muestra un objeto que ya fue entregado', async () => {
        const { vista, presenter } = crearEscenario([
            { id: 2, numero: 8, estado: 'entregado' },
        ]);

        await presenter.cargar();

        expect(vista.filas).toEqual([]);
    });

    
});