/*
 * @ version: v3.0.0
 * @ autor: Mirko Pescio
 * @ fecha: 09/02/2022
 * @ Descripción: reentrega del proyecto final
*/

class Carrito {

// Añadir el producto al carrito de compras
    comprarProducto(e) {
        e.preventDefault();
        if (e.target.classList.contains("agregar-carrito")) { // Una vez clickeado el botón para agregar al carrito se va a definir lo siguiente
            const producto = e.target.parentElement.parentElement.parentElement;
            this.leerDatosProducto(producto);
        }
    }

// Asigno un objeto a cada producto seleccionado
    leerDatosProducto(producto) {
        const infoProducto = {
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
        let productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS){
            if(productoLS.id === infoProducto.id) {
                productosLS = productoLS.id;
            }
        });
        if(productosLS === infoProducto.id) {
            swal({
                title: 'Oops...',
                icon: "error",
                text: 'El producto seleccionado ya fué agregado, modifique la cantidad después al procesar la compra',
                timer: 8000, // 8 segundos
                button: true
            });
            infoProducto.cantidad += 1; 

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
            // y elimino el parrafo ".agregado" después de la animación
            setTimeout(function() {
                $(".agregado")
                    .remove()
            }, 5000);
        }
        else {
            this.insertarCarrito(infoProducto);
            swal({
                title: 'Buena Elección!',
                icon: 'success',
                text: `Agregaste ${infoProducto.titulo} al carrito de compras`,
                timer: 2000, // 2 segundos
                button: false
            });
        }
    }

// Aplico en el DOM la estructura de cada producto en el carrito de compras
    insertarCarrito(producto) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" class="imagenProductoCarrito" width=100>
            </td>
            <td class="tituloProductoCarrito">${producto.titulo}</td>
            <td class="precioProductoCarrito">${producto.precio}</td>
            <td>
                <a href="#" class="fas fa-times-circle borrar-producto" data-id="${producto.id}"></a>
            </td>`;
        listaProductos.appendChild(row);
// Asigno cada producto asignado al localStorage
        this.guardarProductosLocalStorage(producto);
    }

// Para eliminar productos individualmente
    eliminarProducto(e) {
    // Al clickear el icono remove de dicho producto, lo borra del carrito y del localStorage
        e.preventDefault();
        let producto, productoID;
        if (e.target.classList.contains("borrar-producto")) {
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector("a").getAttribute("data-id");
        }
        this.eliminarProductosLocalStorage(productoID);
    // Para que el monto total se actualice si se borra algún producto
        this.calcularTotal();
    }

    // Para vaciar todo el carrito de compras y el local Storage con un sólo botón
    vaciarCarrito(e) { 
        e.preventDefault();
        while(listaProductos.firstChild) {
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarLocalStorage();
        return false;
    }

    // Una vez creado el array de productos del localStorage,
    // pusheamos los productos que el usuario asigne al carrito de compras
    guardarProductosLocalStorage(producto) {
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem("productos", JSON.stringify(productos));
    }

    // Inicializamos un array de objetos en el localStorage en el caso 
    // de que dicho array esté vacío
    obtenerProductosLocalStorage() {
        let productoLS;
        if(localStorage.getItem("productos") === null) {
            productoLS = [];
        }
        else {
            productoLS = JSON.parse(localStorage.getItem("productos"));
        }
        return productoLS;
    }

    // Si eliminamos un producto del carrito de compras, 
    // también tenemos que eliminarlo del localStorage
    eliminarProductosLocalStorage(productoID) {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID) {
                productosLS.splice(index, 1);
                // Borra un elemento en la posición index
            }
        });
        localStorage.setItem("productos", JSON.stringify(productosLS));
        // Esta función la llamamos en la función eliminarProducto(e)
    }

    // Esta función es para cuando apenas se cargue la página,
    // Los productos que estén en el localStorage, sean automaticamente
    // Asignados al carrito de compras
    leerLocalStorage() {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(producto){
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" class="imagenProductoCarrito" width=100>
                </td>
                    <td class="tituloProductoCarrito">${producto.titulo}</td>
                <td class="precioProductoCarrito">${producto.precio}</td>
                <td>
                    <a href="#" class="fas fa-times-circle borrar-producto" data-id="${producto.id}"></a>
                </td>`;
            listaProductos.appendChild(row);
        });
    }

    // Interfaz de los productos en la sección de compra (compra.html)
    leerLocalStorageCompra() {
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
        if (this.obtenerProductosLocalStorage().length !== 0){
            localStorage.clear();
            swal({
                title: '¡SE VACIÓ EL CARRITO!',
                icon: "info",
                timer: 2000,
                button: false
            });
        }
        else{
            swal({
                title: '¡El CARRITO YA ESTÁ VACÍO!',
                icon: "error",
                timer: 2000,
                button: false
            });
        }
    }

    // Si hay algún producto agregado en el carrito de compras
    // y por lo tanto también en el localStorage, al clickear
    // el botón de procesar compra del carrito, esto nos
    // redirige a la sección para procesar la compra (compra.html)
    procesarPedidoIndex(e){
        e.preventDefault();
        if (this.obtenerProductosLocalStorage().length === 0){
            swal({
                title: '¡ACCESO DENEGADO!',
                icon: "error",
                text: 'Tu carrito de compras está vacío',
                timer: 2000,
                button: false
            });
        }
        else{
            location.href = "./secciones/compra.html";
        }
    }

    // Es lo mismo que la función procesarPedidoIndex (e)
    // Nada mas que esta función se aplica para las otras
    // secciones html por una cuestión de las rutas
    // La finalidad es ir al archivo compra.html
    procesarPedidoSecciones(e){
        e.preventDefault();
        if (this.obtenerProductosLocalStorage().length === 0){
            swal({
                title: '¡ACCESO DENEGADO!',
                icon: "error",
                text: 'Tu carrito de compras está vacío',
                timer: 2000,
                button: false
            });
        }
        else{
            location.href = "../secciones/compra.html";
        }
    }

    // Calculo del total de cada producto según la cantidad establecida
    calcularTotal() {
        let productoLS;
        let total = 0;
        productoLS = this.obtenerProductosLocalStorage();
        for (let i = 0; i < productoLS.length; i++) {
            let n = Number(productoLS[i].precio * productoLS[i].cantidad);
            total += n;
        }
        document.getElementById("total").innerHTML = "$ " + total.toFixed(2) // Para mostrar 2 decimales
    }

    // Esta función es para la actualización de cada subtotal
    // de los productos, como para la actualización del valor
    // total de la compra.
    // Dichos cambios se generan al modificar la cantidad
    // seleccionada para cada producto
    actualizarTotal(e) {
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