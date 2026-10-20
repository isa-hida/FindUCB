import { filtrarPublicados } from '../../domain/listaAdmin';
export class ObjetosRepositoryEnMemoria {
    constructor({ objetos = [] } = {}) {
        this.objetos = objetos;
    }

    async listarParaAdmin() {
        return [...this.objetos];
    }
    async listarPublicados() {
        return filtrarPublicados(this.objetos);
    }
    async obtenerPorId(id) {
        const objeto = this.objetos.find((o) => o.id === id);
        return objeto || null;
    }
}