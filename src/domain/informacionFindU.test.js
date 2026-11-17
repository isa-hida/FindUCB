import { INFORMACION_FINDU } from './informacionFindU';

describe('INFORMACION_FINDU', () => {
    it('indica que el servicio corresponde a UCB Cochabamba', () => {
        expect(INFORMACION_FINDU.descripcion).toContain('UCB Cochabamba');
    });

    it('explica los pasos para recuperar un objeto en Bienestar Estudiantil', () => {
        expect(INFORMACION_FINDU.pasos.length).toBeGreaterThan(0);
        expect(INFORMACION_FINDU.pasos.some((paso) => paso.includes('Bienestar Estudiantil'))).toBe(true);
    });
});
