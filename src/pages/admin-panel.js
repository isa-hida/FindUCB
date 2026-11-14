import { objetosRepository, fotosStorage } from '../services/index.js';
import { AuthEnMemoria } from '../services/memoria/AuthEnMemoria.js';
import { ListaObjetosAdminVista } from '../views/ListaObjetosAdminVista.js';
import { ListaObjetosAdminPresenter } from '../presenters/ListaObjetosAdminPresenter.js';
import { SesionAdminPresenter } from '../presenters/SesionAdminPresenter.js';

const auth = new AuthEnMemoria();
const vistaSesion = {
    redirigir(url) {
        window.location.assign(url);
    },
}; 

const sesionPresenter = new SesionAdminPresenter(vistaSesion, auth);

sesionPresenter.verificarAcceso();

const botonCerrarSesion = document.getElementById('cerrar-sesion-btn');
if (botonCerrarSesion) {
    botonCerrarSesion.addEventListener('click', (e) => {
        e.preventDefault();
        sesionPresenter.cerrarSesion();
    });
}

const vista = new ListaObjetosAdminVista(document);
const presenter = new ListaObjetosAdminPresenter(vista, objetosRepository, fotosStorage);

const botonNuevoAviso = document.getElementById('nuevo-aviso-btn');
if (botonNuevoAviso) {
    botonNuevoAviso.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.assign('./nuevo.html');
    });
}

presenter.cargar();