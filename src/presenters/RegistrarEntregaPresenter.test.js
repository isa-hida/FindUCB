import { RegistrarEntregaPresenter } from './RegistrarEntregaPresenter';
import { ObjetosRepositoryEnMemoria } from '../services/memoria/ObjetosRepositoryEnMemoria';
import { MENSAJES } from '../domain/mensajes';

const crearEscenario = (objetos = []) => {
    const vista = {
        fechas: [],
        errores: [],
        exitos: [],
        mostrarFechaEntrega(fecha) {
            this.fechas.push(fecha);
        },
        mostrarError(mensaje) {
            this.errores.push(mensaje);
        },
        limpiarError() {
            this.errores = [];
        },
        mostrarExito(mensaje) {
            this.exitos.push(mensaje);
        },
    };
    const objetosRepository = new ObjetosRepositoryEnMemoria({ objetos });
    const presenter = new RegistrarEntregaPresenter(vista, objetosRepository);
    return { vista, objetosRepository,presenter };
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
    it('avisa que el objeto no fue encontrado si ya fue entregado', async () => {
        const { vista, presenter } = crearEscenario([{ id: 1, estado: 'entregado' }]);

        await presenter.cargar(1);

        expect(vista.errores).toEqual([MENSAJES.OBJETO_NO_ENCONTRADO]);
        expect(vista.fechas).toEqual([]);
    });

    it('muestra el aviso si falta el nombre o la C.I.', async () => {
        const { vista, presenter } = crearEscenario([{ id: 1, estado: 'publicado' }]);

        await presenter.confirmar({ nombre: '', ci: '1234567' });

        expect(vista.errores).toEqual([MENSAJES.FALTA_NOMBRE_CI]);
    });

    it('limpia el aviso anterior en cada intento', async () => {
        const { vista, presenter } = crearEscenario([{ id: 1, estado: 'publicado' }]);

        await presenter.confirmar({ nombre: '', ci: '' });
        await presenter.confirmar({ nombre: 'Ana Perez', ci: '1234567' });

        expect(vista.errores).toEqual([]);
    });

    it('registra la entrega y saca el objeto de los publicados', async () => {
        const { objetosRepository, presenter } = crearEscenario([{ id: 1, estado: 'publicado' }]);
        await presenter.cargar(1);

        await presenter.confirmar({ nombre: 'Ana Perez', ci: '1234567' });

        expect(await objetosRepository.listarPublicados()).toEqual([]);
    });
    it('no registra la entrega si falta el nombre o la C.I.', async () => {
        const objeto = { id: 1, estado: 'publicado' };
        const { objetosRepository, presenter } = crearEscenario([objeto]);
        await presenter.cargar(1);

        await presenter.confirmar({ nombre: '', ci: '' });

        expect(await objetosRepository.listarPublicados()).toEqual([objeto]);
    });
    it('avisa que la entrega fue registrada', async () => {
        const { vista, presenter } = crearEscenario([{ id: 1, estado: 'publicado' }]);
        await presenter.cargar(1);

        await presenter.confirmar({ nombre: 'Ana Perez', ci: '1234567' });

        expect(vista.exitos).toEqual([MENSAJES.ENTREGA_REGISTRADA]);
    });
});