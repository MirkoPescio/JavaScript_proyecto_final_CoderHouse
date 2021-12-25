/*
>> Consigna: codifica un script cuyas instrucciones permitan generar de forma
 dinámica una sección del HTML. Los valores que alimentan este proceso comprenden 
 un array de objetos, cuyos datos deberán incluirse empleando métodos del DOM y 
 elementos apropiados para su representación.

>>Aspectos a incluir en el entregable:
Archivo HTML y archivo JavaScript referenciado, que incluya la definición un array de objetos,
la declaración y llamada de una función que genere proceduralmente una sección del HTML.

>>Ejemplo de estructura HTML resultante:
    1) Generar títulos y párrafos a partir de un array de “Publicaciones”.
    2) Generar cards y botones a partir de un array de “Productos”.
    3) Generar imágenes y badges a partir de un array de “Personas”.

*/

const productoAgregado1 = [];
const productoAgregado2 = [];
const productoAgregado3 = [];
const productoAgregado4 = [];

class Producto {
    constructor (nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

let producto1 = document.getElementById("botonNuevos1");
producto1.addEventListener("click", agregarProducto1);

function agregarProducto1(e) {
    e.preventDefault();
    let nombreProducto1 = document.getElementById("nombreNuevos1").innerHTML;
    let precioProducto1 = document.getElementById("precioNuevos1").innerHTML;
    let contenidoProducto1 = document.getElementById("contenidoProducto1");
    productoAgregado1.push(new Producto(nombreProducto1, precioProducto1));
    let resultado1 = "Producto agregado: \n Nombre: " + productoAgregado1[0].nombre + "\n Precio: " + productoAgregado1[0].precio;
    console.log(resultado1);
    contenidoProducto1.innerHTML = resultado1;
}

let producto2 = document.getElementById("botonNuevos2");
producto2.addEventListener("click", agregarProducto2);

function agregarProducto2(e) {
    e.preventDefault();
    let nombreProducto2 = document.getElementById("nombreNuevos2").innerHTML;
    let precioProducto2 = document.getElementById("precioNuevos2").innerHTML;
    let contenidoProducto2 = document.getElementById("contenidoProducto2");
    productoAgregado2.push(new Producto(nombreProducto2, precioProducto2));
    let resultado2 = "Producto agregado: \n Nombre: " + productoAgregado2[0].nombre + "\n Precio: " + productoAgregado2[0].precio;
    console.log(resultado2);
    contenidoProducto2.innerHTML = resultado2;
}

let producto3 = document.getElementById("botonNuevos3");
producto3.addEventListener("click", agregarProducto3);

function agregarProducto3(e) {
    e.preventDefault();
    let nombreProducto3 = document.getElementById("nombreNuevos3").innerHTML;
    let precioProducto3 = document.getElementById("precioNuevos3").innerHTML;
    let contenidoProducto3 = document.getElementById("contenidoProducto3");
    productoAgregado3.push(new Producto(nombreProducto3, precioProducto3));
    let resultado3 = "Producto agregado: \n Nombre: " + productoAgregado3[0].nombre + "\n Precio: " + productoAgregado3[0].precio;
    console.log(resultado3);
    contenidoProducto3.innerHTML = resultado3;
}

let producto4 = document.getElementById("botonNuevos4");
producto4.addEventListener("click", agregarProducto4);

function agregarProducto4(e) {
    e.preventDefault();
    let nombreProducto4 = document.getElementById("nombreNuevos4").innerHTML;
    let precioProducto4 = document.getElementById("precioNuevos4").innerHTML;
    let contenidoProducto4 = document.getElementById("contenidoProducto4");
    productoAgregado4.push(new Producto(nombreProducto4, precioProducto4));
    resultado4 = "Producto agregado: \n Nombre: " + productoAgregado4[0].nombre + "\n Precio: " + productoAgregado4[0].precio;
    console.log(resultado4);
    contenidoProducto4.innerHTML = resultado4;
}