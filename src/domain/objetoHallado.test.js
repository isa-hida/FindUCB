import { validarObjetoHallado } from './objetoHallado';
import { MENSAJES } from './mensajes';

describe('validarObjetoHallado', () => {
    it('da error si falta la categoria o la descripcion', () => {
        const errores = validarObjetoHallado({ categoria: '', descripcion: '' });

        expect(errores).toEqual([MENSAJES.FALTA_CATEGORIA_DESCRIPCION]);
    });
});