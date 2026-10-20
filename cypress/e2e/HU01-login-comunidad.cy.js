describe('HU01: iniciar sesion con correo institucional', () => {
    beforeEach(() => {
        cy.visit('/login.html');
    });

    it('muestra error si se intenta ingresar con un correo que no es institucional', () => {
        cy.get('#correo-input').type('usuario@gmail.com');
        cy.get('#ingresar-button').click();

        cy.get('#error-mensaje')
            .should('be.visible')
            .and('have.text', 'Solo pueden ingresar miembros de la UCB con su correo institucional');
    });

    it('ingresa exitosamente y redirige al listado si el correo es institucional valido', () => {
        cy.get('#correo-input').type('estudiante@ucb.edu.bo');
        cy.get('#ingresar-button').click();

        cy.location('pathname').should('eq', '/index.html');
    });
});