import { ListaObjetosAdminPresenter } from './ListaObjetosAdminPresenter';
import { ObjetosRepositoryEnMemoria } from '../services/memoria/ObjetosRepositoryEnMemoria';
import { MENSAJES } from '../domain/mensajes';

const crearEscenario = (objetos = []) => {
    const vista = {
        filas: [],
        mensajes: [],
        mostrarFilas(filas) {
            this.filas = filas;
        },
        mostrarMensajeVacio(mensaje) {
            this.mensajes.push(mensaje);
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

    it('avisa que no hay objetos publicados si la lista esta vacia', async () => {
        const { vista, presenter } = crearEscenario([]);

        await presenter.cargar();

        expect(vista.mensajes).toEqual([MENSAJES.SIN_OBJETOS_PUBLICADOS]);
    });
    
});