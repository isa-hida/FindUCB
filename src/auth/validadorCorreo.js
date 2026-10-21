export const DOMINIO_INSTITUCIONAL = 'ucb.edu.bo';

export function esCorreoInstitucional(correo) {
  if (typeof correo !== 'string') {
    return false;
  }
  return correo.trim().toLowerCase().endsWith(`@${DOMINIO_INSTITUCIONAL}`);
}