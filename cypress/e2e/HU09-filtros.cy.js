import { MENSAJES } from '../../src/domain/mensajes';

const idsVisibles = () =>
    cy.get('#listado .tarjeta-objeto').then((tarjetas) => tarjetas.toArray().map((tarjeta) => tarjeta.id));

describe('HU09: filtrar por categoria y fecha', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('#listado .tarjeta-objeto').should('have.length', 4);
    });

    it('filtra por categoria', () => {
        cy.get('#filtro-categoria').select('Llaves');
        cy.get('#filtrar-button').click();

        idsVisibles().should('deep.equal', ['objeto-3']);
    });

    it('filtra por rango de fechas', () => {
        cy.get('#filtro-desde').type('2026-10-05');
        cy.get('#filtro-hasta').type('2026-10-12');
        cy.get('#filtrar-button').click();

        idsVisibles().should('deep.equal', ['objeto-2']);
    });

    it('filtra por categoria y rango de fechas a la vez', () => {
        cy.get('#filtro-categoria').select('Llaves');
        cy.get('#filtro-desde').type('2026-10-14');
        cy.get('#filtro-hasta').type('2026-10-14');
        cy.get('#filtrar-button').click();

        idsVisibles().should('deep.equal', ['objeto-3']);
    });

    it('muestra un error si la fecha de inicio es posterior a la final', () => {
        cy.get('#filtro-desde').type('2026-10-14');
        cy.get('#filtro-hasta').type('2026-10-01');
        cy.get('#filtrar-button').click();

        cy.get('#error-filtros').should('be.visible').and('have.text', MENSAJES.FECHAS_INVERTIDAS);
        cy.get('#listado .tarjeta-objeto').should('have.length', 4);
    });

    it('muestra un mensaje si no hay coincidencias', () => {
        cy.get('#filtro-categoria').select('Documentos');
        cy.get('#filtrar-button').click();

        cy.get('#sin-objetos-mensaje').should('be.visible').and('have.text', MENSAJES.SIN_COINCIDENCIAS);
        cy.get('#listado .tarjeta-objeto').should('not.exist');
    });

    it('limpia los filtros con el boton', () => {
        cy.get('#filtro-categoria').select('Llaves');
        cy.get('#filtro-desde').type('2026-10-01');
        cy.get('#filtrar-button').click();
        cy.get('#listado .tarjeta-objeto').should('have.length', 1);

        cy.get('#limpiar-filtros-button').click();

        cy.get('#filtro-categoria').should('have.value', '');
        cy.get('#filtro-desde').should('have.value', '');
        cy.get('#filtro-hasta').should('have.value', '');
        cy.get('#listado .tarjeta-objeto').should('have.length', 4);
    });
});
