import { prepararListado } from './listado';

describe('prepararListado', () => {
    it('devuelve una lista vacia si no hay objetos', () => {
        expect(prepararListado([])).toEqual([]);
    });

    it('no incluye los objetos ya entregados', () => {
        const objetos = [
            { id: 1, numero: 1, fechaHallazgo: '2026-10-01', estado: 'publicado' },
            { id: 2, numero: 2, fechaHallazgo: '2026-10-02', estado: 'entregado' },
        ];

        const ids = prepararListado(objetos).map((objeto) => objeto.id);

        expect(ids).toEqual([1]);
    });
});
