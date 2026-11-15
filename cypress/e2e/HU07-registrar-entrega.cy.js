describe('HU-07: registrar la entrega de un objeto', () => {
    beforeEach(() => {
        cy.visitarComoAdmin('/admin/index.html');
    });

    it('cada fila ofrece la opción "Registrar entrega"', () => {       
        cy.get('#entrega-link-1').should('contain', 'Registrar entrega');
    });
});