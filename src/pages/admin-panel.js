import { objetosRepository, fotosStorage } from '../services/index.js';
import { ListaObjetosAdminVista } from '../views/ListaObjetosAdminVista.js';
import { ListaObjetosAdminPresenter } from '../presenters/ListaObjetosAdminPresenter.js';

const vista = new ListaObjetosAdminVista(document);
const presenter = new ListaObjetosAdminPresenter(vista, objetosRepository, fotosStorage);

const btnNuevo = document.getElementById('nuevo-aviso-btn');
if (btnNuevo) {
    btnNuevo.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.assign('./nuevo.html');
    });
}

presenter.cargar();