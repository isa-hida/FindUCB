import { ObjetosEnMemoria } from './ObjetosEnMemoria';
import { crearAlmacenFalso } from './crearAlmacenFalso';

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

describe('ObjetosEnMemoria - listarPublicados y obtenerPorId', () => {
    it('listarPublicados devuelve solo los objetos publicados', async () => {
        const publicado = crearObjeto({ id: 1, numero: 1 });
        const entregado = crearObjeto({ id: 2, numero: 2, estado: 'entregado' });
        const repo = new ObjetosEnMemoria({ objetos: [publicado, entregado] });

        expect(await repo.listarPublicados()).toEqual([publicado]);
    });

    it('obtenerPorId devuelve el objeto si existe y esta publicado', async () => {
        const publicado = crearObjeto({ id: 1, numero: 1 });
        const repo = new ObjetosEnMemoria({ objetos: [publicado, crearObjeto({ id: 2, numero: 2 })] });

        expect(await repo.obtenerPorId(1)).toEqual(publicado);
    });

    it('obtenerPorId acepta el id como texto, tal como llega desde la URL', async () => {
        const publicado = crearObjeto({ id: 1, numero: 1 });
        const repo = new ObjetosEnMemoria({ objetos: [publicado] });

        expect(await repo.obtenerPorId('1')).toEqual(publicado);
    });

    it('obtenerPorId devuelve null si el id no existe', async () => {
        const repo = new ObjetosEnMemoria({ objetos: [crearObjeto({ id: 1 })] });

        expect(await repo.obtenerPorId(99)).toBeNull();
    });

    it('obtenerPorId devuelve null si el objeto ya fue entregado', async () => {
        const repo = new ObjetosEnMemoria({ objetos: [crearObjeto({ id: 1, estado: 'entregado' })] });

        expect(await repo.obtenerPorId(1)).toBeNull();
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
describe('ObjetosEnMemoria - actualizar', () => {
    it('cambia los datos del objeto y conserva su id, numero y estado', async () => {
        const repo = new ObjetosEnMemoria({
            objetos: [crearObjeto({ id: 3, numero: 3, categoria: 'Llaves', color: 'Dorado' })],
        });

        await repo.actualizar(3, { categoria: 'Ropa', color: 'Azul', id: 99, numero: 99, estado: 'entregado' });

        const [objeto] = await repo.listarParaAdmin();
        expect(objeto).toMatchObject({ id: 3, numero: 3, estado: 'publicado', categoria: 'Ropa', color: 'Azul' });
    });

    it('acepta el id como texto y no modifica los otros objetos', async () => {
        const otro = crearObjeto({ id: 2, numero: 2, categoria: 'Llaves' });
        const repo = new ObjetosEnMemoria({ objetos: [otro, crearObjeto({ id: 3, numero: 3, categoria: 'Ropa' })] });

        await repo.actualizar('3', { categoria: 'Útiles' });

        expect((await repo.obtenerPorId(3)).categoria).toEqual('Útiles');
        expect(await repo.obtenerPorId(2)).toEqual(otro);
    });
});
describe('ObjetosEnMemoria - persistencia en almacen', () => {
    it('recuerda un objeto registrado en otro repositorio que use el mismo almacen', async () => {
        const almacen = crearAlmacenFalso();
        const primero = new ObjetosEnMemoria({ almacen });

        await primero.registrar({ categoria: 'Llaves', descripcion: 'Llaves de oficina' });
        const segundo = new ObjetosEnMemoria({ almacen });

        const publicados = await segundo.listarPublicados();
        expect(publicados).toHaveLength(1);
        expect(publicados[0].categoria).toEqual('Llaves');
    });

    it('el numero correlativo continua entre repositorios que comparten el almacen', async () => {
        const almacen = crearAlmacenFalso();
        const primero = new ObjetosEnMemoria({ objetos: [{ id: 1, numero: 1, estado: 'publicado' }], almacen });
        await primero.registrar({ categoria: 'Llaves', descripcion: 'Llaves de oficina' });

        const segundo = new ObjetosEnMemoria({ objetos: [{ id: 1, numero: 1, estado: 'publicado' }], almacen });
        const nuevo = await segundo.registrar({ categoria: 'Ropa', descripcion: 'Chaqueta azul' });

        expect(nuevo).toMatchObject({ id: 3, numero: 3 });
    });

    it('recuerda una entrega registrada en otro repositorio que use el mismo almacen', async () => {
        const almacen = crearAlmacenFalso();
        const objeto = crearObjeto({ id: 1, numero: 1 });
        const primero = new ObjetosEnMemoria({ objetos: [objeto], almacen });

        await primero.registrarEntrega(1, { nombre: 'Ana Perez', ci: '1234567' });
        const segundo = new ObjetosEnMemoria({ objetos: [objeto], almacen });

        expect(await segundo.listarPublicados()).toEqual([]);
    });
    it('recuerda un objeto actualizado en otro repositorio que use el mismo almacen', async () => {
        const almacen = crearAlmacenFalso();
        const objeto = crearObjeto({ id: 1, numero: 1, categoria: 'Llaves' });
        const primero = new ObjetosEnMemoria({ objetos: [objeto], almacen });

        await primero.actualizar(1, { categoria: 'Ropa' });
        const segundo = new ObjetosEnMemoria({ objetos: [objeto], almacen });

        expect((await segundo.obtenerPorId(1)).categoria).toEqual('Ropa');
    });

    describe('ObjetosEnMemoria - listarEntregados', () => {
        it('devuelve solo los objetos entregados', async () => {
            const publicado = crearObjeto({ id: 1, numero: 1 });
            const entregado = crearObjeto({ id: 2, numero: 2, estado: 'entregado' });
            const repo = new ObjetosEnMemoria({ objetos: [publicado, entregado] });

            const resultado = await repo.listarEntregados();

            expect(resultado).toEqual([entregado]);
        });
        
        it('ordena los entregados del mas reciente al mas antiguo', async () => {
            const antiguo = crearObjeto({ id: 1, numero: 1, estado: 'entregado', entrega: { fechaEntrega: '2026-10-01' }, });
            const reciente = crearObjeto({ id: 2, numero: 2, estado: 'entregado', entrega: { fechaEntrega: '2026-10-20' }, });
            const repo = new ObjetosEnMemoria({ objetos: [antiguo, reciente] });

            const resultado = await repo.listarEntregados();

            expect(resultado).toEqual([reciente, antiguo]);
        });
    });
});