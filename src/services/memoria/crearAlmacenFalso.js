export const crearAlmacenFalso = () => ({
    datos: {},
    getItem(clave) {
        return this.datos[clave] === undefined ? null : this.datos[clave];
    },
    setItem(clave, valor) {
        this.datos[clave] = valor;
    },
});