import { objetosRepository,fotosStorage } from '../services/index.js';
import { AuthEnMemoria } from '../services/memoria/AuthEnMemoria.js';
import { HistorialEntregasVista } from '../views/HistorialEntregasVista.js';
import { HistorialEntregasPresenter } from '../presenters/HistorialEntregasPresenter.js';
import { SesionAdminPresenter } from '../presenters/SesionAdminPresenter.js';

const vistaSesion = {
    redirigir(url) {
        window.location.assign(url);
    },
};
const sesionPresenter = new SesionAdminPresenter(vistaSesion, new AuthEnMemoria());
sesionPresenter.verificarAcceso();

// Carga del historial
const vista = new HistorialEntregasVista(document);
const presenter = new HistorialEntregasPresenter(vista, objetosRepository, fotosStorage);

presenter.cargar();