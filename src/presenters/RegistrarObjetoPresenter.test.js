import { RegistrarObjetoPresenter } from './RegistrarObjetoPresenter';
import { ObjetosEnMemoria } from '../services/memoria/ObjetosEnMemoria';
import { MENSAJES } from '../domain/mensajes';
import { CATEGORIAS } from '../domain/catalogos';
import { prepararListado } from '../domain/listado';
import { FotosEnMemoria } from '../services/memoria/FotosEnMemoria';

const crearDatosValidos = (cambios = {}) => ({
    categoria: 'Llaves',
    descripcion: 'Llaves de oficina',
    fechaHallazgo: '2026-10-18',
    lugar: 'Biblioteca',
    color: 'Dorado',
    rutaFoto: '/fotos/llaves.jpg',
    encontradoPor: { nombre: 'Juan Perez', celular: '70000000' },
    ...cambios,
});

const crearEscenario = (objetos = [], hoy = '2026-10-20') => {
    const vista = {
        errores: [],
        mensajesExito: [],
        categorias: [],
        mostrarError(mensaje) {
            this.errores.push(mensaje);
        },
        limpiarError() {
            this.errores = [];
        },
        mostrarExito(mensaje) {
            this.mensajesExito.push(mensaje);
        },
        mostrarCategorias(categorias) {
            this.categorias = categorias;
        },
    };
    const objetosRepository = new ObjetosEnMemoria({ objetos });
    const fotosStorage = new FotosEnMemoria();
    const presenter = new RegistrarObjetoPresenter(vista, objetosRepository, fotosStorage, () => hoy);
    return { vista, objetosRepository, fotosStorage, presenter };
};

describe('RegistrarObjetoPresenter', () => {
    it('muestra error si falta la categoria o la descripcion', async () => {
        const { vista, presenter } = crearEscenario();

        await presenter.registrar({ categoria: '', descripcion: '' });

        expect(vista.errores).toEqual([MENSAJES.FALTA_CATEGORIA_DESCRIPCION]);
        expect(vista.mensajesExito).toEqual([]);
    });

    it('muestra error si la fecha de hallazgo es futura', async () => {
        const { vista, presenter } = crearEscenario([], '2026-10-20');

        await presenter.registrar(crearDatosValidos({ fechaHallazgo: '2026-10-21' }));

        expect(vista.errores).toEqual([MENSAJES.FECHA_FUTURA]);
        expect(vista.mensajesExito).toEqual([]);
    });

    it('registra el objeto exitosamente y muestra el mensaje de aviso publicado', async () => {
        const { vista, objetosRepository, presenter } = crearEscenario();

        await presenter.registrar(crearDatosValidos());

        expect(vista.errores).toEqual([]);
        expect(vista.mensajesExito).toEqual([MENSAJES.AVISO_PUBLICADO]);
        const listado = await objetosRepository.listarPublicados();
        expect(listado.length).toEqual(1);
        expect(listado[0].categoria).toEqual('Llaves');
    });

    it('muestra las categorias del catalogo al iniciar', () => {
        const { vista, presenter } = crearEscenario();

        presenter.iniciar();

        expect(vista.categorias).toEqual(CATEGORIAS);
    });
    it('el objeto registrado aparece en el listado publico sin los datos de quien lo encontro', async () => {
        const { objetosRepository, presenter } = crearEscenario();

        await presenter.registrar(crearDatosValidos());

        const tarjetas = prepararListado(await objetosRepository.listarPublicados());
        expect(tarjetas).toEqual([
            { id: 1, categoria: 'Llaves', fechaHallazgo: '2026-10-18', rutaFoto: '/fotos/llaves.jpg' },
        ]);
    });
    it('guarda la foto y registra el objeto con la ruta devuelta, sin el contenido', async () => {
        const { objetosRepository, fotosStorage, presenter } = crearEscenario();

        await presenter.registrar(crearDatosValidos({
            rutaFoto: 'llaves.jpg',
            fotoContenido: 'data:image/jpeg;base64,AAA',
        }));

        const [objeto] = await objetosRepository.listarPublicados();
        expect(await fotosStorage.urlsFirmadas([objeto.rutaFoto])).toEqual(['data:image/jpeg;base64,AAA']);
        expect(objeto).not.toHaveProperty('fotoContenido');
    });
});