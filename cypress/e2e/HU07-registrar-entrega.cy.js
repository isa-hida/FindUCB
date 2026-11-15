const NOMBRE_RECEPTOR = 'Ana Perez';
const CI_RECEPTOR = '1234567';

const entregarObjeto = (id) => {
    cy.visitarComoAdmin(`/admin/entrega.html?id=${id}`);
    cy.get('#nombre').type(NOMBRE_RECEPTOR);
    cy.get('#ci').type(CI_RECEPTOR);
    cy.get('#confirmar-button').click();
    cy.get('#exito-mensaje').should('be.visible');
};

describe('HU-07: registrar la entrega de un objeto', () => {
    beforeEach(() => {
        cy.visitarComoAdmin('/admin/index.html');
    });

    it('cada fila ofrece la opción "Registrar entrega"', () => {
        cy.get('#entrega-link-1').should('contain', 'Registrar entrega');
    });

    it('al confirmar con nombre y C.I. muestra que la entrega fue registrada', () => {
        entregarObjeto(1);

        cy.get('#exito-mensaje').should('contain', 'Entrega registrada correctamente');
    });

    it('tras entregar, el objeto ya no aparece en el panel ni al recargar', () => {
        entregarObjeto(1);

        cy.visitarComoAdmin('/admin/index.html');
        cy.get('#fila-objeto-1').should('not.exist');
        cy.get('#fila-objeto-2').should('be.visible');

        cy.reload();
        cy.get('#fila-objeto-1').should('not.exist');
    });

    it('tras entregar, el objeto desaparece del listado de la comunidad y sus datos no se ven', () => {
        entregarObjeto(1);

        cy.visitarComoComunidad('/');
        cy.get('#objeto-1').should('not.exist');
        cy.get('#objeto-2').should('be.visible');
        cy.get('#listado').should('not.contain', NOMBRE_RECEPTOR);
    });
});