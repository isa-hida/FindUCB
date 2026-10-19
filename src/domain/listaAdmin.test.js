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

    it('incluye la fecha de hallazgo del objeto', () => {
        const fila = crearFilaAdmin({ fechaHallazgo: '2026-10-01' });

        expect(fila.fechaHallazgo).toBe('2026-10-01');
    });

    it('incluye la ruta de la foto del objeto', () => {
        const fila = crearFilaAdmin({ fotoPath: 'fotos/1.jpg' });

        expect(fila.fotoPath).toBe('fotos/1.jpg');
    });

    it('incluye el id del objeto', () => {
        const fila = crearFilaAdmin({ id: 3 });

        expect(fila.id).toBe(3);
    });

});