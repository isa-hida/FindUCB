import { formatearFecha, aFechaIso } from './fecha';

describe('formatearFecha', () => {
    it('convierte una fecha AAAA-MM-DD en DD/MM/AAAA', () => {
        expect(formatearFecha('2026-03-05')).toEqual('05/03/2026');
    });
});

describe('aFechaIso', () => {
    it('convierte un Date en AAAA-MM-DD usando la fecha local', () => {
        expect(aFechaIso(new Date(2026, 9, 5, 23, 30))).toEqual('2026-10-05');
    });
});