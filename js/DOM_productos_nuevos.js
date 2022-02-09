/* @ version: v3.0.0
 * @ autor: Mirko Pescio
 * @ fecha: 09/02/2022
 * @ Ultima modificación: 09/02/2022
*/

// Defino el objeto para cargar el DOM de productos de la sección nuevos

let productosNuevos = [
    {
        "imagen": "../imagenes/Spiderman_PS4.jpg",
        "nombre": "Marvel's Spiderman PS4",
        "precio": "900.00",
        "dataID": "spiderman",
        "categoria": "superheroes"
    },
    {
        "imagen": "../imagenes/spiderman-miles-morales1-ps4.jpg",
        "nombre": "Spiderman Miles Morales PS4",
        "precio": "1400.00",
        "dataID": "spidermanMilesMorales",
        "categoria": "superheroes"
    },
    {
        "imagen": "../imagenes/marvels-avengers-202092113232289_1.jpg",
        "nombre": "Marvel's Avengers PS4",
        "precio": "1500.00",
        "dataID": "avengers",
        "categoria": "superheroes"
    },
    {
        "imagen": "../imagenes/Mortal_Kombat_11.jpg",
        "nombre": "Mortal Kombat 11 PS4",
        "precio": "1400.00",
        "dataID": "mortalKombat11",
        "categoria": "combate"
    }
];

for (let item of productosNuevos) {
    let agregar = document.getElementById("contenedorNuevos");
    agregar.innerHTML += `
    <div class="col mb-5 producto" category="${item["categoria"]}">
    <div class="card h-100" data-id="${item["dataID"]}">
        <!-- Product image-->
        <img class="card-img-top" src="${item["imagen"]}" alt="..." />
        <!-- Product details-->
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">${item["nombre"]}</h5>
                <!-- Product price-->
                <div class="contenedorPrecio">
                    $<div class="precioProducto">${item["precio"]}</div>
                </div>
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center"><button type="submit" class="btn btn-outline-dark mt-auto agregar-carrito" data-id="${item["dataID"]}">Añadir al carrito</button></div>
        </div>
    </div>
</div>
    `
}