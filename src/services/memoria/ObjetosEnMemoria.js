const CLAVE_ALMACEN = 'findu.objetos';

export class ObjetosEnMemoria {
    constructor({ objetos = [], almacen = null } = {}) {
        this.almacen = almacen;
        const guardados = almacen ? almacen.getItem(CLAVE_ALMACEN) : null;
        this.objetos = guardados ? JSON.parse(guardados) : objetos;
    }

    async listarParaAdmin() {
        return [...this.objetos];
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
        this.guardar();
        return objetoRegistrado;
    }

    async registrarEntrega(objetoId, entrega) {
        this.objetos = this.objetos.map((objeto) => (
            String(objeto.id) === String(objetoId)
                ? { ...objeto, estado: 'entregado', entrega }
                : objeto
        ));
        this.guardar();
    }

    guardar() {
        if (this.almacen) {
            this.almacen.setItem(CLAVE_ALMACEN, JSON.stringify(this.objetos));
        }
    }
}