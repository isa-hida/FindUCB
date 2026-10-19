import { filtrarPublicados, crearFilaAdmin } from './listaAdmin';

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
     
    it('no devuelve el objeto si ya fue entregado', () => {
        const entregado = { id: 2, estado: 'entregado' };

        const resultado = filtrarPublicados([entregado]);

        expect(resultado).toEqual([]);
    });
});

describe('crearFilaAdmin', () => {
    it('incluye el numero del objeto', () => {
        const fila = crearFilaAdmin({ numero: 7 });

        expect(fila.numero).toBe(7);
    });
    
    it('incluye la categoria del objeto', () => {
        const fila = crearFilaAdmin({ categoria: 'Billetera' });

        expect(fila.categoria).toBe('Billetera');
    });
});