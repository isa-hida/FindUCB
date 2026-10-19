import { ListadoPublicoPresenter } from './ListadoPublicoPresenter';
import { ObjetosEnMemoria } from '../services/memoria/ObjetosEnMemoria';
import { MENSAJES } from '../domain/mensajes';

const crearEscenario = (objetos = []) => {
    const vista = {
        mensajesVacio: [],
        mostrarVacio(mensaje) {
            this.mensajesVacio.push(mensaje);
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
});
