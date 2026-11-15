import { objetosRepository, fotosStorage } from '../services/index.js';
import { RegistrarObjetoVista } from '../views/RegistrarObjetoVista.js';
import { RegistrarObjetoPresenter } from '../presenters/RegistrarObjetoPresenter.js';

const vista = new RegistrarObjetoVista(document);
const presenter = new RegistrarObjetoPresenter(vista, objetosRepository, fotosStorage);

vista.alEnviar((datos) => presenter.registrar(datos));
presenter.iniciar();