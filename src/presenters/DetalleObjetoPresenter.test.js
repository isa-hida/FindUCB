import { DetalleObjetoPresenter } from './DetalleObjetoPresenter';
import { ObjetosEnMemoria } from '../services/memoria/ObjetosEnMemoria';
import { MENSAJES } from '../domain/mensajes';

const crearObjeto = (datos) => ({
    id: 4,
    numero: 4,
    fechaHallazgo: '2026-10-14',
    lugar: 'Coliseo',
    categoria: 'Botellas y termos',
    color: 'Rojo',
    marca: 'Stanley',
    descripcion: 'Termo de acero',
    senas: 'Tapa negra con un rayon',
    fotoPath: 'objetos/4.jpg',
    estado: 'publicado',
    encontradoPor: { nombre: 'Jorge Mamani', celular: '70044444' },
    ...datos,
});

const crearEscenario = (objetos = []) => {
    const vista = {
        noEncontrados: [],
        detalles: [],
        mostrarNoEncontrado(mensaje) {
            this.noEncontrados.push(mensaje);
        },
        mostrarDetalle(detalle) {
            this.detalles.push(detalle);
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

    it('muestra numero, categoria, color, marca, descripcion, senas y lugar del objeto', async () => {
        const { vista, presenter } = crearEscenario([crearObjeto()]);

        await presenter.cargar('4');

        expect(vista.detalles[0]).toMatchObject({
            numero: 4,
            categoria: 'Botellas y termos',
            color: 'Rojo',
            marca: 'Stanley',
            descripcion: 'Termo de acero',
            senas: 'Tapa negra con un rayon',
            lugar: 'Coliseo',
        });
        expect(vista.noEncontrados).toEqual([]);
    });

    it('muestra objeto no encontrado si el objeto ya fue entregado', async () => {
        const { vista, presenter } = crearEscenario([crearObjeto({ estado: 'entregado' })]);

        await presenter.cargar('4');

        expect(vista.noEncontrados).toEqual([MENSAJES.OBJETO_NO_ENCONTRADO]);
        expect(vista.detalles).toEqual([]);
    });

    it('muestra la fecha de hallazgo en formato DD/MM/AAAA', async () => {
        const { vista, presenter } = crearEscenario([crearObjeto({ fechaHallazgo: '2026-03-05' })]);

        await presenter.cargar('4');

        expect(vista.detalles[0].fechaTexto).toEqual('05/03/2026');
    });
});
