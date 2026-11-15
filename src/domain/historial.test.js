import { crearFilaHistorial } from './historial';

describe('crearFilaHistorial', () => {
    it('muestra N°, categoria, quien recibio y fecha de entrega', () => {
        const objeto = {
            id: 5,
            numero: 5,
            categoria: 'Útiles',
            estado: 'entregado',
            entrega: { nombre: 'Pedro Gutiérrez', ci: '1234567', fechaEntrega: '2026-10-17' },
        };
        expect(crearFilaHistorial(objeto)).toEqual({
            id: 5,
            numero: 5,
            categoria: 'Útiles',
            nombreReceptor: 'Pedro Gutiérrez',
            fechaEntrega: '2026-10-17',
        });
    });
    it('incluye la ruta de la foto para poder identificar el objeto', () => {
        const objeto = {
            id: 5,
            numero: 5,
            categoria: 'Útiles',
            rutaFoto: 'ejemplos/cuaderno.svg',
            entrega: { nombre: 'Pedro Gutiérrez', fechaEntrega: '2026-10-17' },
        };

        expect(crearFilaHistorial(objeto).rutaFoto).toBe('ejemplos/cuaderno.svg');
    });
});