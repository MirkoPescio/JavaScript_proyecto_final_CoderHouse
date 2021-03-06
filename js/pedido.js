/*
 * @ version: v2.0.2
 * @ autor: Mirko Pescio
 * @ fecha: 27/12/2021
 * @ Descripción: 2da Preentrega del proyecto final
*/

const carro = new Carrito();
const carrito = document.getElementById("carrito");
const productos = document.getElementById("lista-productos");
const listaProductos = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
const procesarPedidoIndexBtn = document.getElementById("procesar-pedido-index");
const procesarPedidoSeccionesBtn = document.getElementById("procesar-pedido-secciones");

// ============EVENTOS=============

productos.addEventListener("click", (e)=>{carro.comprarProducto(e)});

carrito.addEventListener("click", (e)=>{carro.eliminarProducto(e)});

vaciarCarritoBtn.addEventListener("click", (e)=>{carro.vaciarCarrito(e)});

document.addEventListener("DOMContentLoaded", carro.leerLocalStorage());
