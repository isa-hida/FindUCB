import { AuthEnMemoria } from './memoria/AuthEnMemoria';

export const auth = new AuthEnMemoria({
    cuentas: [
        { correo: 'admin@ucb.edu.bo', password: 'Admin123' },
        { correo: 'estudiante@ucb.edu.bo', password: 'Estudiante123' },
    ],
    administradores: ['admin@ucb.edu.bo'],
});