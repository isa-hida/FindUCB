export class ObjetosEnMemoria {
    constructor({ objetos = [] } = {}) {
        this.objetos = objetos;
    }

    async listarPublicados() {
        return this.objetos.filter((objeto) => objeto.estado === 'publicado');
    }
}
