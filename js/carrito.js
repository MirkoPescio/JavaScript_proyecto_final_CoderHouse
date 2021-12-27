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
            precio: producto.querySelector(".contenedorPrecio").textContent,
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
            console.log("Producto ya agregado")
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

    vaciarLocalStorage() {
        localStorage.clear();
    }
}