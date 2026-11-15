import { objetosRepository } from '../services/index.js';
import { HistorialEntregasVista } from '../views/HistorialEntregasVista.js';
import { HistorialEntregasPresenter } from '../presenters/HistorialEntregasPresenter.js';

const vista = new HistorialEntregasVista(document);
const presenter = new HistorialEntregasPresenter(vista, objetosRepository);

presenter.cargar();