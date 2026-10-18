import { validarLoginAdmin } from './correo';

describe('validarLoginAdmin', () => {
    it('no da errores si hay correo y contrasena', () => {
        const errores = validarLoginAdmin({ correo: 'admin@ucb.edu.bo', password: 'Admin123' });

        expect(errores).toEqual([]);
    });
});