/*
 * @ version: v2.0.3
 * @ autor: Mirko Pescio
 * @ fecha: 27/12/2021
 * @ Descripción: 2da Preentrega del proyecto final
*/

class Carrito {
    // Primer método

    // Añadir el producto al carrito de compras
    comprarProducto(e) {
        e.preventDefault();
        if (e.target.classList.contains("agregar-carrito")) { // Una vez clickeado el botón para agregar al carrito se va a definir lo siguiente
            const producto = e.target.parentElement.parentElement.parentElement;
            this.leerDatosProducto(producto);
            //console.log(producto);
        }
    }

    leerDatosProducto(producto) {
        const infoProducto = { // Asigno un objeto a cada producto seleccionado
            imagen: producto.querySelector("img").src,
            titulo: producto.querySelector("h5").textContent,
            precio: producto.querySelector(".precioProducto").textContent,
            id: producto.querySelector("button").getAttribute("data-id"),
            cantidad: 1
        }
        // Defino un algoritmo para el carrito de compras:
        // Este algoritmo que encarga de que no se duplique un mismo producto
        // en el carrito de compras
        // y mostrar por pantalla un aviso de que el producto fué agregado anteriormente
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS){
            if(productoLS.id === infoProducto.id) {
                productosLS = productoLS.id;
            }
        });
        if(productosLS === infoProducto.id) {
            Swal.fire({
                title: 'Oops...',
                text: 'El producto seleccionado ya fué agregado',
                timer: 2000, // 2 segundos
                showConfirmButton: false
            });

            // clase 13: animaciones___ejercicio_complementario
            $(`.card[data-id = "${infoProducto.id}"]`).append(`<p class="agregado" style="display: none">El producto ya fué agregado al carrito de compras</p>`);
            $(".agregado")
                .fadeIn(3000)
                .delay(1000)
                .fadeOut(2000);
            $(".agregado").css({
                "color": "black",
                "font-size": "1.25rem",
                "border": "2px solid #ccc"
            });
            setTimeout(function() { // Es para eliminar el parrafo ".agregado" después de la animación
                $(".agregado")
                    .remove()
            }, 6500);
        }
        else {
            this.insertarCarrito(infoProducto);
        }
    }

    insertarCarrito(producto) { // Aplico en el DOM la estructura de cada producto en el carrito de compras
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="fas fa-times-circle borrar-producto" data-id="${producto.id}"></a>
            </td>`;
        listaProductos.appendChild(row);
        // Asigno cada producto asignado al localStorage (ver funciones desde la línea 105)
        this.guardarProductosLocalStorage(producto);
        // console.log(row);   Los datos se están agregando correctamente
    }

    eliminarProducto(e) { // Para eliminar productos individualmente
        // Al clickear el icono remove de dicho producto, lo borra del carrito y del localStorage
        e.preventDefault();
        let producto, productoID;
        if (e.target.classList.contains("borrar-producto")) {
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector("a").getAttribute("data-id");
        }
        this.eliminarProductosLocalStorage(productoID);
        this.calcularTotal(); // Es para que el monto total se actualice si se borra algún producto
    }

    vaciarCarrito(e) { // Para vaciar todo el carrito de compras y el local Storage con un sólo botón
        e.preventDefault();
        while(listaProductos.firstChild) {
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarLocalStorage();
        return false;
    }

    guardarProductosLocalStorage(producto) { // Una vez creado el array de productos del localStorage, pusheamos los productos que el usuario asigne al carrito de compras
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem("productos", JSON.stringify(productos));
    }

    obtenerProductosLocalStorage() { // Inicializamos un array de objetos en el localStorage en el caso de que dicho array esté vacío
        let productoLS;
        if(localStorage.getItem("productos") === null) {
            productoLS = [];
        }
        else {
            productoLS = JSON.parse(localStorage.getItem("productos"));
        }
        return productoLS;
    }

    eliminarProductosLocalStorage(productoID) { // Si eliminamos un producto del carrito de compras, también tenemos que eliminarlo del localStorage
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID) {
                productosLS.splice(index, 1); // Borra un elemento en la posición Index
            }
        });
        localStorage.setItem("productos", JSON.stringify(productosLS));
        // Esta función la llamamos en la función eliminarProducto(e)___Línea 92
    }

    leerLocalStorage() { // Esta función es para cuando apenas se cargue la página,
                         // Los productos que estén en el localStorage, sean automaticamente
                         // Asignados al carrito de compras
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(producto){
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                    <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <a href="#" class="fas fa-times-circle borrar-producto" data-id="${producto.id}"></a>
                </td>`;
            listaProductos.appendChild(row);
        });
    }

    leerLocalStorageCompra() { // Interfaz de los productos en la sección de
                               // compra (compra.html)
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(producto){
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
                </td>
                <td id='subtotales'>${producto.precio * producto.cantidad}</td>
                <td>
                    <a href="#" class="fas fa-times-circle borrar-producto" style="font-size:20px" data-id="${producto.id}"></a>
                </td>`;
            listaCompra.appendChild(row);
        });
    }

    vaciarLocalStorage() {
        localStorage.clear();
    }

    procesarPedidoIndex(e){ // Si hay algún producto agregado en el carrito de compras
                            // y por lo tanto también en el localStorage, al clickear
                            // el botón de procesar compra del carrito, esto nos
                            // redirige a la sección para procesar la compra (compra.html)
        e.preventDefault();
        if (this.obtenerProductosLocalStorage().length === 0){
            Swal.fire({
                title: 'Oops...',
                text: 'Tu carrito de compras está vacío',
                timer: 2000, // 2 segundos
                showConfirmButton: false
            });
        }
        else{
            location.href = "./secciones/compra.html";
        }
    }

    procesarPedidoSecciones(e){ // Es lo mismo que la función procesarPedidoIndex (e)
                                // Nada mas que esta función se aplica para las otras
                                // secciones html por una cuestión de las rutas
                                // La finalidad es ir al archivo compra.html
        e.preventDefault();
        if (this.obtenerProductosLocalStorage().length === 0){
            Swal.fire({
                title: 'Oops...',
                text: 'Tu carrito de compras está vacío',
                timer: 2000, // 2 segundos
                showConfirmButton: false
            });
        }
        else{
            location.href = "../secciones/compra.html";
        }
    }

    calcularTotal() { // Calculo del total de cada producto según la cantidad establecida
        let productoLS;
        let total = 0;
        productoLS = this.obtenerProductosLocalStorage();
        for (let index = 0; index < productoLS.length; index++) {
            let element = Number(productoLS[index].precio * productoLS[index].cantidad);
            total += element;
        }
        document.getElementById("total").innerHTML = "$ " + total.toFixed(2) // Para mostrar 2 decimales
    }

    obtenerEvento(e) { // Esta función es para la actualización de cada subtotal
                       // de los productos, como para la actualización del valor
                       // total de la compra.
                       // Dichos cambios se generan al modificar la cantidad
                       // seleccionada para cada producto
        e.preventDefault();
        let id, cantidad, producto, productosLS;
        if (e.target.classList.contains('cantidad')) {
            producto = e.target.parentElement.parentElement;
            id = producto.querySelector('a').getAttribute('data-id');
            cantidad = producto.querySelector('input').value;
            let actualizarMontos = document.querySelectorAll('#subtotales');
            productosLS = this.obtenerProductosLocalStorage();
            productosLS.forEach(function (productoLS, index) {
                if (productoLS.id === id) {
                    productoLS.cantidad = cantidad;                    
                    actualizarMontos[index].innerHTML = Number(cantidad * productosLS[index].precio);
                }    
            });
            localStorage.setItem('productos', JSON.stringify(productosLS));
            
        }
        else {
            console.log("click afuera");
        }
    }
}