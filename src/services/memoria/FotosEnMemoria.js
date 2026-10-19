export class FotosEnMemoria {
    constructor({ urls = {} } = {}) {
        this.urls = urls;
    }

    async urlsFirmadas(paths) {
        return paths.map((path) => this.urls[path]);
    }
}
