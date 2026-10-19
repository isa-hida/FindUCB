import { objetosRepository, fotosStorage } from '../services/index.js';
import { DetalleObjetoVista } from '../views/DetalleObjetoVista.js';
import { DetalleObjetoPresenter } from '../presenters/DetalleObjetoPresenter.js';

const vista = new DetalleObjetoVista(document);
const presenter = new DetalleObjetoPresenter(vista, objetosRepository, fotosStorage);

presenter.cargar(vista.idSolicitado());
