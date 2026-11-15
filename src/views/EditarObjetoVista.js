/* global URL, FormData, FileReader */
import { MAX_CARACTERES_TEXTO } from '../domain/limites.js';

export class EditarObjetoVista {
    constructor(documento) {
        this.documento = documento;
        this.formulario = documento.getElementById('editar-objeto-form');
        this.campoNumero = documento.getElementById('numero');
        this.selectCategoria = documento.getElementById('categoria');
        this.campoLugar = documento.getElementById('lugar');
        this.campoFecha = documento.getElementById('fecha-hallazgo');
        this.campoColor = documento.getElementById('color');
        this.campoMarca = documento.getElementById('marca');
        this.campoDescripcion = documento.getElementById('descripcion');
        this.campoSenas = documento.getElementById('senas');
        this.campoNombre = documento.getElementById('encontrado-nombre');
        this.campoCelular = documento.getElementById('encontrado-celular');
        this.fotoInput = documento.getElementById('foto-input');
        this.previewImagen = documento.getElementById('foto-preview');
        this.contadorCaracteres = documento.getElementById('contador-caracteres');
        this.cajaError = documento.getElementById('error-mensaje');
        this.cajaExito = documento.getElementById('exito-mensaje');
        this.cajaNoEncontrado = documento.getElementById('mensaje-no-encontrado');
        this.rutaFotoNueva = '';
        this.fotoContenidoNueva = '';

        this._inicializarEventos();
    }

    _inicializarEventos() {
        this.fotoInput.addEventListener('change', (e) => {
            const archivo = e.target.files[0];
            if (!archivo) {
                this.rutaFotoNueva = '';
                this.fotoContenidoNueva = '';
                return;
            }
            this.rutaFotoNueva = archivo.name;
            this._leerContenido(archivo).then((contenido) => {
                this.fotoContenidoNueva = contenido;
            });
            this.previewImagen.src = URL.createObjectURL(archivo);
            this.previewImagen.hidden = false;
        });

        this.campoDescripcion.addEventListener('input', () => {
            this._mostrarContador(this.campoDescripcion.value.length);
        });
    }

    mostrarCategorias(categorias) {
        categorias.forEach((categoria) => {
            const opcion = this.documento.createElement('option');
            opcion.value = categoria;
            opcion.textContent = categoria;
            this.selectCategoria.appendChild(opcion);
        });
    }

    mostrarFormulario(datos) {
        this.cajaNoEncontrado.hidden = true;
        this.formulario.hidden = false;
        this.campoNumero.value = datos.numero;
        this.selectCategoria.value = datos.categoria;
        this.campoLugar.value = datos.lugar;
        this.campoFecha.value = datos.fechaHallazgo;
        this.campoColor.value = datos.color;
        this.campoMarca.value = datos.marca ?? '';
        this.campoDescripcion.value = datos.descripcion;
        this.campoSenas.value = datos.senas ?? '';
        this.campoNombre.value = datos.encontradoPor.nombre;
        this.campoCelular.value = datos.encontradoPor.celular;
        this.previewImagen.src = datos.fotoUrl;
        this.previewImagen.hidden = false;
        this._mostrarContador(datos.descripcion.length);
    }

    mostrarNoEncontrado(mensaje) {
        this.formulario.hidden = true;
        this.cajaNoEncontrado.textContent = mensaje;
        this.cajaNoEncontrado.hidden = false;
    }

    alEnviar(callback) {
        this.formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(this.formulario);
            callback({
                categoria: formData.get('categoria'),
                descripcion: formData.get('descripcion'),
                senas: formData.get('senas'),
                fechaHallazgo: formData.get('fechaHallazgo'),
                lugar: formData.get('lugar'),
                color: formData.get('color'),
                marca: formData.get('marca'),
                rutaFoto: this.rutaFotoNueva,
                fotoContenido: this.fotoContenidoNueva,
                encontradoPor: {
                    nombre: formData.get('encontradoNombre'),
                    celular: formData.get('encontradoCelular'),
                },
            });
        });
    }

    limpiarError() {
        this.cajaError.textContent = '';
        this.cajaError.hidden = true;
        this.cajaExito.textContent = '';
        this.cajaExito.hidden = true;
    }

    mostrarError(mensaje) {
        this.cajaError.textContent = mensaje;
        this.cajaError.hidden = false;
        this.cajaExito.hidden = true;
    }

    mostrarExito(mensaje) {
        this.cajaExito.textContent = mensaje;
        this.cajaExito.hidden = false;
        this.cajaError.hidden = true;
        this.rutaFotoNueva = '';
        this.fotoContenidoNueva = '';
        this.fotoInput.value = '';
    }

    _mostrarContador(longitud) {
        this.contadorCaracteres.textContent = `${longitud} / ${MAX_CARACTERES_TEXTO}`;
    }

    _leerContenido(archivo) {
        return new Promise((resolver) => {
            const lector = new FileReader();
            lector.onload = () => resolver(lector.result);
            lector.onerror = () => resolver('');
            lector.readAsDataURL(archivo);
        });
    }
}