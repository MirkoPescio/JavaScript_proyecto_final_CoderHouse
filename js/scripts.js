/*
Defino objetos y listas que pueda usar más adelante
*/

class producto {
    constructor(titulo, categoria, valor, formato) {
        this.titulo = titulo;
        this.categoria = categoria;
        this.valor = valor;
        this.formato = formato;
    }
}

function cargarProducto() {
    let productos = []
    // Ejemplos para cargar productos para una compra
    productos.push(new producto("Uncharted 4", "Aventura", 700, "Digital"));
    productos.push(new producto("Fifa 21", "Deportivo", 2500, "Físico"));
    return productos;
}

console.log(cargarProducto());