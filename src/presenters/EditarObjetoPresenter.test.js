import { EditarObjetoPresenter } from './EditarObjetoPresenter';
import { ObjetosEnMemoria } from '../services/memoria/ObjetosEnMemoria';
import { FotosEnMemoria } from '../services/memoria/FotosEnMemoria';
import { CATEGORIAS } from '../domain/catalogos';
import { MENSAJES } from '../domain/mensajes';
import { RUTAS } from '../config';

const crearObjeto = (datos) => ({
    id: 3,
    numero: 3,
    estado: 'publicado',
    fechaHallazgo: '2026-10-14',
    lugar: 'Estacionamiento',
    categoria: 'Llaves',
    color: 'Dorado',
    marca: '',
    descripcion: 'Dos llaves en un llavero de argolla',
    senas: 'Una llave dorada y una plateada',
    rutaFoto: 'ejemplos/llaves.svg',
    encontradoPor: { nombre: 'Ana Quispe', celular: '70033333' },
    ...datos,
});

const crearEscenario = (objetos = [], hoy = '2026-10-20') => {
    const vista = {
        categorias: [],
        formulario: null,
        mensajesNoEncontrado: [],
        errores: [],
        mensajesExito: [],
        mostrarCategorias(categorias) {
            this.categorias = categorias;
        },
        mostrarFormulario(datos) {
            this.formulario = datos;
        },
        mostrarNoEncontrado(mensaje) {
            this.mensajesNoEncontrado.push(mensaje);
        },
        mostrarError(mensaje) {
            this.errores.push(mensaje);
        },
        limpiarError() {
            this.errores = [];
        },
        mostrarExito(mensaje) {
            this.mensajesExito.push(mensaje);
        },
        redirigir: jest.fn(),
    };
    const objetosRepository = new ObjetosEnMemoria({ objetos });
    const fotosStorage = new FotosEnMemoria({
        urls: { 'ejemplos/llaves.svg': 'https://fotos.test/llaves.svg' },
    });
    const presenter = new EditarObjetoPresenter(vista, objetosRepository, fotosStorage, () => hoy, 0);
    return { vista, objetosRepository, fotosStorage, presenter };
};
const crearDatosEditados = (cambios = {}) => ({
    categoria: 'Ropa',
    descripcion: 'Chaqueta azul',
    fechaHallazgo: '2026-10-15',
    lugar: 'Biblioteca',
    color: 'Azul',
    marca: '',
    senas: '',
    rutaFoto: '',
    fotoContenido: '',
    encontradoPor: { nombre: 'Ana Quispe', celular: '70033333' },
    ...cambios,
});
describe('EditarObjetoPresenter - iniciar', () => {
    it('muestra las categorias del catalogo', async () => {
        const { vista, presenter } = crearEscenario([crearObjeto()]);

        await presenter.iniciar('3');

        expect(vista.categorias).toEqual(CATEGORIAS);
    });

    it('carga en el formulario los datos actuales del objeto y la url de su foto', async () => {
        const { vista, presenter } = crearEscenario([crearObjeto()]);

        await presenter.iniciar('3');

        expect(vista.formulario).toEqual({
            numero: 3,
            fechaHallazgo: '2026-10-14',
            lugar: 'Estacionamiento',
            categoria: 'Llaves',
            color: 'Dorado',
            marca: '',
            descripcion: 'Dos llaves en un llavero de argolla',
            senas: 'Una llave dorada y una plateada',
            encontradoPor: { nombre: 'Ana Quispe', celular: '70033333' },
            fotoUrl: 'https://fotos.test/llaves.svg',
        });
    });
    describe('EditarObjetoPresenter - iniciar con un aviso que no se puede editar', () => {
        it('avisa que el objeto no existe si el id no esta registrado', async () => {
            const { vista, presenter } = crearEscenario([crearObjeto()]);

            await presenter.iniciar('99');

            expect(vista.mensajesNoEncontrado).toEqual([MENSAJES.OBJETO_NO_ENCONTRADO]);
            expect(vista.formulario).toBeNull();
        });

        it('avisa que el objeto no existe si ya fue entregado', async () => {
            const { vista, presenter } = crearEscenario([crearObjeto({ estado: 'entregado' })]);

            await presenter.iniciar('3');

            expect(vista.mensajesNoEncontrado).toEqual([MENSAJES.OBJETO_NO_ENCONTRADO]);
            expect(vista.formulario).toBeNull();
        });
    });
    describe('EditarObjetoPresenter - guardar', () => {
        it('actualiza el objeto conservando su numero y muestra el mensaje de aviso actualizado', async () => {
            const { vista, objetosRepository, presenter } = crearEscenario([crearObjeto()]);
            await presenter.iniciar('3');

            await presenter.guardar(crearDatosEditados());

            expect(vista.errores).toEqual([]);
            expect(vista.mensajesExito).toEqual([MENSAJES.AVISO_ACTUALIZADO]);
            const [objeto] = await objetosRepository.listarPublicados();
            expect(objeto).toMatchObject({ id: 3, numero: 3, categoria: 'Ropa', color: 'Azul' });
        });
        it('muestra el error y no modifica el objeto si faltan la categoria o la descripcion', async () => {
            const { vista, objetosRepository, presenter } = crearEscenario([crearObjeto()]);
            await presenter.iniciar('3');

            await presenter.guardar(crearDatosEditados({ categoria: '', descripcion: '' }));

            expect(vista.errores).toEqual([MENSAJES.FALTA_CATEGORIA_DESCRIPCION]);
            expect(vista.mensajesExito).toEqual([]);
            expect((await objetosRepository.obtenerPorId(3)).categoria).toEqual('Llaves');
        });

        it('muestra el error y no modifica el objeto si la fecha de hallazgo es futura', async () => {
            const { vista, objetosRepository, presenter } = crearEscenario([crearObjeto()], '2026-10-20');
            await presenter.iniciar('3');

            await presenter.guardar(crearDatosEditados({ fechaHallazgo: '2026-10-21' }));

            expect(vista.errores).toEqual([MENSAJES.FECHA_FUTURA]);
            expect(vista.mensajesExito).toEqual([]);
            expect((await objetosRepository.obtenerPorId(3)).fechaHallazgo).toEqual('2026-10-14');
        });
        it('conserva la foto actual si no se sube una foto nueva', async () => {
            const { objetosRepository, presenter } = crearEscenario([crearObjeto()]);
            await presenter.iniciar('3');

            await presenter.guardar(crearDatosEditados({ rutaFoto: '', fotoContenido: '' }));

            expect((await objetosRepository.obtenerPorId(3)).rutaFoto).toEqual('ejemplos/llaves.svg');
        });

        it('guarda la foto nueva, reemplaza la ruta y no deja el contenido dentro del objeto', async () => {
            const { objetosRepository, fotosStorage, presenter } = crearEscenario([crearObjeto()]);
            await presenter.iniciar('3');

            await presenter.guardar(crearDatosEditados({
                rutaFoto: 'chaqueta.jpg',
                fotoContenido: 'data:image/jpeg;base64,AAA',
            }));

            const objeto = await objetosRepository.obtenerPorId(3);
            expect(await fotosStorage.urlsFirmadas([objeto.rutaFoto])).toEqual(['data:image/jpeg;base64,AAA']);
            expect(objeto).not.toHaveProperty('fotoContenido');
            expect(objeto).not.toHaveProperty('hoy');
        });

        it('rechaza una foto nueva que no es JPG ni PNG y no modifica el objeto', async () => {
            const { vista, objetosRepository, presenter } = crearEscenario([crearObjeto()]);
            await presenter.iniciar('3');

            await presenter.guardar(crearDatosEditados({ rutaFoto: 'animacion.gif', fotoContenido: 'data:image/gif;base64,AAA' }));

            expect(vista.errores).toEqual([MENSAJES.FORMATO_FOTO_INVALIDO]);
            expect((await objetosRepository.obtenerPorId(3)).rutaFoto).toEqual('ejemplos/llaves.svg');
        });

        it('no permite cambiar el numero del objeto', async () => {
            const { objetosRepository, presenter } = crearEscenario([crearObjeto()]);
            await presenter.iniciar('3');

            await presenter.guardar(crearDatosEditados({ numero: 99 }));

            expect((await objetosRepository.obtenerPorId(3)).numero).toEqual(3);
        });
        it('si se sube una foto nueva y luego se guarda sin foto, conserva la foto nueva', async () => {
            const { objetosRepository, presenter } = crearEscenario([crearObjeto()]);
            await presenter.iniciar('3');
            await presenter.guardar(crearDatosEditados({
                rutaFoto: 'chaqueta.jpg',
                fotoContenido: 'data:image/jpeg;base64,AAA',
            }));
            const { rutaFoto } = await objetosRepository.obtenerPorId(3);

            await presenter.guardar(crearDatosEditados({ lugar: 'Cafetería' }));

            expect((await objetosRepository.obtenerPorId(3)).rutaFoto).toEqual(rutaFoto);
        });
        it('redirige al panel de administración tras guardar con éxito', async () => {
            const { vista, presenter } = crearEscenario([crearObjeto()]);
            await presenter.iniciar('3');

            await presenter.guardar(crearDatosEditados());

            expect(vista.redirigir).toHaveBeenCalledWith(RUTAS.PANEL_ADMIN);
        });
        it('no redirige cuando hay errores de validación', async () => {
            const { vista, presenter } = crearEscenario([crearObjeto()]);
            await presenter.iniciar('3');

            await presenter.guardar(crearDatosEditados({ categoria: '', descripcion: '' }));

            expect(vista.redirigir).not.toHaveBeenCalled();
        });
    });
});