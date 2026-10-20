import { AuthEnMemoria } from './memoria/AuthEnMemoria';

import { ObjetosRepositoryEnMemoria } from './memoria/ObjetosRepositoryEnMemoria';
import { FotosStorageEnMemoria } from './memoria/FotosStorageEnMemoria';
export const auth = new AuthEnMemoria({
    cuentas: [
        { correo: 'admin@ucb.edu.bo', password: 'Admin123' },
        { correo: 'estudiante@ucb.edu.bo', password: 'Estudiante123' },
    ],
    administradores: ['admin@ucb.edu.bo'],
});

export const objetosRepository = new ObjetosRepositoryEnMemoria({
    almacen: window.localStorage,
    objetos: [
        {
            id: 1,
            numero: 1,
            fechaHallazgo: '2026-10-01',
            lugar: 'Biblioteca',
            categoria: 'Billetera',
            color: 'Negro',
            marca: '',
            descripcion: 'Billetera de cuero',
            senas: '',
            fotoPath: 'fotos/1.jpg',
            estado: 'publicado',
        },
        {
            id: 2,
            numero: 2,
            fechaHallazgo: '2026-10-03',
            lugar: 'Cafetería',
            categoria: 'Llaves',
            color: 'Plateado',
            marca: '',
            descripcion: 'Llavero con tres llaves',
            senas: '',
            fotoPath: 'fotos/2.jpg',
            estado: 'publicado',
        },
        {
            id: 3,
            numero: 3,
            fechaHallazgo: '2026-10-05',
            lugar: 'Aula 204',
            categoria: 'Audífonos',
            color: 'Blanco',
            marca: '',
            descripcion: 'Audífonos inalámbricos',
            senas: '',
            fotoPath: 'fotos/3.jpg',
            estado: 'entregado',
        },
    ],
});

export const fotosStorage = new FotosStorageEnMemoria();