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
    
        it('ordena los objetos del mas reciente al mas antiguo', () => {
        const objetos = [
            { id: 1, numero: 1, fechaHallazgo: '2026-10-01', estado: 'publicado' },
            { id: 2, numero: 2, fechaHallazgo: '2026-10-15', estado: 'publicado' },
            { id: 3, numero: 3, fechaHallazgo: '2026-10-08', estado: 'publicado' },
        ];

        const ids = prepararListado(objetos).map((objeto) => objeto.id);

        expect(ids).toEqual([2, 3, 1]);
    });

});
