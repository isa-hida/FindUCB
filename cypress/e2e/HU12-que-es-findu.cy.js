import { INFORMACION_FINDU } from '../../src/domain/informacionFindU';

describe('HU12: ver qué es FindU y a quién corresponde', () => {
    beforeEach(() => {
        cy.visitarComoComunidad('/');
    });

    it('explica qué es FindU', () => {
        cy.get('#informacion-findu').should('be.visible').and('contain', '¿Qué es FindU?');
        cy.get('#findu-descripcion').should('have.text', INFORMACION_FINDU.descripcion);
    });

    it('indica que el servicio corresponde a UCB Cochabamba', () => {
        cy.get('#findu-descripcion').should('be.visible').and('contain', 'UCB Cochabamba');
    });

    it('explica cómo recuperar un objeto', () => {
        cy.get('#informacion-findu').should('contain', '¿Cómo recupero mi objeto?');
        cy.get('#findu-pasos li')
            .should('have.length', INFORMACION_FINDU.pasos.length)
            .each((paso, indice) => expect(paso).to.have.text(INFORMACION_FINDU.pasos[indice]));
    });
});
