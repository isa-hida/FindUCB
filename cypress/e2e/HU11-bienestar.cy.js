describe('HU-11: Ver horario y lugar de atención de Bienestar', () => {
    beforeEach(() => {
        // Iniciar sesión como miembro de la comunidad UCB antes de cada prueba
        cy.visit('/login.html');
        cy.get('input[type="email"], input').first().type('estudiante@ucb.edu.bo');
        cy.contains('button', 'Ingresar').click();
        cy.url().should('include', 'index.html');
    });

    it('muestra el horario y la ubicación de Bienestar en el listado principal', () => {
        // Asegurarnos de estar en el listado y verificar la info
        cy.visit('/index.html');
        cy.contains('Atención de Bienestar Estudiantil').should('be.visible');
        cy.contains('Oficina de Bienestar Comunitario y Estudiantil').should('be.visible');
        cy.contains('Lunes a viernes de 08:30 a 16:00').should('be.visible');
    });

    it('muestra el horario y la ubicación de Bienestar en la vista de detalle del objeto', () => {
        cy.visit('/index.html');
        // Hace clic en el primer objeto disponible para ir al detalle
        cy.get('a[href*="detalle.html"]').first().click();

        // Verifica que la información de Bienestar sea visible en el detalle
        cy.contains('Lugar y horario de atención').should('be.visible');
        cy.contains('Bloque B, Ex cafeteria').should('be.visible');
        cy.contains('Lunes a viernes de 08:30 a 16:00').should('be.visible');
    });
});