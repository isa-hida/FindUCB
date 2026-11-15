import { EditarObjetoPresenter } from './EditarObjetoPresenter';
import { ObjetosEnMemoria } from '../services/memoria/ObjetosEnMemoria';
import { FotosEnMemoria } from '../services/memoria/FotosEnMemoria';
import { CATEGORIAS } from '../domain/catalogos';
import { MENSAJES } from '../domain/mensajes';

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

const crearEscenario = (objetos = []) => {
    const vista = {
        categorias: [],
        formulario: null,
        mensajesNoEncontrado: [],
        mostrarCategorias(categorias) {
            this.categorias = categorias;
        },
        mostrarFormulario(datos) {
            this.formulario = datos;
        },
        mostrarNoEncontrado(mensaje) {
            this.mensajesNoEncontrado.push(mensaje);
        },
    };
    const objetosRepository = new ObjetosEnMemoria({ objetos });
    const fotosStorage = new FotosEnMemoria({
        urls: { 'ejemplos/llaves.svg': 'https://fotos.test/llaves.svg' },
    });
    const presenter = new EditarObjetoPresenter(vista, objetosRepository, fotosStorage);
    return { vista, objetosRepository, fotosStorage, presenter };
};

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
});