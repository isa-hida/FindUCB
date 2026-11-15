describe('HU-07: registrar la entrega de un objeto', () => {
    beforeEach(() => {
        cy.visitarComoAdmin('/admin/index.html');
    });

    it('cada fila ofrece la opción "Registrar entrega"', () => {       
        cy.get('#entrega-link-1').should('contain', 'Registrar entrega');
    });

    it('al confirmar con nombre y C.I. muestra que la entrega fue registrada', () => {
    cy.visitarComoAdmin('/admin/entrega.html?id=1');

    cy.get('#nombre').type('Ana Perez');
    cy.get('#ci').type('1234567');
    cy.get('#confirmar-button').click();

    cy.get('#exito-mensaje').should('contain', 'Entrega registrada correctamente');
});
});