describe('HU-05: Adjuntar y validar foto de objeto hallado', () => {
    it('muestra error si se intenta registrar un objeto sin foto', () => {
        cy.visit('/admin/nuevo.html');
        cy.get('#categoria').select('Llaves');
        cy.get('#descripcion').type('Llaves de oficina');
        cy.get('#registrar-button').click();

        cy.get('#error-mensaje').should('contain', 'Es necesario adjuntar la foto del objeto');
    });

    it('permite seleccionar una foto válida, muestra la vista previa y registra con éxito', () => {
        cy.visit('/admin/nuevo.html');

        cy.get('#categoria').select('Llaves');
        cy.get('#descripcion').type('Llaves de oficina');
        cy.get('#fecha-hallazgo').type('2026-10-18');
        cy.get('#lugar').type('Biblioteca');
        cy.get('#color').type('Dorado');
        cy.get('#encontrado-nombre').type('Isabel Hidalgo');
        cy.get('#encontrado-celular').type('70000000');

        cy.get('#foto-input').selectFile({
            contents: Cypress.Buffer.from('file contents'),
            fileName: 'llaves.jpg',
            mimeType: 'image/jpeg',
        });

        cy.get('#foto-preview').should('not.be.hidden');

        // Enviamos el formulario
        cy.get('#registrar-button').click();

        cy.get('#exito-mensaje').should('contain', 'Aviso publicado exitosamente');
    });
});