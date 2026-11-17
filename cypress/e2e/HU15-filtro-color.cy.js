import { MENSAJES } from '../../src/domain/mensajes';
import { COLORES } from '../../src/domain/catalogos';

const idsVisibles = () =>
    cy.get('#listado .tarjeta-objeto').then((tarjetas) => tarjetas.toArray().map((tarjeta) => tarjeta.id));

describe('HU15: filtrar por color', () => {
    beforeEach(() => {
        cy.visitarComoComunidad('/');
        cy.get('#listado .tarjeta-objeto').should('have.length', 4);
    });

    it('ofrece una lista desplegable con los colores del catalogo', () => {
        cy.get('#filtro-color option').then((opciones) => {
            const valores = opciones.toArray().map((opcion) => opcion.value);
            expect(valores).to.deep.equal(['', ...COLORES]);
        });
    });

    it('filtra por color', () => {
        cy.get('#filtro-color').select('Azul');
        cy.get('#filtrar-button').click();

        idsVisibles().should('deep.equal', ['objeto-2']);
    });

    it('muestra un mensaje si ningun objeto es del color elegido', () => {
        cy.get('#filtro-color').select('Blanco');
        cy.get('#filtrar-button').click();

        cy.get('#sin-objetos-mensaje').should('be.visible').and('have.text', MENSAJES.SIN_OBJETOS_DEL_COLOR);
        cy.get('#listado .tarjeta-objeto').should('not.exist');
    });

    it('muestra un mensaje si ningun objeto esta en el rango de fechas', () => {
        cy.get('#filtro-desde').type('2026-11-01');
        cy.get('#filtrar-button').click();

        cy.get('#sin-objetos-mensaje').should('be.visible').and('have.text', MENSAJES.SIN_OBJETOS_EN_FECHAS);
    });

    it('combina el color con la categoria', () => {
        cy.get('#filtro-categoria').select('Mochilas y bolsos');
        cy.get('#filtro-color').select('Azul');
        cy.get('#filtrar-button').click();

        idsVisibles().should('deep.equal', ['objeto-2']);
    });

    it('muestra un mensaje si los filtros combinados no tienen coincidencias', () => {
        cy.get('#filtro-categoria').select('Llaves');
        cy.get('#filtro-color').select('Azul');
        cy.get('#filtrar-button').click();

        cy.get('#sin-objetos-mensaje').should('be.visible').and('have.text', MENSAJES.SIN_COINCIDENCIAS_COMBINADAS);
    });

    it('limpia tambien el color con el boton', () => {
        cy.get('#filtro-color').select('Azul');
        cy.get('#filtrar-button').click();
        cy.get('#listado .tarjeta-objeto').should('have.length', 1);

        cy.get('#limpiar-filtros-button').click();

        cy.get('#filtro-color').should('have.value', '');
        cy.get('#listado .tarjeta-objeto').should('have.length', 4);
    });
});
