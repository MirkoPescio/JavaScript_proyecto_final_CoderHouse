/*

>> Consigna: Sumar al proyecto integrador los conceptos de 
jQuery que vimos en las últimas dos clases:
-Utilizar métodos jQuery para incorporar elementos al DOM.
-Utilizar métodos jQuery para determinar respuesta a ciertos eventos.

>>Aspectos a incluir en el entregable: 
Archivo HTML y Archivo JS, referenciado en el HTML por etiqueta <script src="js/miarchivo.js"></script>, que incluya la definición de un algoritmo en JavaScript con mètodos jQuery para seleccionar, agregar y definir eventos.

>>Ejemplo:
Manejo de eventos del proyecto: clicks del usuario, 
cambios en inputs, selectores, etc
Cualquier modificación que necesites hacer sobre el DOM con la página 
ya cargada: por ejemplo, al seleccionar una opción de un selector 
aparece una alerta en HTML dando cierta información.
Capturar el evento asociado a presionar ENTER para confirmar el 
envío de los datos.

>> Mi Función: aplico el uso de selectores de JQuery y un evento cuya
  función guarde los datos del formulario de la sección contacto.html
  Después guardo los datos por consola y por alert confirmando el envío
  de los datos habiendo completado todos los campos inputs del
  formulario.


* @ version: v1.1.0
 * @ autor: Mirko Pescio
 * @ fecha: 06/01/2022
 * 
*/

const datosUsuario = [];

class Formulario {
    constructor (nombre, mail, telefono, asunto, mensaje) {
        this.id = datosUsuario.length;
        this.nombre = nombre;
        this.mail = mail;
        this.telefono = telefono;
        this.asunto = asunto;
        this.mensaje = mensaje;
    }
}

$("#formularioContacto").submit(function(e) {

    e.preventDefault();
    let datos = new Formulario(
        $("#inputNombre").val(),
        $("#inputEmail").val(),
        $("#inputTelefono").val(),
        $("#inputAsunto").val(),
        $("#areaMensaje").val()
    );
    datosUsuario.push(datos);
    console.log(datosUsuario);

    alert("Datos Enviados:");
    alert(` Nombre: ${datos.nombre} \n Email: ${datos.mail} \n Teléfono: ${datos.telefono} \n Asunto: ${datos.asunto} \n Mensaje: ${datos.mensaje}`);
});