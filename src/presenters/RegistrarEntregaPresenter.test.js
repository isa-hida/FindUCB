import { RegistrarEntregaPresenter } from './RegistrarEntregaPresenter';

const crearEscenario = () => {
    const vista = {
        fechas: [],
        mostrarFechaEntrega(fecha) {
            this.fechas.push(fecha);
        },
    };
    const presenter = new RegistrarEntregaPresenter(vista);
    return { vista, presenter };
};

describe('RegistrarEntregaPresenter', () => {
    it('muestra la fecha de hoy como fecha de entrega por defecto', () => {
        const { vista, presenter } = crearEscenario();

        presenter.cargar(1, new Date(2026, 9, 20));

        expect(vista.fechas).toEqual(['2026-10-20']);
    });
});