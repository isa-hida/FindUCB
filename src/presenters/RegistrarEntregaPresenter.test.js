import { RegistrarEntregaPresenter } from './RegistrarEntregaPresenter';
import { ObjetosRepositoryEnMemoria } from '../services/memoria/ObjetosRepositoryEnMemoria';
import { MENSAJES } from '../domain/mensajes';

const crearEscenario = (objetos = []) => {
    const vista = {
        fechas: [],
        errores: [],
        mostrarFechaEntrega(fecha) {
            this.fechas.push(fecha);
        },
        mostrarError(mensaje) {
            this.errores.push(mensaje);
        },
    };
    const objetosRepository = new ObjetosRepositoryEnMemoria({ objetos });
    const presenter = new RegistrarEntregaPresenter(vista, objetosRepository);
    return { vista, presenter };
};

describe('RegistrarEntregaPresenter', () => {
    it('muestra la fecha de hoy como fecha de entrega por defecto', async () => {
        const { vista, presenter } = crearEscenario([{ id: 1, estado: 'publicado' }]);
        await presenter.cargar(1, new Date(2026, 9, 20));
        expect(vista.fechas).toEqual(['2026-10-20']);
    });

    it('avisa que el objeto no fue encontrado si el id no existe', async () => {
        const { vista, presenter } = crearEscenario([{ id: 1, estado: 'publicado' }]);

        await presenter.cargar(99);

        expect(vista.errores).toEqual([MENSAJES.OBJETO_NO_ENCONTRADO]);
        expect(vista.fechas).toEqual([]);
    });
});