export class FotosStorageEnMemoria {
    async urlsFirmadas(paths) {
        return paths.map((path) => `memoria/${path}`);
    }
}