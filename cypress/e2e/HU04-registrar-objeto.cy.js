import { MENSAJES } from '../../src/domain/mensajes';

describe('HU04: Registrar un objeto hallado', () => {
    beforeEach(() => {
        cy.visitarComoAdmin('/admin/nuevo.html');
    });

    it('muestra las categorias del catalogo y los campos de quien encontro el objeto', () => {
        cy.get('#categoria').should('contain', 'Llaves');
        cy.get('#encontrado-nombre').should('be.visible');
        cy.get('#encontrado-celular').should('be.visible');
    });

    it('muestra un error si faltan la categoria o la descripcion', () => {
        cy.get('#registrar-button').click();

        cy.get('#error-mensaje').should('be.visible').and('have.text', MENSAJES.FALTA_CATEGORIA_DESCRIPCION);
    });

    it('muestra un error si falta un dato obligatorio del hallazgo', () => {
        cy.llenarObjetoHallado({ lugar: '' });
        cy.get('#registrar-button').click();

        cy.get('#error-mensaje').should('be.visible').and('have.text', MENSAJES.FALTAN_DATOS_HALLAZGO);
    });

    it('muestra un error si la fecha de hallazgo es futura', () => {
        cy.llenarObjetoHallado({ fecha: '2030-01-01' });
        cy.get('#registrar-button').click();

        cy.get('#error-mensaje').should('be.visible').and('have.text', MENSAJES.FECHA_FUTURA);
    });

    it('el contador muestra los caracteres escritos sobre el limite de 500', () => {
        cy.get('#descripcion').type('Llaves');

        cy.get('#contador-caracteres').should('have.text', '6 / 500');
    });

    it('registra el objeto correctamente y muestra el mensaje de exito', () => {
        cy.llenarObjetoHallado();
        cy.get('#registrar-button').click();

        cy.get('#exito-mensaje').should('be.visible').and('have.text', MENSAJES.AVISO_PUBLICADO);
    });

    describe('despues de registrar un objeto', () => {
        beforeEach(() => {
            cy.llenarObjetoHallado();
            cy.get('#registrar-button').click();
            cy.get('#exito-mensaje').should('be.visible');
        });

        it('aparece en la lista del administrador con el siguiente numero correlativo', () => {
            cy.contains('a', 'Volver al panel').click();

            cy.get('#fila-objeto-6').should('contain', 'Llaves');
            cy.get('#fila-objeto-6 .tabla__numero').should('have.text', '6');
        });

        it('aparece en el listado publico sin los datos de quien lo encontro', () => {
            cy.visit('/index.html');

            cy.get('#objeto-6').should('contain', 'Llaves');
            cy.get('#listado').should('not.contain', 'Carla Rojas');
            cy.get('#listado').should('not.contain', '70011111');
        });

        it('muestra la foto del objeto en el panel y en el listado publico', () => {
            cy.contains('a', 'Volver al panel').click();
            cy.get('#fila-objeto-6 .tabla__foto').should('have.attr', 'src').and('match', /^data:image/);

            cy.visit('/index.html');
            cy.get('#objeto-6 .tarjeta-objeto__foto').should('have.attr', 'src').and('match', /^data:image/);
        });
    });
});
