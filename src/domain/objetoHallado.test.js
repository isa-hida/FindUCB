import { validarObjetoHallado } from './objetoHallado';
import { MENSAJES } from './mensajes';

describe('validarObjetoHallado', () => {
    it('da error si falta la categoria o la descripcion', () => {
        const errores = validarObjetoHallado({ categoria: '', descripcion: '' });

        expect(errores).toEqual([MENSAJES.FALTA_CATEGORIA_DESCRIPCION]);
    });

    it('da error si la fecha de hallazgo es posterior a hoy', () => {
        const errores = validarObjetoHallado({
            categoria: 'Llaves',
            descripcion: 'Llave con llavero',
            fechaHallazgo: '2026-10-21',
            hoy: '2026-10-20',
        });

        expect(errores).toEqual([MENSAJES.FECHA_FUTURA]);
    });
    it('da error si la descripcion o las senas superan los 500 caracteres', () => {
        const textoLargo = 'a'.repeat(501);
        const errores = validarObjetoHallado({
            categoria: 'Llaves',
            descripcion: textoLargo,
            senas: '',
        });

        expect(errores).toEqual([MENSAJES.TEXTO_MUY_LARGO]);
    });
});