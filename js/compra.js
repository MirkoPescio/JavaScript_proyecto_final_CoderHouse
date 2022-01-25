/*
 * @ version: v2.0.2
 * @ autor: Mirko Pescio
 * @ fecha: 18/01/2022
 * @ Descripción: Desafío obligatorio clase de AJAX: Incorporando API
                  de Mercado Pago
*/

const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carritoCompra = document.getElementById("carrito");
const procesarCompraBtn = document.getElementById("procesar-compra");
const cliente = document.getElementById("cliente");
const correo = document.getElementById("correo");

function cargarEventosCompra() {
    document.addEventListener("DOMContentLoaded", compra.leerLocalStorageCompra());

    compra.calcularTotal();

    carritoCompra.addEventListener("click", (e)=>{compra.eliminarProducto(e)});

    procesarCompraBtn.addEventListener("click", procesarCompra);

    carritoCompra.addEventListener('change', (e) => {compra.obtenerEvento(e)});   
    carritoCompra.addEventListener('keyup', (e) => {compra.obtenerEvento(e)});
}

cargarEventosCompra();




async function pagar() {
    const productos = compra.obtenerProductosLocalStorage().map((element) => {
      let nuevoElemento = {
        title: element.titulo,
        picture_url: element.imagen,
        category_id: element.id,
        quantity: Number(element.cantidad),
        currency_id: "ARS",
        unit_price: Number(element.precio),
      };
      return nuevoElemento;
    });
    console.log(productos)
    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer TEST-2004336226964797-011621-8af45d2f304340f63094770a87458a35-178503961",
        },
        body: JSON.stringify({
          items: productos,
        }),
      }
    );
    const data = await response.json();
    console.log(data)
    window.open(data.init_point, "_blank");
}




function procesarCompra(e) {
    e.preventDefault();

    if (compra.obtenerProductosLocalStorage().length === 0) {
        swal({
            title: '¡ACCESO DENEGADO!',
            icon: "error",
            text: 'No hay productos en tu carrito de compras',
            timer: 2000, // 2 segundos
            button: false
        }).then(function(){ // Si se quiere realizar una compra con el carrito vacío,
            // Se va a mostrar un alert de error de compra por pantalla, y va a 
            // redirigir al usuario a la sección principal: index.html
            window.location = "../index.html";
        });
    }
    else if (cliente.value === "" || correo.value === "") {
        swal({
            title: 'INFO',
            icon: "info",
            text: 'Ingrese todos los campos requeridos',
            timer: 2000, // 2 segundos
            button: false
        });
    }
    else {
        const cargandoGif = document.querySelector("#cargando");
        cargandoGif.style.display = "block";

        setTimeout(()=> { // Para volver a esconder el Gif
            cargandoGif.style.display = "none";
            pagar();
            setTimeout(()=> { // Y vaciamos el localStorage después de terminar de procesar un pago
                compra.vaciarLocalStorage();
                window.location = "../index.html";
            }, 2000)
        }, 3000);
    }
}