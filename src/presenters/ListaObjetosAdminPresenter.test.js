import { ListaObjetosAdminPresenter } from './ListaObjetosAdminPresenter';
import { ObjetosRepositoryEnMemoria } from '../services/memoria/ObjetosRepositoryEnMemoria';
import { FotosStorageEnMemoria } from '../services/memoria/FotosStorageEnMemoria';
import { MENSAJES } from '../domain/mensajes';
import { RUTAS } from '../config';

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
    const fotosStorage = new FotosStorageEnMemoria();
    const presenter = new ListaObjetosAdminPresenter(vista, objetosRepository, fotosStorage);
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
    
    it('cada fila trae el enlace para registrar la entrega de su objeto', async () => {
        const { vista, presenter } = crearEscenario([
            { id: 3, numero: 7, estado: 'publicado' },
        ]);

        await presenter.cargar();

        expect(vista.filas.map((fila) => fila.urlEntrega)).toEqual([
            `${RUTAS.REGISTRAR_ENTREGA}?id=3`,
        ]);
    });

    it('cada fila trae la url de la foto de su objeto', async () => {
        const { vista, presenter } = crearEscenario([
            { id: 1, numero: 7, estado: 'publicado', fotoPath: 'fotos/1.jpg' },
        ]);

        await presenter.cargar();

        expect(vista.filas.map((fila) => fila.fotoUrl)).toEqual(['memoria/fotos/1.jpg']);
    });
});