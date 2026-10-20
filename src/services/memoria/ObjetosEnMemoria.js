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

    async registrar(datos) {
        const ids = this.objetos.map((o) => Number(o.id) || 0);
        const numeros = this.objetos.map((o) => Number(o.numero) || 0);
        const nuevoId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
        const nuevoNumero = numeros.length > 0 ? Math.max(...numeros) + 1 : 1;

        const objetoRegistrado = {
            id: nuevoId,
            numero: nuevoNumero,
            estado: 'publicado',
            ...datos,
        };

        this.objetos.push(objetoRegistrado);
        return objetoRegistrado;
    }
}
