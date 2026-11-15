import { objetosRepository, fotosStorage } from '../services/index.js';
import { AuthEnMemoria } from '../services/memoria/AuthEnMemoria.js';
import { EditarObjetoVista } from '../views/EditarObjetoVista.js';
import { EditarObjetoPresenter } from '../presenters/EditarObjetoPresenter.js';
import { SesionAdminPresenter } from '../presenters/SesionAdminPresenter.js';

const vistaSesion = {
    redirigir(url) {
        window.location.assign(url);
    },
    reemplazar(url) {
        window.location.replace(url);
    },
};
new SesionAdminPresenter(vistaSesion, new AuthEnMemoria()).verificarAcceso();

const vista = new EditarObjetoVista(document);
const presenter = new EditarObjetoPresenter(vista, objetosRepository, fotosStorage);

const coincidencia = window.location.search.match(/[?&]id=(\d+)/);
const objetoId = coincidencia ? Number(coincidencia[1]) : 0;

vista.alEnviar((datos) => presenter.guardar(datos));
presenter.iniciar(objetoId);