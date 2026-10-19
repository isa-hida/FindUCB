import { filtrarPublicados } from './listaAdmin';

describe('filtrarPublicados', () => {
    it('devuelve una lista vacia si no hay objetos', () => {
        const resultado = filtrarPublicados([]);

        expect(resultado).toEqual([]);
    });
});