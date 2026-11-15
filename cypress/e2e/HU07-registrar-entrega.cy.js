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
    })
    it('tras entregar, el objeto ya no aparece en el panel ni al recargar', () => {
        cy.visitarComoAdmin('/admin/entrega.html?id=1');
        cy.get('#nombre').type('Ana Perez');
        cy.get('#ci').type('1234567');
        cy.get('#confirmar-button').click();
        cy.get('#exito-mensaje').should('be.visible');

        cy.visitarComoAdmin('/admin/index.html');
        cy.get('#fila-objeto-1').should('not.exist');
        cy.get('#fila-objeto-2').should('be.visible');

        cy.reload();
        cy.get('#fila-objeto-1').should('not.exist');
    });
    it('tras entregar, el objeto desaparece del listado de la comunidad y sus datos no se ven', () => {
        cy.visitarComoAdmin('/admin/entrega.html?id=1');
        cy.get('#nombre').type('Ana Perez');
        cy.get('#ci').type('1234567');
        cy.get('#confirmar-button').click();
        cy.get('#exito-mensaje').should('be.visible');
        cy.visitarComoComunidad('/');

        cy.get('#objeto-1').should('not.exist');
        cy.get('#objeto-2').should('be.visible');

        cy.get('#listado').should('not.contain', 'Ana Perez');
    });
   
});