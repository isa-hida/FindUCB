const RUTA_HISTORIAL = '/admin/historial.html';
const CLAVE_ALMACEN = 'findu.objetos';
const FILA_CUADERNO = '#fila-historial-5';

const abrirHistorial = () => {
    cy.visitarComoAdmin(RUTA_HISTORIAL);
};

const abrirHistorialSinEntregas = () => {
    cy.visit(RUTA_HISTORIAL, {
        onBeforeLoad: (ventana) => {
            ventana.sessionStorage.setItem(
                'usuario',
                JSON.stringify({ correo: 'admin@ucb.edu.bo', esAdmin: true }),
            );
            // Solo hay un objeto publicado: ninguno entregado
            ventana.localStorage.setItem(
                CLAVE_ALMACEN,
                JSON.stringify([{ id: 1, numero: 1, estado: 'publicado' }]),
            );
        },
    });
};

describe('HU-14: historial de objetos entregados', () => {
    it('el panel de administración tiene la sección Historial', () => {
        cy.visitarComoAdmin('/admin/index.html');

        cy.get('#historial-link').should('be.visible').and('contain', 'Historial');
    });

    it('el historial muestra el objeto ya entregado', () => {
        abrirHistorial();

        cy.get(FILA_CUADERNO).should('be.visible');
    });

    it('la fila muestra quien recibio el objeto y la fecha de entrega', () => {
        abrirHistorial();

        cy.get(FILA_CUADERNO).within(() => {
            cy.get('.historial__receptor').should('have.text', 'Pedro Gutiérrez');
            cy.get('.historial__fecha').should('have.text', '2026-10-17');
        });
    });

    it('un miembro de la comunidad no puede entrar al historial', () => {
        cy.visitarComoComunidad(RUTA_HISTORIAL);

        cy.url().should('include', '/admin/login.html');
    });

    it('avisa que no hay objetos entregados cuando el historial esta vacio', () => {
        abrirHistorialSinEntregas();

        cy.get('#mensaje-vacio').should('be.visible').and('have.text', 'No hay objetos entregados');
        cy.get('#tabla-historial').should('not.be.visible');
    });

    it('el historial permite volver al panel de administración', () => {
        abrirHistorial();

        cy.get('#volver-link').click();

        cy.url().should('include', '/admin/index.html');
    });

    it('la fila muestra la foto del objeto entregado', () => {
        abrirHistorial();

        cy.get(`${FILA_CUADERNO} .historial__foto`)
            .should('be.visible')
            .and('have.attr', 'src')
            .and('include', 'cuaderno');
    });
});