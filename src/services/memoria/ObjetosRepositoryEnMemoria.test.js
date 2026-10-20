import { ObjetosRepositoryEnMemoria } from './ObjetosRepositoryEnMemoria';

const crearObjeto = (datos) => ({
    id: 1,
    numero: 1,
    fechaHallazgo: '2026-10-01',
    lugar: 'Biblioteca',
    categoria: 'Billetera',
    color: 'Negro',
    marca: '',
    descripcion: 'Billetera de cuero',
    senas: '',
    fotoPath: 'fotos/1.jpg',
    estado: 'publicado',
    ...datos,
});
const crearAlmacen = () => ({
    datos: {},
    getItem(clave) {
        return this.datos[clave] === undefined ? null : this.datos[clave];
    },
    setItem(clave, valor) {
        this.datos[clave] = valor;
    },
});

describe('ObjetosRepositoryEnMemoria', () => {
    describe('listarPublicados', () => {
        it('devuelve solo los objetos publicados', async () => {
            const publicado = crearObjeto({ id: 1, numero: 1 });
            const entregado = crearObjeto({ id: 2, numero: 2, estado: 'entregado' });
            const repositorio = new ObjetosRepositoryEnMemoria({ objetos: [publicado, entregado] });

            const resultado = await repositorio.listarPublicados();

            expect(resultado).toEqual([publicado]);
        });
    });
    describe('obtenerPorId', () => {
        it('devuelve el objeto si existe y esta publicado', async () => {
            const publicado = crearObjeto({ id: 1, numero: 1 });
            const otro = crearObjeto({ id: 2, numero: 2 });
            const repositorio = new ObjetosRepositoryEnMemoria({ objetos: [publicado, otro] });

            const resultado = await repositorio.obtenerPorId(1);

            expect(resultado).toEqual(publicado);
        });
        it('devuelve null si el id no existe', async () => {
            const repositorio = new ObjetosRepositoryEnMemoria({ objetos: [crearObjeto({ id: 1 })] });

            const resultado = await repositorio.obtenerPorId(99);

            expect(resultado).toBeNull();
        });

        it('devuelve null si el objeto ya fue entregado', async () => {
            const entregado = crearObjeto({ id: 1, estado: 'entregado' });
            const repositorio = new ObjetosRepositoryEnMemoria({ objetos: [entregado] });

            const resultado = await repositorio.obtenerPorId(1);

            expect(resultado).toBeNull();
        });
    });

    describe('registrarEntrega', () => {
        it('saca el objeto del listado de publicados', async () => {
            const objeto = crearObjeto({ id: 1, numero: 1 });
            const otro = crearObjeto({ id: 2, numero: 2 });
            const repositorio = new ObjetosRepositoryEnMemoria({ objetos: [objeto, otro] });

            await repositorio.registrarEntrega(1, { nombre: 'Ana Perez', ci: '1234567' });
            const resultado = await repositorio.listarPublicados();

            expect(resultado).toEqual([otro]);
        });

        it('conserva el objeto con los datos de la entrega para el administrador', async () => {
            const objeto = crearObjeto({ id: 1, numero: 1 });
            const repositorio = new ObjetosRepositoryEnMemoria({ objetos: [objeto] });
            const entrega = {
                nombre: 'Ana Perez',
                ci: '1234567',
                celular: '70000000',
                fechaEntrega: '2026-10-20',
            };

            await repositorio.registrarEntrega(1, entrega);
            const resultado = await repositorio.listarParaAdmin();

            expect(resultado).toEqual([{ ...objeto, estado: 'entregado', entrega }]);
        });
        it('recuerda la entrega en otro repositorio que use el mismo almacen', async () => {
            const almacen = crearAlmacen();
            const objeto = crearObjeto({ id: 1, numero: 1 });
            const primero = new ObjetosRepositoryEnMemoria({ objetos: [objeto], almacen });

            await primero.registrarEntrega(1, { nombre: 'Ana Perez', ci: '1234567' });
            const segundo = new ObjetosRepositoryEnMemoria({ objetos: [objeto], almacen });

            expect(await segundo.listarPublicados()).toEqual([]);
        });
    });
});
