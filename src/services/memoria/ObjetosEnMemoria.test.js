import { ObjetosEnMemoria } from './ObjetosEnMemoria';
const crearObjeto = (datos) => ({
    id: 1,
    numero: 1,
    estado: 'publicado',
    ...datos,
});

describe('ObjetosEnMemoria - registrar', () => {
    it('asigna un id y un numero correlativo automatico al registrar un objeto', async () => {
        const repo = new ObjetosEnMemoria({
            objetos: [
                { id: 1, numero: 1, estado: 'publicado' },
            ],
        });

        const nuevo = await repo.registrar({
            categoria: 'Llaves',
            descripcion: 'Llaves de oficina',
        });

        expect(nuevo).toMatchObject({
            id: 2,
            numero: 2,
            estado: 'publicado',
            categoria: 'Llaves',
        });
    });

    it('almacena los datos de quien encontro el objeto de forma privada para el administrador', async () => {
        const repo = new ObjetosEnMemoria();

        const registrado = await repo.registrar({
            categoria: 'Celular',
            descripcion: 'Samsung negro',
            encontradoPor: { nombre: 'Carla Rojas', celular: '70011111' },
        });

        expect(registrado.encontradoPor).toEqual({
            nombre: 'Carla Rojas',
            celular: '70011111',
        });
    });
});
// Pruebas del listado para el administrador (HU-06)
describe('ObjetosEnMemoria - listarParaAdmin', () => {
    it('devuelve los objetos publicados y los entregados', async () => {
        const publicado = crearObjeto({ id: 1, numero: 1 });
        const entregado = crearObjeto({ id: 2, numero: 2, estado: 'entregado' });
        const repo = new ObjetosEnMemoria({ objetos: [publicado, entregado] });

        const resultado = await repo.listarParaAdmin();

        expect(resultado).toEqual([publicado, entregado]);
    });
});

// Pruebas de registrar entrega (HU-06)
describe('ObjetosEnMemoria - registrarEntrega', () => {
    it('saca el objeto del listado de publicados', async () => {
        const objeto = crearObjeto({ id: 1, numero: 1 });
        const otro = crearObjeto({ id: 2, numero: 2 });
        const repo = new ObjetosEnMemoria({ objetos: [objeto, otro] });

        await repo.registrarEntrega(1, { nombre: 'Ana Perez', ci: '1234567' });
        const resultado = await repo.listarPublicados();

        expect(resultado).toEqual([otro]);
    });

    it('acepta el id como texto, tal como llega desde la URL', async () => {
        const repo = new ObjetosEnMemoria({ objetos: [crearObjeto({ id: 1 })] });

        await repo.registrarEntrega('1', { nombre: 'Ana Perez', ci: '1234567' });

        expect(await repo.listarPublicados()).toEqual([]);
    });

    it('conserva el objeto con los datos de la entrega para el administrador', async () => {
        const objeto = crearObjeto({ id: 1, numero: 1 });
        const repo = new ObjetosEnMemoria({ objetos: [objeto] });
        const entrega = {
            nombre: 'Ana Perez',
            ci: '1234567',
            celular: '70000000',
            fechaEntrega: '2026-10-20',
        };

        await repo.registrarEntrega(1, entrega);
        const resultado = await repo.listarParaAdmin();

        expect(resultado).toEqual([{ ...objeto, estado: 'entregado', entrega }]);
    });
});
