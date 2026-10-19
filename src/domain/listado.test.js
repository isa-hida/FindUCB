import { prepararListado } from './listado';

const crearObjeto = (datos) => ({
    numero: 1,
    fechaHallazgo: '2026-10-01',
    estado: 'publicado',
    ...datos,
});

const idsDe = (tarjetas) => tarjetas.map((tarjeta) => tarjeta.id);

describe('prepararListado', () => {
    it('devuelve una lista vacia si no hay objetos', () => {
        expect(prepararListado([])).toEqual([]);
    });

    it('no incluye los objetos ya entregados', () => {
        const objetos = [
            crearObjeto({ id: 1 }),
            crearObjeto({ id: 2, estado: 'entregado' }),
        ];

        expect(idsDe(prepararListado(objetos))).toEqual([1]);
    });

    it('ordena los objetos del mas reciente al mas antiguo', () => {
        const objetos = [
            crearObjeto({ id: 1, fechaHallazgo: '2026-10-01' }),
            crearObjeto({ id: 2, fechaHallazgo: '2026-10-15' }),
            crearObjeto({ id: 3, fechaHallazgo: '2026-10-08' }),
        ];

        expect(idsDe(prepararListado(objetos))).toEqual([2, 3, 1]);
    });

        it('con la misma fecha muestra primero el de mayor numero', () => {
        const objetos = [
            crearObjeto({ id: 1, numero: 8 }),
            crearObjeto({ id: 2, numero: 5 }),
            crearObjeto({ id: 3, numero: 9 }),
        ];

        expect(idsDe(prepararListado(objetos))).toEqual([3, 1, 2]);
    });
});
