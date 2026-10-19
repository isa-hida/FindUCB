import { DetalleObjetoPresenter } from './DetalleObjetoPresenter';
import { ObjetosEnMemoria } from '../services/memoria/ObjetosEnMemoria';
import { MENSAJES } from '../domain/mensajes';

const crearEscenario = (objetos = []) => {
    const vista = {
        noEncontrados: [],
        mostrarNoEncontrado(mensaje) {
            this.noEncontrados.push(mensaje);
        },
    };
    const objetosRepository = new ObjetosEnMemoria({ objetos });
    const presenter = new DetalleObjetoPresenter(vista, objetosRepository);
    return { vista, presenter };
};

describe('DetalleObjetoPresenter', () => {
    it('muestra objeto no encontrado si el id no existe', async () => {
        const { vista, presenter } = crearEscenario();

        await presenter.cargar('99');

        expect(vista.noEncontrados).toEqual([MENSAJES.OBJETO_NO_ENCONTRADO]);
    });
});
