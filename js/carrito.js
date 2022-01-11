/*
 * @ version: v2.0.2
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
        const infoProducto = {
            imagen: producto.querySelector("img").src,
            titulo: producto.querySelector("h5").textContent,
            precio: producto.querySelector(".precioProducto").textContent,
            id: producto.querySelector("button").getAttribute("data-id"),
            cantidad: 1
        }

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

    insertarCarrito(producto) {
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
        this.guardarProductosLocalStorage(producto);
        // console.log(row);   Los datos se están agregando correctamente
    }

    eliminarProducto(e) {
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

    vaciarCarrito(e) {
        e.preventDefault();
        while(listaProductos.firstChild) {
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarLocalStorage();
        return false;
    }

    guardarProductosLocalStorage(producto) {
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem("productos", JSON.stringify(productos));
    }

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

    eliminarProductosLocalStorage(productoID) {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID) {
                productosLS.splice(index, 1);
            }
        });

        localStorage.setItem("productos", JSON.stringify(productosLS));
    }

    leerLocalStorage() {
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
                    <input type="number" class="form-control" min="1" value=${producto.cantidad}>
                </td>
                <td>${producto.precio * producto.cantidad}</td>
                <td>
                    <a href="#" class="fas fa-times-circle borrar-producto" style="font-size:20px" data-id="${producto.id}"></a>
                </td>`;
            listaCompra.appendChild(row);
        });
    }

    

    vaciarLocalStorage() {
        localStorage.clear();
    }

    procesarPedidoIndex(e){
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

    procesarPedidoSecciones(e){
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

    calcularTotal() {
        let productoLS;
        let total = 0;
        productoLS = this.obtenerProductosLocalStorage();
        for (let index = 0; index < productoLS.length; index++) {
            let element = Number(productoLS[index].precio * productoLS[index].cantidad);
            total += element;
        }
        document.getElementById("total").innerHTML = "$ " + total.toFixed(2) // Para mostrar 2 decimales
    }
}