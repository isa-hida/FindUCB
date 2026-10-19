import { ListadoPublicoPresenter } from './ListadoPublicoPresenter';
import { ObjetosEnMemoria } from '../services/memoria/ObjetosEnMemoria';
import { MENSAJES } from '../domain/mensajes';

const crearObjeto = (datos) => ({
    numero: 1,
    fechaHallazgo: '2026-10-01',
    estado: 'publicado',
    ...datos,
});

const crearEscenario = (objetos = []) => {
    const vista = {
        mensajesVacio: [],
        tarjetas: [],
        mostrarVacio(mensaje) {
            this.mensajesVacio.push(mensaje);
        },
        mostrarTarjetas(tarjetas) {
            this.tarjetas.push(...tarjetas);
        },
    };
    const objetosRepository = new ObjetosEnMemoria({ objetos });
    const presenter = new ListadoPublicoPresenter(vista, objetosRepository);
    return { vista, presenter };
};

describe('ListadoPublicoPresenter', () => {
    it('muestra que no hay objetos hallados si no hay objetos publicados', async () => {
        const { vista, presenter } = crearEscenario();

        await presenter.cargar();

        expect(vista.mensajesVacio).toEqual([MENSAJES.SIN_OBJETOS_HALLADOS]);
    });

    it('muestra las tarjetas de la mas reciente a la mas antigua sin las entregadas', async () => {
        const { vista, presenter } = crearEscenario([
            crearObjeto({ id: 1, fechaHallazgo: '2026-10-01' }),
            crearObjeto({ id: 2, fechaHallazgo: '2026-10-15' }),
            crearObjeto({ id: 3, fechaHallazgo: '2026-10-20', estado: 'entregado' }),
        ]);

        await presenter.cargar();

        expect(vista.tarjetas.map((tarjeta) => tarjeta.id)).toEqual([2, 1]);
        expect(vista.mensajesVacio).toEqual([]);
    });
});
