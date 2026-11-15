import { FotosEnMemoria } from './FotosEnMemoria';

const CONTENIDO = 'data:image/jpeg;base64,AAA';

describe('FotosEnMemoria - guardar', () => {
    it('devuelve una ruta cuya url es el contenido guardado', async () => {
        const fotos = new FotosEnMemoria();

        const ruta = await fotos.guardar('llaves.jpg', CONTENIDO);

        expect(ruta).toMatch(/llaves\.jpg$/);
        expect(await fotos.urlsFirmadas([ruta])).toEqual([CONTENIDO]);
    });

    it('da rutas distintas a fotos con el mismo nombre', async () => {
        const fotos = new FotosEnMemoria();

        const primera = await fotos.guardar('llaves.jpg', CONTENIDO);
        const segunda = await fotos.guardar('llaves.jpg', 'data:image/jpeg;base64,BBB');

        expect(primera).not.toEqual(segunda);
        expect(await fotos.urlsFirmadas([primera, segunda])).toEqual([CONTENIDO, 'data:image/jpeg;base64,BBB']);
    });
});