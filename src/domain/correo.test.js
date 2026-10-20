import { validarCorreoComunidad } from './correo';
import { MENSAJES } from './mensajes';

describe('validarCorreoComunidad', () => {
    it('no da errores si el correo es institucional valido', () => {
        const errores = validarCorreoComunidad('adminbienestar@ucb.edu.bo');
        expect(errores).toEqual([]);
    });

    it('pide correo si esta vacio', () => {
        const errores = validarCorreoComunidad('');
        expect(errores).toEqual([MENSAJES.CAMPOS_LOGIN_VACIOS]);
    });

    it('devuelve error si el correo no es institucional', () => {
        const errores = validarCorreoComunidad('usuario@gmail.com');
        expect(errores).toEqual([MENSAJES.CORREO_NO_INSTITUCIONAL]);
    });
});