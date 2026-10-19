import { prepararListado, filtrarListado, validarFiltros } from './listado';
import { MENSAJES } from './mensajes';

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

        it('cada tarjeta lleva solo id, categoria, fecha y foto', () => {
        const objeto = crearObjeto({
            id: 7,
            numero: 7,
            fechaHallazgo: '2026-10-10',
            lugar: 'Biblioteca',
            categoria: 'Mochila',
            color: 'Negro',
            marca: 'Totto',
            descripcion: 'Mochila con cierre roto',
            senas: 'Llavero de llama',
            fotoPath: 'objetos/7.jpg',
            encontradoPor: { nombre: 'Juan Perez', celular: '70000000' },
        });

        expect(prepararListado([objeto])).toEqual([
            { id: 7, categoria: 'Mochila', fechaHallazgo: '2026-10-10', fotoPath: 'objetos/7.jpg' },
        ]);
    });

});

describe('filtrarListado', () => {
    const TARJETAS = [
        { id: 1, categoria: 'Llaves', fechaHallazgo: '2026-10-14' },
        { id: 2, categoria: 'Electrónicos', fechaHallazgo: '2026-10-10' },
        { id: 3, categoria: 'Llaves', fechaHallazgo: '2026-10-02' },
    ];

    it('sin filtros devuelve todas las tarjetas', () => {
        expect(idsDe(filtrarListado(TARJETAS, {}))).toEqual([1, 2, 3]);
    });

    it('filtra por categoria', () => {
        expect(idsDe(filtrarListado(TARJETAS, { categoria: 'Llaves' }))).toEqual([1, 3]);
    });

    it('filtra desde una fecha de inicio incluyendo ese dia', () => {
        expect(idsDe(filtrarListado(TARJETAS, { desde: '2026-10-10' }))).toEqual([1, 2]);
    });

    it('filtra hasta una fecha final incluyendo ese dia', () => {
        expect(idsDe(filtrarListado(TARJETAS, { hasta: '2026-10-10' }))).toEqual([2, 3]);
    });

    it('combina categoria y rango de fechas', () => {
        const filtros = { categoria: 'Llaves', desde: '2026-10-05', hasta: '2026-10-20' };

        expect(idsDe(filtrarListado(TARJETAS, filtros))).toEqual([1]);
    });
});

describe('validarFiltros', () => {
    it('da error si la fecha de inicio es posterior a la final', () => {
        expect(validarFiltros({ desde: '2026-10-15', hasta: '2026-10-01' })).toEqual([MENSAJES.FECHAS_INVERTIDAS]);
    });
});
