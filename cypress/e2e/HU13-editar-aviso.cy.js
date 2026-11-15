describe('HU-13: editar un aviso publicado', () => {
    beforeEach(() => {
        cy.visitarComoAdmin('/admin/index.html');
    });

    it('cada fila tiene la opción Editar que lleva al formulario de su objeto', () => {
        cy.get('#editar-link-1')
            .should('have.text', 'Editar')
            .and('have.attr', 'href', '/admin/editar.html?id=1');
        cy.get('#editar-link-2').should('have.attr', 'href', '/admin/editar.html?id=2');
    });

    it('no ofrece editar los objetos ya entregados', () => {
        cy.get('#editar-link-5').should('not.exist');
    });
});