describe('HU-14: historial de objetos entregados', () => {
    it('el panel de administración tiene la sección Historial', () => {
        cy.visitarComoAdmin('/admin/index.html');

        cy.get('#historial-link').should('be.visible').and('contain', 'Historial');
    });
});