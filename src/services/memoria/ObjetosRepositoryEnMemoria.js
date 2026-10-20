import { filtrarPublicados } from '../../domain/listaAdmin';

const CLAVE_ALMACEN = 'findu.objetos';

export class ObjetosRepositoryEnMemoria {
    constructor({ objetos = [], almacen = null } = {}) {
        this.almacen = almacen;
        const guardados = almacen ? almacen.getItem(CLAVE_ALMACEN) : null;
        this.objetos = guardados ? JSON.parse(guardados) : objetos;
    }

    async listarParaAdmin() {
        return [...this.objetos];
    }
    async listarPublicados() {
        return filtrarPublicados(this.objetos);
    }
    async obtenerPorId(id) {
        const objeto = this.objetos.find((o) => o.id === id);
        if (!objeto || objeto.estado !== 'publicado') {
            return null;
        }
        return objeto;
    }
    async registrarEntrega(objetoId, entrega) {
        this.objetos = this.objetos.map((o) => (
            o.id === objetoId ? { ...o, estado: 'entregado', entrega } : o
        ));
        this.guardar();
    }
    guardar() {
        if (this.almacen) {
            this.almacen.setItem(CLAVE_ALMACEN, JSON.stringify(this.objetos));
        }
    }
}