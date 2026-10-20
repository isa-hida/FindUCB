export class DetalleObjetoVista {
    constructor(documento) {
        this.documento = documento;
        this.ficha = documento.getElementById('detalle');
        this.mensajeNoEncontrado = documento.getElementById('no-encontrado-mensaje');
        this.foto = documento.getElementById('detalle-foto');
        this.fecha = documento.getElementById('detalle-fecha');
        this.filaMarca = documento.getElementById('fila-marca');
    }

    idSolicitado() {
        return new window.URLSearchParams(window.location.search).get('id');
    }

    mostrarDetalle(detalle) {
        this.escribir('detalle-numero', detalle.numero);
        this.escribir('detalle-categoria', detalle.categoria);
        this.escribir('detalle-color', detalle.color);
        this.escribir('detalle-marca', detalle.marca);
        this.escribir('detalle-descripcion', detalle.descripcion);
        this.escribir('detalle-senas', detalle.senas);
        this.escribir('detalle-lugar', detalle.lugar);
        this.fecha.dateTime = detalle.fechaHallazgo;
        this.fecha.textContent = detalle.fechaTexto;
        this.filaMarca.hidden = !detalle.marca;
        this.foto.src = detalle.fotoUrl;
        this.foto.alt = detalle.categoria;
        this.mensajeNoEncontrado.hidden = true;
        this.ficha.hidden = false;
    }

    mostrarNoEncontrado(mensaje) {
        this.ficha.hidden = true;
        this.mensajeNoEncontrado.textContent = mensaje;
        this.mensajeNoEncontrado.hidden = false;
    }

    escribir(id, texto) {
        this.documento.getElementById(id).textContent = texto;
    }
}
