import { validarLoginAdmin } from './correo';
import { MENSAJES } from './mensajes';

describe('validarLoginAdmin', () => {
    it('no da errores si hay correo y contrasena', () => {
        const errores = validarLoginAdmin({ correo: 'admin@ucb.edu.bo', password: 'Admin123' });

        expect(errores).toEqual([]);
    });

    it('pide correo y contrasena si ambos estan vacios', () => {
        const errores = validarLoginAdmin({ correo: '', password: '' });

        expect(errores).toEqual([MENSAJES.CAMPOS_LOGIN_VACIOS]);
    });

    it('pide correo y contrasena si solo falta el correo', () => {
        const errores = validarLoginAdmin({ correo: '', password: 'Admin123' });

        expect(errores).toEqual([MENSAJES.CAMPOS_LOGIN_VACIOS]);
    });

    it('pide correo y contrasena si solo falta la contrasena', () => {
        const errores = validarLoginAdmin({ correo: 'admin@ucb.edu.bo', password: '' });

        expect(errores).toEqual([MENSAJES.CAMPOS_LOGIN_VACIOS]);
    });
});