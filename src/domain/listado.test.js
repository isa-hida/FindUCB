import { prepararListado, filtrarListado, validarFiltros, mensajeSinResultados } from './listado';
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

        it('cada tarjeta lleva solo id, categoria, color, fecha y foto', () => {
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
            rutaFoto: 'objetos/7.jpg',
            encontradoPor: { nombre: 'Juan Perez', celular: '70000000' },
        });

        expect(prepararListado([objeto])).toEqual([
            { id: 7, categoria: 'Mochila', color: 'Negro', fechaHallazgo: '2026-10-10', rutaFoto: 'objetos/7.jpg' },
        ]);
    });

});

describe('filtrarListado', () => {
    const TARJETAS = [
        { id: 1, categoria: 'Llaves', color: 'Dorado', fechaHallazgo: '2026-10-14' },
        { id: 2, categoria: 'Electrónicos', color: 'Negro', fechaHallazgo: '2026-10-10' },
        { id: 3, categoria: 'Llaves', color: 'Azul', fechaHallazgo: '2026-10-02' },
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

    it('filtra por color', () => {
        expect(idsDe(filtrarListado(TARJETAS, { color: 'Azul' }))).toEqual([3]);
    });

    it('filtra por color aunque el texto del objeto tenga mas palabras', () => {
        const tarjetas = [
            { id: 1, color: 'Azul oscuro' },
            { id: 2, color: 'Negro' },
        ];

        expect(idsDe(filtrarListado(tarjetas, { color: 'Azul' }))).toEqual([1]);
    });

    it('filtra por color sin distinguir mayusculas', () => {
        const tarjetas = [
            { id: 1, color: 'negro con detalles AZUL' },
            { id: 2, color: 'Rojo' },
        ];

        expect(idsDe(filtrarListado(tarjetas, { color: 'Azul' }))).toEqual([1]);
    });

    it('filtra por color sin distinguir tildes', () => {
        const tarjetas = [
            { id: 1, color: 'Cafe claro' },
            { id: 2, color: 'Gris' },
        ];

        expect(idsDe(filtrarListado(tarjetas, { color: 'Café' }))).toEqual([1]);
    });

    it('filtra por color aceptando femenino y plural', () => {
        const tarjetas = [
            { id: 1, color: 'Mochila negra' },
            { id: 2, color: 'Blanco con franjas negras' },
            { id: 3, color: 'Blanco' },
        ];

        expect(idsDe(filtrarListado(tarjetas, { color: 'Negro' }))).toEqual([1, 2]);
    });

    it('combina color con categoria y rango de fechas', () => {
        const tarjetas = [
            { id: 1, categoria: 'Llaves', color: 'Azul', fechaHallazgo: '2026-10-02' },
            { id: 2, categoria: 'Llaves', color: 'Azul', fechaHallazgo: '2026-10-20' },
            { id: 3, categoria: 'Electrónicos', color: 'Azul', fechaHallazgo: '2026-10-02' },
            { id: 4, categoria: 'Llaves', color: 'Negro', fechaHallazgo: '2026-10-02' },
        ];
        const filtros = { categoria: 'Llaves', color: 'Azul', desde: '2026-10-01', hasta: '2026-10-10' };

        expect(idsDe(filtrarListado(tarjetas, filtros))).toEqual([1]);
    });
});

describe('mensajeSinResultados', () => {
    it('con solo color indica que no hay objetos con ese color', () => {
        expect(mensajeSinResultados({ color: 'Azul' })).toEqual(MENSAJES.SIN_OBJETOS_DEL_COLOR);
    });

    it('con solo rango de fechas indica que no hay objetos en ese rango', () => {
        expect(mensajeSinResultados({ desde: '2026-10-01', hasta: '2026-10-05' })).toEqual(MENSAJES.SIN_OBJETOS_EN_FECHAS);
    });

    it('con solo categoria mantiene el mensaje de sin coincidencias', () => {
        expect(mensajeSinResultados({ categoria: 'Llaves' })).toEqual(MENSAJES.SIN_COINCIDENCIAS);
    });

    it('con dos o mas filtros indica que no hay objetos que coincidan con los filtros', () => {
        expect(mensajeSinResultados({ categoria: 'Llaves', color: 'Azul' })).toEqual(MENSAJES.SIN_COINCIDENCIAS_COMBINADAS);
    });
});

describe('validarFiltros', () => {
    it('da error si la fecha de inicio es posterior a la final', () => {
        expect(validarFiltros({ desde: '2026-10-15', hasta: '2026-10-01' })).toEqual([MENSAJES.FECHAS_INVERTIDAS]);
    });

    it('no da error si la fecha de inicio es anterior a la final', () => {
        expect(validarFiltros({ desde: '2026-10-01', hasta: '2026-10-15' })).toEqual([]);
    });

    it('no da error si solo hay fecha de inicio', () => {
        expect(validarFiltros({ desde: '2026-10-10', hasta: '' })).toEqual([]);
    });

    it('permite la misma fecha de inicio y final para buscar un solo dia', () => {
        expect(validarFiltros({ desde: '2026-10-10', hasta: '2026-10-10' })).toEqual([]);
    });
});
