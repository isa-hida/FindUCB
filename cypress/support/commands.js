const SESION_ADMIN = JSON.stringify({ correo: 'admin@ucb.edu.bo', esAdmin: true });

const DATOS_BASE = {
    categoria: 'Llaves',
    descripcion: 'Llaves de oficina',
    senas: 'Llavero azul',
    fecha: '2026-10-18',
    lugar: 'Biblioteca',
    color: 'Plateado',
    nombre: 'Carla Rojas',
    celular: '70011111',
    foto: 'llaves.jpg',
};

Cypress.Commands.add('visitarComoAdmin', (ruta) => {
    cy.visit(ruta, {
        onBeforeLoad: (ventana) => ventana.sessionStorage.setItem('usuario', SESION_ADMIN),
    });
});

// Llena el formulario de nuevo objeto con datos validos.
// Para omitir un campo, pasalo vacio: llenarObjetoHallado({ lugar: '' })
Cypress.Commands.add('llenarObjetoHallado', (cambios = {}) => {
    const datos = { ...DATOS_BASE, ...cambios };

    if (datos.categoria) cy.get('#categoria').select(datos.categoria);
    if (datos.descripcion) cy.get('#descripcion').type(datos.descripcion);
    if (datos.senas) cy.get('#senas').type(datos.senas);
    if (datos.fecha) cy.get('#fecha-hallazgo').type(datos.fecha);
    if (datos.lugar) cy.get('#lugar').type(datos.lugar);
    if (datos.color) cy.get('#color').type(datos.color);
    if (datos.nombre) cy.get('#encontrado-nombre').type(datos.nombre);
    if (datos.celular) cy.get('#encontrado-celular').type(datos.celular);
    if (datos.foto) {
        cy.get('#foto-input').selectFile({
            contents: Cypress.Buffer.from('contenido de prueba'),
            fileName: datos.foto,
            mimeType: 'image/jpeg',
        });
    }
});