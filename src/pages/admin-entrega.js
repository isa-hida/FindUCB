import { objetosRepository } from '../services/index.js';
import { RegistrarEntregaVista } from '../views/RegistrarEntregaVista.js';
import { RegistrarEntregaPresenter } from '../presenters/RegistrarEntregaPresenter.js';

const vista = new RegistrarEntregaVista(document);
const presenter = new RegistrarEntregaPresenter(vista, objetosRepository);

const coincidencia = window.location.search.match(/[?&]id=(\d+)/);
const objetoId = coincidencia ? Number(coincidencia[1]) : 0;

vista.alEnviar((datos) => presenter.confirmar(datos));
vista.alCancelar(() => presenter.cancelar());

presenter.cargar(objetoId);