/*
>> Consigna:  Traslada al proyecto integrador el concepto de objetos, 
visto en la clase de hoy. En función del tipo de simulador que hayas elegido, deberás:
Crear elementos manipulando el DOM a partir de la informaciòn de tus objetos.
Modificar etiquetas existentes en función del resultado de operaciones.

>>Aspectos a incluir en el entregable:
Archivo HTML y Archivo JS, referenciado en el HTML por etiqueta 
<script src="js/miarchivo.js"></script>, que incluya la definición de 
un algoritmo en JavaScript que opere sobre el DOM, modificando, agregando 
o eliminado elementos.

>>Ejemplo:
Podemos crear elementos HTML en función del listado de nuestros objetos identificados 
en la clase 6.
Establecer un mensaje de bienvenida aleatorio usando un array de mensajes.
Capturar una o más entradas por prompt() y mostrarlas en el HTML, modificando el DOM.
*/

/* @ version: v1.1.0
 * @ autor: Mirko Pescio
 * @ fecha: 27/12/2021
 * 
*/

/*
Defino objetos y listas que pueda usar más adelante
*/

// Agrego 2 productos nuevos:

class producto {
    constructor(imagen, nombre, precio, dataID) {
        this.imagen = imagen;
        this.nombre = nombre;
        this.precio = precio;
        this.dataID = dataID;
    }
}

let arrayNuevosPopulares = [];
arrayNuevosPopulares.push(new producto("../imagenes/batman-return-to-arkham-ps4_2.jpg", "Batman: Return to Arkham PS4", "850,00", "batmanReturn"));
arrayNuevosPopulares.push(new producto("../imagenes/heavy-rain-ps4.jpg", "Heavy Rain PS4", "$650,00", "heavyRain"));

for (const item of arrayNuevosPopulares) {
    let principal = document.getElementById("contenedorPopulares");
    let contenedor = document.createElement("div");
    contenedor.innerHTML = `
                            <div class="col mb-5 producto">
                                <div class="card h-100">
                                    <!-- Product image-->
                                    <img class="card-img-top" src="${item.imagen}" alt="..." />
                                    <!-- Product details-->
                                    <div class="card-body p-4">
                                        <div class="text-center">
                                            <!-- Product name-->
                                            <h5 class="fw-bolder">${item.nombre}</h5>
                                            <!-- Product reviews-->
                                            <div class="d-flex justify-content-center small text-warning mb-2">
                                                <div class="bi-star-fill"></div>
                                                <div class="bi-star-fill"></div>
                                                <div class="bi-star-fill"></div>
                                                <div class="bi-star-fill"></div>
                                                <div class="bi-star-fill"></div>
                                            </div>
                                            <!-- Product price-->
                                            <div class="contenedorPrecio">
                                                ${item.precio}
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Product actions-->
                                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div class="text-center"><button type="submit" class="btn btn-outline-dark mt-auto agregar-carrito" data-id="${item.dataID}">Añadir al carrito</button></div>
                                    </div>
                                </div>
                            </div>`;
    principal.appendChild(contenedor);
}
// Quedan agregados 2 productos en la seccion populares.html