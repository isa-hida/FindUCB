describe('HU-03: Cerrar sesión en vistas de Comunidad y Administración', () => {
    it('permite cerrar sesión correctamente desde el listado de la comunidad y previene volver atrás', () => {
        // Simulamos un usuario de la comunidad logueado
        cy.visit('/login.html');
        cy.window().then((win) => {
            win.sessionStorage.setItem(
                'usuario',
                JSON.stringify({ correo: 'estudiante@ucb.edu.bo', esAdmin: false })
            );
        });
        cy.visit('/index.html');

        // Verifica que el botón de cerrar sesión sea visible y hazle clic
        cy.contains('button', 'Cerrar sesión').should('be.visible').click();

        // Valida que redirige a la pantalla de login general
        cy.url().should('include', '/login.html');

        // Intenta volver al listado usando el historial y verifica que lo expulse de nuevo al login
        cy.visit('/index.html');
        cy.url().should('include', '/login.html');
    });

    it('permite cerrar sesión correctamente desde el panel de administración y previene volver atrás', () => {
        // Simulamos un administrador logueado
        cy.visit('/admin/login.html');
        cy.window().then((win) => {
            win.sessionStorage.setItem(
                'usuario',
                JSON.stringify({ correo: 'adminbienestar@ucb.edu.bo', esAdmin: true })
            );
        });
        cy.visit('/admin/index.html');

        // Verifica que el botón de cerrar sesión sea visible y hazle clic
        cy.contains('button', 'Cerrar sesión').should('be.visible').click();

        // Valida que redirige al login general
        cy.url().should('include', '/login.html');

        // Intenta volver al panel de admin y verifica que lo expulse al login
        cy.visit('/admin/index.html');
        cy.url().should('include', '/login.html');
    });
});