import { formatearFecha } from './fecha';

describe('formatearFecha', () => {
    it('convierte una fecha AAAA-MM-DD en DD/MM/AAAA', () => {
        expect(formatearFecha('2026-03-05')).toEqual('05/03/2026');
    });
});
