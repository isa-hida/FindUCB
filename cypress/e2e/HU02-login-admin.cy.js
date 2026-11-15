import { MENSAJES } from '../../src/domain/mensajes';

describe('HU-02: Iniciar sesión como administrador', () => {
    beforeEach(() => {
        cy.visit('/admin/login.html');
    });

    it('muestra error si se intenta ingresar con el correo vacío', () => {
        cy.get('#ingresar-button').click();

        cy.get('#error-mensaje').should('be.visible').and('have.text', MENSAJES.CAMPOS_LOGIN_VACIOS);
    });

    it('muestra error si se ingresa un correo no institucional', () => {
        cy.get('#correo').type('usuario@gmail.com');
        cy.get('#ingresar-button').click();

        cy.get('#error-mensaje').should('be.visible').and('have.text', MENSAJES.CORREO_NO_INSTITUCIONAL);
    });

    it('rechaza a un estudiante con correo institucional', () => {
        cy.get('#correo').type('estudiante@ucb.edu.bo');
        cy.get('#ingresar-button').click();

        cy.get('#error-mensaje').should('be.visible').and('have.text', MENSAJES.CREDENCIALES_INVALIDAS);
    });

    it('redirige al panel de administración cuando el correo es adminbienestar@ucb.edu.bo', () => {
        cy.get('#correo').type('adminbienestar@ucb.edu.bo');
        cy.get('#ingresar-button').click();

        cy.location('pathname').should('eq', '/admin/index.html');
    });
});