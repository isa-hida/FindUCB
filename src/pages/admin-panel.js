import { objetosRepository, fotosStorage } from '../services/index.js';
import { ListaObjetosAdminVista } from '../views/ListaObjetosAdminVista.js';
import { ListaObjetosAdminPresenter } from '../presenters/ListaObjetosAdminPresenter.js';

const vista = new ListaObjetosAdminVista(document);
const presenter = new ListaObjetosAdminPresenter(vista, objetosRepository, fotosStorage);

presenter.cargar();