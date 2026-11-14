import { obtenerInformacionBienestar } from './bienestar.js';

describe('bienestar (HU-11)', () => {
    it('devuelve la ubicación y el horario de atención de Bienestar', () => {
        const info = obtenerInformacionBienestar();
        expect(info).toHaveProperty('ubicacion');
        expect(info).toHaveProperty('horario');
        expect(info.horario).toContain('08:30 a 16:00');
    });
});