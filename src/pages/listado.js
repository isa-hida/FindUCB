import { objetosRepository, fotosStorage, auth } from '../services/index.js';
import { ListadoPublicoVista } from '../views/ListadoPublicoVista.js';
import { ListadoPublicoPresenter } from '../presenters/ListadoPublicoPresenter.js';

async function inicializarPagina() {
    const usuario = await auth.obtenerUsuario();

    if (!usuario) {
        window.location.href = './login.html';
        return;
    }

    const vista = new ListadoPublicoVista(document);
    const presenter = new ListadoPublicoPresenter(vista, objetosRepository, fotosStorage);

    vista.alFiltrar((filtros) => presenter.filtrar(filtros));
    vista.alLimpiarFiltros(() => presenter.limpiarFiltros());

    await presenter.cargar();
}

inicializarPagina();