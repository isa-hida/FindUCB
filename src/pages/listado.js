import { objetosRepository, fotosStorage } from '../services/index.js';
import { ListadoPublicoVista } from '../views/ListadoPublicoVista.js';
import { ListadoPublicoPresenter } from '../presenters/ListadoPublicoPresenter.js';

const vista = new ListadoPublicoVista(document);
const presenter = new ListadoPublicoPresenter(vista, objetosRepository, fotosStorage);

vista.alFiltrar((filtros) => presenter.filtrar(filtros));
vista.alLimpiarFiltros(() => presenter.limpiarFiltros());

presenter.cargar();
