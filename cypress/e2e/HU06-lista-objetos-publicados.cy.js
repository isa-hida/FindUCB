describe('HU-06: lista de objetos publicados', () => {
    beforeEach(() => {
        cy.visit('/admin/index.html');
    });

    it('muestra solo los objetos publicados', () => {
        cy.get('#lista-objetos tr').should('have.length', 2);
        cy.get('#fila-objeto-1').should('be.visible');
        cy.get('#fila-objeto-3').should('not.exist');
    });

    it('cada fila tiene el enlace para registrar la entrega de su objeto', () => {
        cy.get('#entrega-link-1').should('have.attr', 'href', '/admin/entrega.html?id=1');
        cy.get('#entrega-link-2').should('have.attr', 'href', '/admin/entrega.html?id=2');
    });
});