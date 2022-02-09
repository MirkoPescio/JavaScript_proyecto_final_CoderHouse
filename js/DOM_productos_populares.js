/* @ version: v3.0.0
 * @ autor: Mirko Pescio
 * @ fecha: 09/02/2022
 * @ Ultima modificación: 09/02/2022
*/

/*
Defino el objeto para cargar el DOM de productos de la sección populares
*/

let productosPopulares = [
    {
        "imagen": "../imagenes/nba_2k21.png",
        "nombre": "NBA 2k 21 PS4",
        "precio": "900.00",
        "dataID": "nba2k21",
        "categoria": "deportivos"
    },
    {
        "imagen": "../imagenes/The_Last_of_Us_2.jpg",
        "nombre": "The Last of Us 2 PS4",
        "precio": "1800.00",
        "dataID": "theLastofUs2",
        "categoria": "accion/aventura"
    },
    {
        "imagen": "../imagenes/uncharted-4-a-thiefs-end-ps4.jpg",
        "nombre": "Uncharted 4: a thief's end PS4",
        "precio": "700.00",
        "dataID": "uncharted4",
        "categoria": "accion/aventura"
    },
    {
        "imagen": "../imagenes/batman_arkham_knight_ps4.jpg",
        "nombre": "Batman Arkham Knight PS4",
        "precio": "700.00",
        "dataID": "batmanKnight",
        "categoria": "superheroes"
    },
    {
        "imagen": "../imagenes/batman-return-to-arkham-ps4_2.jpg",
        "nombre": "Batman: Return to Arkham PS4",
        "precio": "850.00",
        "dataID": "batmanReturn",
        "categoria": "superheroes"
    },
    {
        "imagen": "../imagenes/heavy-rain-ps4.jpg",
        "nombre": "Heavy Rain PS4",
        "precio": "650.00",
        "dataID": "heavyRain",
        "categoria": "accion/aventura"
    }
];

for (let item of productosPopulares) {
    let agregar = document.getElementById("contenedorPopulares");
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
                    $ <div class="precioProducto">${item["precio"]}</div>
                </div>
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center"><button type="submit" class="btn btn-outline-dark mt-auto agregar-carrito" data-id="${item["dataID"]}">Añadir al carrito</button></div>
        </div>
    </div>
</div>`
}