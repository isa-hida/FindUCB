describe('HU08: ver el listado de objetos hallados', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('muestra los objetos del mas reciente al mas antiguo', () => {
        cy.get('#listado .tarjeta-objeto').then((tarjetas) => {
            const ids = tarjetas.toArray().map((tarjeta) => tarjeta.id);
            expect(ids).to.deep.equal(['objeto-4', 'objeto-3', 'objeto-2', 'objeto-1']);
        });
    });

    it('no muestra los objetos ya entregados', () => {
        cy.get('#listado .tarjeta-objeto').should('have.length', 4);
        cy.get('#objeto-5').should('not.exist');
    });

    it('cada tarjeta muestra foto, categoria y fecha de hallazgo', () => {
        cy.get('#objeto-2').within(() => {
            cy.get('.tarjeta-objeto__foto').should('be.visible').and('have.attr', 'src').and('not.be.empty');
            cy.get('.tarjeta-objeto__categoria').should('have.text', 'Mochilas y bolsos');
            cy.get('.tarjeta-objeto__fecha').should('have.text', '10/10/2026');
        });
    });

    it('no muestra datos de quien encontro el objeto', () => {
        cy.get('#listado').should('not.contain', 'Luis Vargas');
    });

    it('no muestra el mensaje de vacio cuando hay objetos', () => {
        cy.get('#sin-objetos-mensaje').should('not.be.visible');
    });

    it('al hacer clic en una tarjeta abre el detalle del objeto', () => {
        cy.get('#objeto-3').click();
        cy.location('pathname').should('eq', '/detalle.html');
        cy.location('search').should('eq', '?id=3');
    });
});
