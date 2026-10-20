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
        if (!objeto || objeto.estado !== 'publicado') {
            return null;
        }
        return objeto;
    }
    async registrarEntrega(objetoId, entrega) {
        this.objetos = this.objetos.map((o) => (
            o.id === objetoId ? { ...o, estado: 'entregado', entrega } : o
        ));
    }
}