import { validarEntrega , fechaEntregaPorDefecto } from './entrega';
import { MENSAJES } from './mensajes';

describe('validarEntrega', () => {
    it('no da errores si hay nombre y C.I.', () => {
        const errores = validarEntrega({ nombre: 'Ana Perez', ci: '1234567' });

        expect(errores).toEqual([]);
    });

    it('pide nombre y C.I. si falta el nombre', () => {
        const errores = validarEntrega({ nombre: '', ci: '1234567' });

        expect(errores).toEqual([MENSAJES.FALTA_NOMBRE_CI]);
    });

    it('pide nombre y C.I. si falta la C.I.', () => {
        const errores = validarEntrega({ nombre: 'Ana Perez', ci: '' });

        expect(errores).toEqual([MENSAJES.FALTA_NOMBRE_CI]);
    });

    it('pide nombre y C.I. si el nombre tiene solo espacios', () => {
        const errores = validarEntrega({ nombre: '   ', ci: '1234567' });

        expect(errores).toEqual([MENSAJES.FALTA_NOMBRE_CI]);
    });

    it('pide nombre y C.I. si el ci tiene solo espacios', () => {
        const errores = validarEntrega({ nombre: 'Ana Perez', ci: '   ' });

        expect(errores).toEqual([MENSAJES.FALTA_NOMBRE_CI]);
    });
});

describe('fechaEntregaPorDefecto', () => {
    it('devuelve la fecha de hoy con formato AAAA-MM-DD', () => {
        const hoy = new Date(2026, 2, 5);

        expect(fechaEntregaPorDefecto(hoy)).toBe('2026-03-05');
    });
});