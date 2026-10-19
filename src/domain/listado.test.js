import { prepararListado } from './listado';

describe('prepararListado', () => {
    it('devuelve una lista vacia si no hay objetos', () => {
        expect(prepararListado([])).toEqual([]);
    });
});
