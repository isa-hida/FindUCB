export class ListadoPublicoVista {
    constructor(documento) {
        this.documento = documento;
        this.contenedor = documento.getElementById('listado');
        this.mensajeVacio = documento.getElementById('sin-objetos-mensaje');
    }

    mostrarVacio(mensaje) {
        this.contenedor.replaceChildren();
        this.mensajeVacio.textContent = mensaje;
        this.mensajeVacio.hidden = false;
    }

    mostrarTarjetas(tarjetas) {
        this.mensajeVacio.textContent = '';
        this.mensajeVacio.hidden = true;
        this.contenedor.replaceChildren(...tarjetas.map((tarjeta) => this.crearTarjeta(tarjeta)));
    }

    crearTarjeta(tarjeta) {
        const enlace = this.documento.createElement('a');
        enlace.id = `objeto-${tarjeta.id}`;
        enlace.className = 'tarjeta-objeto';
        enlace.href = tarjeta.url;

        const foto = this.documento.createElement('img');
        foto.className = 'tarjeta-objeto__foto';
        foto.src = tarjeta.fotoUrl;
        foto.alt = tarjeta.categoria;
        foto.loading = 'lazy';

        const cuerpo = this.documento.createElement('div');
        cuerpo.className = 'tarjeta-objeto__cuerpo';

        const categoria = this.documento.createElement('h2');
        categoria.className = 'tarjeta-objeto__categoria';
        categoria.textContent = tarjeta.categoria;

        const fecha = this.documento.createElement('time');
        fecha.className = 'tarjeta-objeto__fecha';
        fecha.dateTime = tarjeta.fechaHallazgo;
        fecha.textContent = tarjeta.fechaTexto;

        cuerpo.append(categoria, fecha);
        enlace.append(foto, cuerpo);
        return enlace;
    }
}
