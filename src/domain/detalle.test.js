import { prepararDetalle } from './detalle';

describe('prepararDetalle', () => {
    it('deja solo los datos publicos del objeto', () => {
        const objeto = {
            id: 7,
            numero: 7,
            fechaHallazgo: '2026-10-10',
            lugar: 'Biblioteca',
            categoria: 'Mochilas y bolsos',
            color: 'Negro',
            marca: 'Totto',
            descripcion: 'Mochila con cierre roto',
            senas: 'Llavero de llama',
            fotoPath: 'objetos/7.jpg',
            estado: 'publicado',
            encontradoPor: { nombre: 'Juan Perez', celular: '70000000' },
            entrega: { nombre: 'Maria Lopez', ci: '1234567', celular: '71111111', fecha: '2026-10-12' },
        };

        expect(prepararDetalle(objeto)).toEqual({
            numero: 7,
            fechaHallazgo: '2026-10-10',
            lugar: 'Biblioteca',
            categoria: 'Mochilas y bolsos',
            color: 'Negro',
            marca: 'Totto',
            descripcion: 'Mochila con cierre roto',
            senas: 'Llavero de llama',
            fotoPath: 'objetos/7.jpg',
        });
    });
});
