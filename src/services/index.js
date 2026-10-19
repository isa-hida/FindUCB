import { AuthEnMemoria } from './memoria/AuthEnMemoria';
import { ObjetosEnMemoria } from './memoria/ObjetosEnMemoria';
import { FotosEnMemoria } from './memoria/FotosEnMemoria';
import fotoCelular from 'url:../assets/ejemplos/celular.svg';
import fotoMochila from 'url:../assets/ejemplos/mochila.svg';
import fotoLlaves from 'url:../assets/ejemplos/llaves.svg';
import fotoTermo from 'url:../assets/ejemplos/termo.svg';
import fotoCuaderno from 'url:../assets/ejemplos/cuaderno.svg';

export const auth = new AuthEnMemoria({
    cuentas: [
        { correo: 'admin@ucb.edu.bo', password: 'Admin123' },
        { correo: 'estudiante@ucb.edu.bo', password: 'Estudiante123' },
    ],
    administradores: ['admin@ucb.edu.bo'],
});

export const objetosRepository = new ObjetosEnMemoria({
    objetos: [
        {
            id: 1,
            numero: 1,
            fechaHallazgo: '2026-10-02',
            lugar: 'Biblioteca',
            categoria: 'Electrónicos',
            color: 'Negro',
            marca: 'Samsung',
            descripcion: 'Celular con funda transparente',
            senas: 'Pantalla con una raya en la esquina superior',
            fotoPath: 'ejemplos/celular.svg',
            estado: 'publicado',
            encontradoPor: { nombre: 'Carla Rojas', celular: '70011111' },
        },
        {
            id: 2,
            numero: 2,
            fechaHallazgo: '2026-10-10',
            lugar: 'Cafetería',
            categoria: 'Mochilas y bolsos',
            color: 'Azul',
            marca: 'Totto',
            descripcion: 'Mochila con dos bolsillos',
            senas: 'Cierre dorado en el bolsillo delantero',
            fotoPath: 'ejemplos/mochila.svg',
            estado: 'publicado',
            encontradoPor: { nombre: 'Luis Vargas', celular: '70022222' },
        },
        {
            id: 3,
            numero: 3,
            fechaHallazgo: '2026-10-14',
            lugar: 'Estacionamiento',
            categoria: 'Llaves',
            color: 'Dorado',
            marca: '',
            descripcion: 'Dos llaves en un llavero de argolla',
            senas: 'Una llave dorada y una plateada',
            fotoPath: 'ejemplos/llaves.svg',
            estado: 'publicado',
            encontradoPor: { nombre: 'Ana Quispe', celular: '70033333' },
        },
        {
            id: 4,
            numero: 4,
            fechaHallazgo: '2026-10-14',
            lugar: 'Coliseo',
            categoria: 'Botellas y termos',
            color: 'Rojo',
            marca: 'Stanley',
            descripcion: 'Termo de acero',
            senas: 'Tapa negra con un raspón',
            fotoPath: 'ejemplos/termo.svg',
            estado: 'publicado',
            encontradoPor: { nombre: 'Jorge Mamani', celular: '70044444' },
        },
        {
            id: 5,
            numero: 5,
            fechaHallazgo: '2026-10-16',
            lugar: 'Aula 204',
            categoria: 'Útiles',
            color: 'Verde',
            marca: 'Norma',
            descripcion: 'Cuaderno de tapa dura',
            senas: 'Nombre borrado en la etiqueta',
            fotoPath: 'ejemplos/cuaderno.svg',
            estado: 'entregado',
            encontradoPor: { nombre: 'Rosa Flores', celular: '70055555' },
            entrega: { nombre: 'Pedro Gutiérrez', ci: '1234567', celular: '70066666', fecha: '2026-10-17' },
        },
    ],
});

export const fotosStorage = new FotosEnMemoria({
    urls: {
        'ejemplos/celular.svg': fotoCelular,
        'ejemplos/mochila.svg': fotoMochila,
        'ejemplos/llaves.svg': fotoLlaves,
        'ejemplos/termo.svg': fotoTermo,
        'ejemplos/cuaderno.svg': fotoCuaderno,
    },
});
