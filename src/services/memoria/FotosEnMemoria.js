export class FotosEnMemoria {
    constructor({ urls = {} } = {}) {
        this.urls = { ...urls };
        this.subidas = {};
    }

    async urlsFirmadas(paths) {
        return paths.map((path) => this.urls[path]);
    }

    async guardar(nombre, contenido) {
        const ruta = `subidas/${Object.keys(this.subidas).length + 1}-${nombre}`;
        this.subidas[ruta] = contenido;
        this.urls[ruta] = contenido;
        return ruta;
    }
}