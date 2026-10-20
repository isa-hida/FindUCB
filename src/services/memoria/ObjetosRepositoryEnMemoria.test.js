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
    });
});
