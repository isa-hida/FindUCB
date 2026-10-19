export class ObjetosEnMemoria {
    constructor({ objetos = [] } = {}) {
        this.objetos = objetos;
    }

    async listarPublicados() {
        return this.objetos.filter((objeto) => objeto.estado === 'publicado');
    }

    async obtenerPorId(id) {
        const objeto = this.objetos.find((candidato) => String(candidato.id) === String(id));
        if (!objeto || objeto.estado !== 'publicado') {
            return null;
        }
        return objeto;
    }
}
