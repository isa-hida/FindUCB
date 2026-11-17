import { INFORMACION_FINDU } from './informacionFindU';

describe('INFORMACION_FINDU', () => {
    it('indica que el servicio corresponde a UCB Cochabamba', () => {
        expect(INFORMACION_FINDU.descripcion).toContain('UCB Cochabamba');
    });
});
