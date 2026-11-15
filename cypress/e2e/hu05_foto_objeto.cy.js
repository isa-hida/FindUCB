import { MENSAJES } from '../../src/domain/mensajes';

describe('HU-05: Adjuntar y validar foto de objeto hallado', () => {
    beforeEach(() => {
        cy.visitarComoAdmin('/admin/nuevo.html');
    });

    it('muestra error si se intenta registrar un objeto sin foto', () => {
        cy.llenarObjetoHallado({ foto: '' });
        cy.get('#registrar-button').click();

        cy.get('#error-mensaje').should('contain', MENSAJES.FOTO_OBLIGATORIA);
    });

    it('muestra error si la foto no es JPG ni PNG', () => {
        cy.llenarObjetoHallado({ foto: 'animacion.gif' });
        cy.get('#registrar-button').click();

        cy.get('#error-mensaje').should('contain', MENSAJES.FORMATO_FOTO_INVALIDO);
    });

    it('permite seleccionar una foto valida, muestra la vista previa y registra con exito', () => {
        cy.llenarObjetoHallado();

        cy.get('#foto-preview').should('not.be.hidden');
        cy.get('#registrar-button').click();

        cy.get('#exito-mensaje').should('contain', MENSAJES.AVISO_PUBLICADO);
    });
});