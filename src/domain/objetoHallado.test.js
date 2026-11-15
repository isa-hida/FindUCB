import { validarObjetoHallado } from './objetoHallado';
import { MENSAJES } from './mensajes';
import { MAX_CARACTERES_TEXTO } from './limites';

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

        expect(errores).toEqual([MENSAJES.FORMATO_FOTO_INVALIDO]);
    });
    it('acepta que no haya foto nueva si el aviso ya tiene una foto guardada', () => {
        const errores = validarObjetoHallado(crearDatosValidos({
            rutaFoto: '',
            fotoActual: 'ejemplos/celular.svg',
        }));

        expect(errores).toEqual([]);
    });

    it('sigue exigiendo JPG o PNG a la foto nueva aunque el aviso ya tenga una guardada', () => {
        const errores = validarObjetoHallado(crearDatosValidos({
            rutaFoto: 'animacion.gif',
            fotoActual: 'ejemplos/celular.svg',
        }));

        expect(errores).toEqual([MENSAJES.FORMATO_FOTO_INVALIDO]);
    });

    it('acepta la foto si tiene formato JPG, JPEG o PNG', () => {
        const errores = validarObjetoHallado(crearDatosValidos({ rutaFoto: '/fotos/objeto.png' }));

        expect(errores).toEqual([]);
    });
    it('acepta una descripcion de exactamente 500 caracteres', () => {
        const errores = validarObjetoHallado(crearDatosValidos({ descripcion: 'a'.repeat(500) }));

        expect(errores).toEqual([]);
    });

    it('da error si la descripcion supera los 500 caracteres', () => {
        const errores = validarObjetoHallado(crearDatosValidos({ descripcion: 'a'.repeat(501) }));

        expect(errores).toEqual([MENSAJES.TEXTO_MUY_LARGO]);
    });

    it('da error si las senas particulares superan los 500 caracteres', () => {
        const errores = validarObjetoHallado(crearDatosValidos({ senas: 'a'.repeat(501) }));

        expect(errores).toEqual([MENSAJES.TEXTO_MUY_LARGO]);
    });
    it('el mensaje de texto muy largo indica el limite real', () => {
        expect(MENSAJES.TEXTO_MUY_LARGO).toContain(String(MAX_CARACTERES_TEXTO));
    });
});