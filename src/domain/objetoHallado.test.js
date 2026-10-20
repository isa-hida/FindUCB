import { validarObjetoHallado } from './objetoHallado';
import { MENSAJES } from './mensajes';

describe('validarObjetoHallado', () => {
    it('da error si falta la categoria o la descripcion', () => {
        const errores = validarObjetoHallado({ categoria: '', descripcion: '', fotoPath: '/fotos/ejemplo.jpg' });

        expect(errores).toEqual([MENSAJES.FALTA_CATEGORIA_DESCRIPCION]);
    });

    it('da error si falta la foto del objeto', () => {
        const errores = validarObjetoHallado({
            categoria: 'Llaves',
            descripcion: 'Llaves de oficina',
            fotoPath: '',
        });

        expect(errores).toEqual([MENSAJES.FOTO_OBLIGATORIA]);
    });

    it('valida correctamente un objeto con todos sus datos y foto', () => {
        const errores = validarObjetoHallado({
            categoria: 'Llaves',
            descripcion: 'Llaves de oficina',
            fotoPath: '/fotos/llaves.jpg',
        });

        expect(errores).toEqual([]);
    });
});