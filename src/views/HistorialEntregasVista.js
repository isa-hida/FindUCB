export class HistorialEntregasVista {
    constructor(documento) {
        this.tabla = documento.getElementById('tabla-historial');
        this.cuerpoTabla = documento.getElementById('lista-historial');
        this.plantillaFila = documento.getElementById('plantilla-fila-historial');
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
        nodo.id = `fila-historial-${fila.id}`;
        nodo.querySelector('.historial__numero').textContent = fila.numero;
        nodo.querySelector('.historial__categoria').textContent = fila.categoria;
        nodo.querySelector('.historial__receptor').textContent = fila.nombreReceptor;
        nodo.querySelector('.historial__fecha').textContent = fila.fechaEntrega;
        return nodo;
    }
}