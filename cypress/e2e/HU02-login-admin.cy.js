describe('HU-02: Iniciar sesión como administrador', () => {
    beforeEach(() => {
        cy.visit('/login.html'); 
    });

    it('Muestra error si se intenta ingresar con el correo vacío', () => {
        cy.get('#btn-ingresar').click(); 
        cy.get('#mensaje-error').should('contain', 'Por favor, ingrese correo');
    });

    it('Muestra error si se ingresa un correo no institucional', () => {
        cy.get('#input-correo').type('usuario@gmail.com');
        cy.get('#btn-ingresar').click();
        cy.get('#mensaje-error').should('contain', 'Correo no válido'); 
    });

    it('Redirige al listado público cuando es un estudiante con correo institucional', () => {
        cy.get('#input-correo').type('estudiante@ucb.edu.bo');
        cy.get('#btn-ingresar').click();
        cy.url().should('include', '/index.html');
    });

    it('Redirige al panel de administración cuando el correo es adminbienestar@ucb.edu.bo', () => {
        cy.get('#input-correo').type('adminbienestar@ucb.edu.bo');
        cy.get('#btn-ingresar').click();
        cy.url().should('include', '/admin.html');
    });
});