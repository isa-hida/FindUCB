export class ListaObjetosAdminVista {
    constructor(documento) {
        this.tabla = documento.getElementById('tabla-objetos');
        this.cuerpoTabla = documento.getElementById('lista-objetos');
        this.plantillaFila = documento.getElementById('plantilla-fila');
        this.cajaVacia = documento.getElementById('mensaje-vacio');
    }

    mostrarFilas(filas) {
        this.cuerpoTabla.textContent = '';
        this.cajaVacia.hidden = true;
        this.tabla.hidden = filas.length === 0;
        filas.forEach((fila) => {
            this.cuerpoTabla.appendChild(this.crearFila(fila));
        });
    }

    mostrarMensajeVacio(mensaje) {
        this.cajaVacia.textContent = mensaje;
        this.cajaVacia.hidden = false;
    }

    crearFila(fila) {
        const nodo = this.plantillaFila.content.firstElementChild.cloneNode(true);
        nodo.id = `fila-objeto-${fila.id}`;
        nodo.querySelector('.tabla__numero').textContent = fila.numero;
        nodo.querySelector('.tabla__categoria').textContent = fila.categoria;
        nodo.querySelector('.tabla__fecha').textContent = fila.fechaHallazgo;

        const foto = nodo.querySelector('.tabla__foto');
        foto.src = fila.fotoUrl;
        foto.alt = fila.categoria;

        const enlace = nodo.querySelector('.tabla__enlace');
        enlace.id = `entrega-link-${fila.id}`;
        enlace.href = fila.urlEntrega;

        return nodo;
    }
}