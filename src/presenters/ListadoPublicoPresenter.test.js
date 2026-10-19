import { ListadoPublicoPresenter } from './ListadoPublicoPresenter';
import { ObjetosEnMemoria } from '../services/memoria/ObjetosEnMemoria';
import { MENSAJES } from '../domain/mensajes';
import { FotosEnMemoria } from '../services/memoria/FotosEnMemoria';
import { RUTAS } from '../config';
import { CATEGORIAS } from '../domain/catalogos';

const crearObjeto = (datos) => ({
    numero: 1,
    fechaHallazgo: '2026-10-01',
    estado: 'publicado',
    ...datos,
});

const crearEscenario = (objetos = [], urls = {}) => {
    const vista = {
        mensajesVacio: [],
        tarjetas: [],
        categorias: [],
        mostrarVacio(mensaje) {
            this.mensajesVacio.push(mensaje);
        },
        mostrarTarjetas(tarjetas) {
            this.tarjetas.push(...tarjetas);
        },
        mostrarCategorias(categorias) {
            this.categorias.push(...categorias);
        },
    };
    const objetosRepository = new ObjetosEnMemoria({ objetos });
    const fotosStorage = new FotosEnMemoria({ urls });
    const presenter = new ListadoPublicoPresenter(vista, objetosRepository, fotosStorage);
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
    it('cada tarjeta trae la url de su foto', async () => {
        const { vista, presenter } = crearEscenario(
            [
                crearObjeto({ id: 1, fechaHallazgo: '2026-10-01', fotoPath: 'objetos/1.jpg' }),
                crearObjeto({ id: 2, fechaHallazgo: '2026-10-15', fotoPath: 'objetos/2.jpg' }),
            ],
            {
                'objetos/1.jpg': 'https://fotos.test/1.jpg',
                'objetos/2.jpg': 'https://fotos.test/2.jpg',
            },
        );

        await presenter.cargar();

        expect(vista.tarjetas.map((tarjeta) => tarjeta.fotoUrl)).toEqual([
            'https://fotos.test/2.jpg',
            'https://fotos.test/1.jpg',
        ]);
    });

    it('cada tarjeta lleva la url de su detalle', async () => {
        const { vista, presenter } = crearEscenario([
            crearObjeto({ id: 1, fechaHallazgo: '2026-10-01' }),
            crearObjeto({ id: 2, fechaHallazgo: '2026-10-15' }),
        ]);

        await presenter.cargar();

        expect(vista.tarjetas.map((tarjeta) => tarjeta.url)).toEqual([
            `${RUTAS.DETALLE}?id=2`,
            `${RUTAS.DETALLE}?id=1`,
        ]);
    });

    it('cada tarjeta trae la fecha de hallazgo en formato DD/MM/AAAA', async () => {
        const { vista, presenter } = crearEscenario([
            crearObjeto({ id: 1, fechaHallazgo: '2026-03-05' }),
        ]);

        await presenter.cargar();

        expect(vista.tarjetas.map((tarjeta) => tarjeta.fechaTexto)).toEqual(['05/03/2026']);
    });

    it('muestra las categorias del catalogo para filtrar', async () => {
        const { vista, presenter } = crearEscenario();

        await presenter.cargar();

        expect(vista.categorias).toEqual(CATEGORIAS);
    });
});
