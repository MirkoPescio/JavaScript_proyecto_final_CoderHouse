/*

>> Consigna: Con lo que vimos sobre DOM, ahora puedes sumarlo a tu proyecto, 
para interactuar entre los elementos HTML y JS. Es decir, 
asociar eventos que buscamos controlar sobre los elementos  
de la interfaz de nuestro simulador

>>Aspectos a incluir en el entregable:
Archivo HTML y Archivo JS, referenciado en el HTML por etiqueta 
<script src="js/miarchivo.js"></script>, que incluya la definición
 de un algoritmo en JavaScript que opere sobre el DOM manejando eventos.

>>Ejemplo:
Cuando el usuario completa algún dato, por ejemplo cantidad de cuotas, 
se captura ese dato y se agregan elementos al DOM mediante JS.
Capturar la tecla ENTER para confirmar alguna acción.

ALGORITMO PLANTEADO: voy a aplicar un evento de formulario en la sección de contacto.html
para enviar los datos mediante console.log

* @ version: v1.1.0
 * @ autor: Mirko Pescio
 * @ fecha: 15/12/2021
 * 
*/

const miFormulario = document.getElementById("formularioContacto");
miFormulario.addEventListener("submit", function(event){
    event.preventDefault();

    let nombreFormulario = document.getElementById("inputNombre").value;
    console.log(nombreFormulario);

    let emailFormulario = document.getElementById("inputEmail").value;
    console.log(emailFormulario);

    let telefonoFormulario = document.getElementById("inputTelefono").value;
    console.log(telefonoFormulario);
    
    let asuntoFormulario = document.getElementById("inputAsunto").value;
    console.log(asuntoFormulario);

    let mensajeFormulario = document.getElementById("areaMensaje").value;
    console.log(mensajeFormulario);
})