export class ObjetosRepositoryEnMemoria {
    constructor({ objetos = [] } = {}) {
        this.objetos = objetos;
    }

    async listarParaAdmin() {
        return [...this.objetos];
    }
}