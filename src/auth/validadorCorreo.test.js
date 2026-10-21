import { esCorreoInstitucional } from './validadorCorreo.js';

describe('esCorreoInstitucional', () => {
  it('acepta un correo valido de la UCB', () => {
    expect(esCorreoInstitucional('juan.perez@ucb.edu.bo')).toBe(true);
  });

});