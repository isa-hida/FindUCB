import { MENSAJES } from '../../src/domain/mensajes';

describe('HU10: ver el detalle de un objeto', () => {
    it('muestra la foto y toda la informacion publica del objeto', () => {
        cy.visit('/detalle.html?id=2');

        cy.get('#detalle').should('be.visible');
        cy.get('#detalle-foto').should('be.visible').and('have.attr', 'src').and('not.be.empty');
        cy.get('#detalle-numero').should('have.text', '2');
        cy.get('#detalle-categoria').should('have.text', 'Mochilas y bolsos');
        cy.get('#detalle-color').should('have.text', 'Azul');
        cy.get('#detalle-marca').should('have.text', 'Totto');
        cy.get('#detalle-descripcion').should('have.text', 'Mochila con dos bolsillos');
        cy.get('#detalle-senas').should('have.text', 'Cierre dorado en el bolsillo delantero');
        cy.get('#detalle-lugar').should('have.text', 'Cafetería');
        cy.get('#detalle-fecha').should('have.text', '10/10/2026');
    });

    it('no muestra datos de quien encontro el objeto', () => {
        cy.visit('/detalle.html?id=2');

        cy.get('#detalle').should('be.visible');
        cy.get('body').should('not.contain', 'Luis Vargas').and('not.contain', '70022222');
    });

    it('no muestra el detalle de un objeto ya entregado', () => {
        cy.visit('/detalle.html?id=5');

        cy.get('#no-encontrado-mensaje').should('be.visible').and('have.text', MENSAJES.OBJETO_NO_ENCONTRADO);
        cy.get('#detalle').should('not.be.visible');
        cy.get('body').should('not.contain', 'Pedro Gutiérrez');
    });

    it('muestra objeto no encontrado si el id no existe', () => {
        cy.visit('/detalle.html?id=99');

        cy.get('#no-encontrado-mensaje').should('be.visible').and('have.text', MENSAJES.OBJETO_NO_ENCONTRADO);
    });

    it('abre el detalle desde el listado y vuelve al listado', () => {
        cy.visit('/');
        cy.get('#objeto-3').click();
        cy.get('#detalle-categoria').should('have.text', 'Llaves');

        cy.get('#volver-link').click();

        cy.location('pathname').should('match', /^\/(index\.html)?$/);
        cy.get('#listado .tarjeta-objeto').should('have.length', 4);
    });
});
