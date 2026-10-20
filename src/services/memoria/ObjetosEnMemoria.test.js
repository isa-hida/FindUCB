import { ObjetosEnMemoria } from './ObjetosEnMemoria';

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
});