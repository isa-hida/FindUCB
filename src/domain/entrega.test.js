import { validarEntrega } from './entrega';

describe('validarEntrega', () => {
    it('no da errores si hay nombre y C.I.', () => {
        const errores = validarEntrega({ nombre: 'Ana Perez', ci: '1234567' });

        expect(errores).toEqual([]);
    });
});