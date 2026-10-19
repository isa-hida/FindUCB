describe('HU-06: lista de objetos publicados', () => {
    beforeEach(() => {
        cy.visit('/admin/index.html');
    });

    it('muestra solo los objetos publicados', () => {
        cy.get('#lista-objetos tr').should('have.length', 2);
        cy.get('#fila-objeto-1').should('be.visible');
        cy.get('#fila-objeto-3').should('not.exist');
    });
});