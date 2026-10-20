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

    it('da error si el formato de la foto no es JPG ni PNG', () => {
        const errores = validarObjetoHallado({
            categoria: 'Llaves',
            descripcion: 'Llaves de oficina',
            fotoPath: '/fotos/animacion.gif',
        });

        expect(errores).toEqual(['El formato de la foto debe ser JPG o PNG']);
    });

    it('acepta la foto si tiene formato JPG, JPEG o PNG', () => {
        const errores = validarObjetoHallado({
            categoria: 'Llaves',
            descripcion: 'Llaves de oficina',
            fotoPath: '/fotos/objeto.png',
        });

        expect(errores).toEqual([]);
    });
});