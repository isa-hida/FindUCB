import { filtrarPublicados } from './listaAdmin';

describe('filtrarPublicados', () => {
    it('devuelve una lista vacia si no hay objetos', () => {
        const resultado = filtrarPublicados([]);

        expect(resultado).toEqual([]);
    });

    it('devuelve el objeto si esta publicado', () => {
        const publicado = { id: 1, estado: 'publicado' };

        const resultado = filtrarPublicados([publicado]);

        expect(resultado).toEqual([publicado]);
    });
});