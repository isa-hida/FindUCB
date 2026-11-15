describe('HU-14: historial de objetos entregados', () => {
    it('el panel de administración tiene la sección Historial', () => {
        cy.visitarComoAdmin('/admin/index.html');

        cy.get('#historial-link').should('be.visible').and('contain', 'Historial');
    });
    it('el historial muestra el objeto ya entregado', () => {
        cy.visitarComoAdmin('/admin/historial.html');

        cy.get('#fila-historial-5').should('be.visible');
    });
});