describe('HU-14: historial de objetos entregados', () => {
    it('el panel de administración tiene la sección Historial', () => {
        cy.visitarComoAdmin('/admin/index.html');

        cy.get('#historial-link').should('be.visible').and('contain', 'Historial');
    });
    it('el historial muestra el objeto ya entregado', () => {
        cy.visitarComoAdmin('/admin/historial.html');

        cy.get('#fila-historial-5').should('be.visible');
    });
    it('la fila muestra quien recibio el objeto y la fecha de entrega', () => {
        cy.visitarComoAdmin('/admin/historial.html');

        cy.get('#fila-historial-5').within(() => {
            cy.get('.historial__receptor').should('have.text', 'Pedro Gutiérrez');
            cy.get('.historial__fecha').should('have.text', '2026-10-17');
        });
    });
    it('un miembro de la comunidad no puede entrar al historial', () => {
        cy.visitarComoComunidad('/admin/historial.html');

        cy.url().should('include', '/admin/login.html');
    });
});