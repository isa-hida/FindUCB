import { MENSAJES } from '../../src/domain/mensajes';

describe('HU04: Registrar un objeto hallado', () => {
    beforeEach(() => {
        cy.visit('/admin/nuevo.html');
    });

    it('muestra un error si faltan la categoria o la descripcion', () => {
        cy.get('#registrar-button').click();

        cy.get('#error-mensaje').should('be.visible').and('have.text', MENSAJES.FALTA_CATEGORIA_DESCRIPCION);
    });

    it('muestra un error si la fecha de hallazgo es futura', () => {
        cy.get('#categoria').select('Llaves');
        cy.get('#descripcion').select ? cy.get('#descripcion').type('Llaves de oficina') : cy.get('#descripcion').type('Llaves de oficina');
        cy.get('#fecha-hallazgo').type('2030-01-01');
        cy.get('#registrar-button').click();

        cy.get('#error-mensaje').should('be.visible').and('have.text', MENSAJES.FECHA_FUTURA);
    });

    it('registra el objeto correctamente y muestra el mensaje de exito', () => {
        cy.get('#categoria').select('Llaves');
        cy.get('#descripcion').type('Llaves de oficina');
        cy.get('#senas').type('Llavero azul');
        cy.get('#fecha-hallazgo').type('2026-10-18');
        cy.get('#lugar').type('Biblioteca');
        cy.get('#color').type('Plateado');
        cy.get('#encontrado-nombre').type('Carla Rojas');
        cy.get('#encontrado-celular').type('70011111');

        cy.get('#registrar-button').click();

        cy.get('#exito-mensaje').should('be.visible').and('have.text', MENSAJES.AVISO_PUBLICADO);
    });
}); satisfies