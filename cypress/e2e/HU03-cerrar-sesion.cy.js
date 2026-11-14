describe('HU-03: Cerrar sesión en vistas de Comunidad y Administración', () => {
    it('permite cerrar sesión correctamente desde el listado de la comunidad y previene volver atrás', () => {
        cy.visit('/login.html');
        cy.window().then((win) => {
            win.sessionStorage.setItem(
                'usuario',
                JSON.stringify({ correo: 'estudiante@ucb.edu.bo', esAdmin: false })
            );
        });
        cy.visit('/index.html');

        cy.contains('button', 'Cerrar sesión').should('be.visible').click();

        cy.url().should('include', '/login.html');

        cy.visit('/index.html');
        cy.url().should('include', '/login.html');
    });

    it('permite cerrar sesión correctamente desde el panel de administración y previene volver atrás', () => {
        cy.visit('/admin/login.html');
        cy.window().then((win) => {
            win.sessionStorage.setItem(
                'usuario',
                JSON.stringify({ correo: 'adminbienestar@ucb.edu.bo', esAdmin: true })
            );
        });
        cy.visit('/admin/index.html');

        cy.contains('button', 'Cerrar sesión').should('be.visible').click();

        cy.url().should('include', '/login.html');

        cy.visit('/admin/index.html');
        cy.url().should('include', '/login.html');
    });
});