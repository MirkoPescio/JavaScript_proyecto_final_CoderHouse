const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carritoCompra = document.getElementById("carrito");
const procesarCompraBtn = document.getElementById("procesar-compra");
const cliente = document.getElementById("cliente");
const correo = document.getElementById("correo");

function cargarEventosCompra() {
    document.addEventListener("DOMContentLoaded", compra.leerLocalStorageCompra());

    carritoCompra.addEventListener("click", (e)=>{compra.eliminarProducto(e)});

    compra.calcularTotal();

    procesarCompraBtn.addEventListener("click", procesarCompra);
}

cargarEventosCompra();

function procesarCompra(e) {
    e.preventDefault();

    if (compra.obtenerProductosLocalStorage().length === 0) {
        Swal.fire({
            title: 'Oops...',
            text: 'No hay productos en tu carrito de compras',
            timer: 2000, // 2 segundos
            showConfirmButton: false
        }).then(function(){ // Si se quiere realizar una compra con el carrito vacío,
            // Se va a mostrar un alert de error de compra por pantalla, y va a 
            // redirigir al usuario a la sección principal: index.html
            window.location = "../index.html";
        });
    }
    else if (cliente.value === "" || correo.value === "") {
        Swal.fire({
            title: 'Oops...',
            text: 'Ingrese todos los campos requeridos',
            timer: 3000, // 2 segundos
            showConfirmButton: false
        });
    }
    else {
        const cargandoGif = document.querySelector("#cargando");
        cargandoGif.style.display = "block";

        setTimeout(()=> { // Para volver a esconder el Gif
            cargandoGif.style.display = "none";
            setTimeout(()=> { // Y vaciamos el localStorage y nos redirige al index.html
                compra.vaciarLocalStorage();
                window.location = "../index.html";
            }, 2000)
        }, 3000);
    }
}