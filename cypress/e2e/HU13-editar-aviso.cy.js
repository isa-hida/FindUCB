describe('HU-13: editar un aviso publicado', () => {
    beforeEach(() => {
        cy.visitarComoAdmin('/admin/index.html');
    });

    it('cada fila tiene la opción Editar que lleva al formulario de su objeto', () => {
        cy.get('#editar-link-1')
            .should('have.text', 'Editar')
            .and('have.attr', 'href', '/admin/editar.html?id=1');
        cy.get('#editar-link-2').should('have.attr', 'href', '/admin/editar.html?id=2');
    });

    it('no ofrece editar los objetos ya entregados', () => {
        cy.get('#editar-link-5').should('not.exist');
    });
    describe('HU-13: formulario de edición', () => {
        it('carga los datos actuales del objeto y muestra el N° solo lectura', () => {
            cy.visitarComoAdmin('/admin/editar.html?id=3');

            cy.get('#numero').should('have.value', '3').and('have.attr', 'readonly');
            cy.get('#categoria').should('have.value', 'Llaves');
            cy.get('#lugar').should('have.value', 'Estacionamiento');
            cy.get('#fecha-hallazgo').should('have.value', '2026-10-14');
            cy.get('#color').should('have.value', 'Dorado');
            cy.get('#descripcion').should('have.value', 'Dos llaves en un llavero de argolla');
            cy.get('#senas').should('have.value', 'Una llave dorada y una plateada');
            cy.get('#encontrado-nombre').should('have.value', 'Ana Quispe');
            cy.get('#encontrado-celular').should('have.value', '70033333');
            cy.get('#foto-preview').should('be.visible').and('have.attr', 'src').and('not.be.empty');
        });

        it('al guardar muestra el mensaje, conserva el N° y redirige al panel', () => {
            cy.visitarComoAdmin('/admin/editar.html?id=3');
            cy.clock(Date.now());

            cy.get('#lugar').clear().type('Biblioteca');
            cy.get('#guardar-button').click();

            cy.get('#exito-mensaje').should('contain', 'Aviso actualizado correctamente');
            cy.get('#numero').should('have.value', '3');

            cy.tick(1500);
            cy.location('pathname').should('eq', '/admin/index.html');
        });

        it('aplica las mismas validaciones del registro', () => {
            cy.visitarComoAdmin('/admin/editar.html?id=3');

            cy.get('#descripcion').clear();
            cy.get('#guardar-button').click();

            cy.get('#error-mensaje').should('contain', 'Es necesario ingresar categoría y descripción');
            cy.get('#exito-mensaje').should('not.be.visible');
        });

        it('avisa si el objeto no existe', () => {
            cy.visitarComoAdmin('/admin/editar.html?id=99');

            cy.get('#mensaje-no-encontrado').should('contain', 'Objeto no encontrado');
            cy.get('#editar-objeto-form').should('not.be.visible');
        });

        it('el listado público refleja los cambios guardados', () => {
            cy.visitarComoAdmin('/admin/editar.html?id=3');
            cy.clock(Date.now());
            cy.get('#fecha-hallazgo').clear().type('2026-10-12');
            cy.get('#guardar-button').click();
            cy.get('#exito-mensaje').should('be.visible');

            cy.visitarComoComunidad('/');

            cy.get('#objeto-3 .tarjeta-objeto__fecha').should('have.text', '12/10/2026');
        });
    });
});