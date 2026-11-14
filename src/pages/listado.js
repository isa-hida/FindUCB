import { objetosRepository, fotosStorage, autenticacion } from '../services/index.js';
import { ListadoPublicoVista } from '../views/ListadoPublicoVista.js';
import { ListadoPublicoPresenter } from '../presenters/ListadoPublicoPresenter.js';
import { SesionComunidadPresenter } from '../presenters/SesionComunidadPresenter.js';

async function inicializarPagina() {
    const auth = autenticacion;
    const vistaSesion = {
        redirigir(url) {
            window.location.assign(url);
        },
        reemplazar(url) {
            window.location.replace(url);
        },
    };
    const sesionPresenter = new SesionComunidadPresenter(vistaSesion, auth);

    await sesionPresenter.verificarAcceso();

    const botonCerrarSesion = document.getElementById('cerrar-sesion-btn');
    if (botonCerrarSesion) {
        botonCerrarSesion.replaceWith(botonCerrarSesion.cloneNode(true));
        const botonActualizado = document.getElementById('cerrar-sesion-btn');
        
        botonActualizado.addEventListener('click', async (e) => {
            e.preventDefault();
            await sesionPresenter.cerrarSesion();
        });
    }

    const vista = new ListadoPublicoVista(document);
    const presenter = new ListadoPublicoPresenter(vista, objetosRepository, fotosStorage);

    vista.alFiltrar((filtros) => presenter.filtrar(filtros));
    vista.alLimpiarFiltros(() => presenter.limpiarFiltros());

    await presenter.cargar();
}

inicializarPagina();