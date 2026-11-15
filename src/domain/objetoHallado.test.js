import { validarObjetoHallado } from './objetoHallado';
import { MENSAJES } from './mensajes';

const crearDatosValidos = (cambios = {}) => ({
    categoria: 'Llaves',
    descripcion: 'Llaves de oficina',
    fechaHallazgo: '2026-10-18',
    lugar: 'Biblioteca',
    color: 'Dorado',
    rutaFoto: '/fotos/llaves.jpg',
    encontradoPor: { nombre: 'Carla Rojas', celular: '70011111' },
    ...cambios,
});

describe('validarObjetoHallado', () => {
    it('da error si falta la categoria o la descripcion', () => {
        const errores = validarObjetoHallado(crearDatosValidos({ categoria: '', descripcion: '' }));

        expect(errores).toEqual([MENSAJES.FALTA_CATEGORIA_DESCRIPCION]);
    });
    it.each([
        ['la fecha de hallazgo', { fechaHallazgo: '' }],
        ['el lugar', { lugar: '' }],
        ['el color', { color: '' }],
        ['el nombre de quien lo encontro', { encontradoPor: { nombre: '', celular: '70011111' } }],
        ['el celular de quien lo encontro', { encontradoPor: { nombre: 'Carla Rojas', celular: '' } }],
        ['los datos de quien lo encontro', { encontradoPor: undefined }],
    ])('da error si falta %s', (_campo, cambios) => {
        const errores = validarObjetoHallado(crearDatosValidos(cambios));

        expect(errores).toEqual([MENSAJES.FALTAN_DATOS_HALLAZGO]);
    });

    it('no exige la marca porque es opcional', () => {
        const errores = validarObjetoHallado(crearDatosValidos({ marca: '' }));

        expect(errores).toEqual([]);
    });

    it('da error si falta la foto del objeto', () => {
        const errores = validarObjetoHallado(crearDatosValidos({ rutaFoto: '' }));

        expect(errores).toEqual([MENSAJES.FOTO_OBLIGATORIA]);
    });

    it('valida correctamente un objeto con todos sus datos y foto', () => {
        const errores = validarObjetoHallado(crearDatosValidos());

        expect(errores).toEqual([]);
    });

    it('da error si el formato de la foto no es JPG ni PNG', () => {
        const errores = validarObjetoHallado(crearDatosValidos({ rutaFoto: '/fotos/animacion.gif' }));

        expect(errores).toEqual(['El formato de la foto debe ser JPG o PNG']);
    });

    it('acepta la foto si tiene formato JPG, JPEG o PNG', () => {
        const errores = validarObjetoHallado(crearDatosValidos({ rutaFoto: '/fotos/objeto.png' }));

        expect(errores).toEqual([]);
    });
});