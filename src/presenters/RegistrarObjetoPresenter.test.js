import { RegistrarObjetoPresenter } from './RegistrarObjetoPresenter';
import { ObjetosEnMemoria } from '../services/memoria/ObjetosEnMemoria';
import { MENSAJES } from '../domain/mensajes';

const crearEscenario = (objetos = []) => {
    const vista = {
        errores: [],
        mensajesExito: [],
        mostrarError(mensaje) {
            this.errores.push(mensaje);
        },
        limpiarError() {
            this.errores = [];
        },
        mostrarExito(mensaje) {
            this.mensajesExito.push(mensaje);
        },
    };
    const objetosRepository = new ObjetosEnMemoria({ objetos });
    const presenter = new RegistrarObjetoPresenter(vista, objetosRepository);
    return { vista, objetosRepository, presenter };
};

describe('RegistrarObjetoPresenter', () => {
    it('muestra error si falta la categoria o la descripcion', async () => {
        const { vista, presenter } = crearEscenario();

        await presenter.registrar({ categoria: '', descripcion: '' });

        expect(vista.errores).toEqual([MENSAJES.FALTA_CATEGORIA_DESCRIPCION]);
        expect(vista.mensajesExito).toEqual([]);
    });

    it('muestra error si la fecha de hallazgo es futura', async () => {
        const { vista, presenter } = crearEscenario();

        await presenter.registrar({
            categoria: 'Llaves',
            descripcion: 'Llaves de oficina',
            fechaHallazgo: '2026-10-21',
            hoy: '2026-10-20',
        });

        expect(vista.errores).toEqual([MENSAJES.FECHA_FUTURA]);
        expect(vista.mensajesExito).toEqual([]);
    });

    it('registra el objeto exitosamente y muestra el mensaje de aviso publicado', async () => {
        const { vista, objetosRepository, presenter } = crearEscenario();

        await presenter.registrar({
            categoria: 'Llaves',
            descripcion: 'Llaves de oficina',
            fechaHallazgo: '2026-10-18',
            lugar: 'Biblioteca',
            color: 'Dorado',
            encontradoPor: { nombre: 'Juan Perez', celular: '70000000' },
        });

        expect(vista.errores).toEqual([]);
        expect(vista.mensajesExito).toEqual([MENSAJES.AVISO_PUBLICADO]);
        const listado = await objetosRepository.listarPublicados();
        expect(listado.length).toEqual(1);
        expect(listado[0].categoria).toEqual('Llaves');
    });
});