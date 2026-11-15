const CLAVE_ALMACEN = 'findu.fotos';

export class FotosEnMemoria {
    constructor({ urls = {}, almacen = null } = {}) {
        this.almacen = almacen;
        const guardadas = almacen ? almacen.getItem(CLAVE_ALMACEN) : null;
        this.subidas = guardadas ? JSON.parse(guardadas) : {};
        this.urls = { ...urls, ...this.subidas };
    }

    async urlsFirmadas(paths) {
        return paths.map((path) => this.urls[path]);
    }

    async guardar(nombre, contenido) {
        const ruta = `subidas/${Object.keys(this.subidas).length + 1}-${nombre}`;
        this.subidas[ruta] = contenido;
        this.urls[ruta] = contenido;
        this._persistir();
        return ruta;
    }

    _persistir() {
        if (this.almacen) {
            this.almacen.setItem(CLAVE_ALMACEN, JSON.stringify(this.subidas));
        }
    }
}