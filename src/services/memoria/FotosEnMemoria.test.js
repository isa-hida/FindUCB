import { FotosEnMemoria } from './FotosEnMemoria';
import { crearAlmacenFalso } from './crearAlmacenFalso';

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
    describe('FotosEnMemoria - persistencia en almacen', () => {
        it('recuerda una foto guardada en otra instancia que use el mismo almacen', async () => {
            const almacen = crearAlmacenFalso();
            const primera = new FotosEnMemoria({ almacen });
            const ruta = await primera.guardar('llaves.jpg', CONTENIDO);

            const segunda = new FotosEnMemoria({ almacen });

            expect(await segunda.urlsFirmadas([ruta])).toEqual([CONTENIDO]);
        });
    });
});