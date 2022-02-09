/*
* @ version: v1.1.0
 * @ autor: Mirko Pescio
 * @ fecha: 06/01/2022
 * 
*/

class Formulario {
    constructor (nombre, apellido, mail, telefono, asunto, mensaje) {
        this.id = datosUsuario.length;
        this.nombre = nombre;
        this.apellido = apellido;
        this.mail = mail;
        this.telefono = telefono;
        this.asunto = asunto;
        this.mensaje = mensaje;
    }
}

const formulario = document.getElementById("formularioContacto");
const datosUsuario = [];

$("#formularioContacto").validate({

    rules:{
        nombre: {
            required: true,
            minlength: 3,
            lettersonly: true
        },
        apellido: {
            required: true,
            minlength: 3,
            lettersonly: true
        },
        mail: {
            required: true,
            email: true,
            maxlength: 50
        },
        telefono: {
            required: true,
            number: true,
            minlength: 8,
            maxlength: 12
        },
        asunto: {
            required: true,
            minlength: 5,
            maxlength: 18,
            lettersonly: true
        },
        mensaje: {
            required: true,
            minlength: 10,
            maxlength: 150
        }
    },

    messages: {
        nombre: {
            required: "Por favor ingrese su nombre",
            minlength: "Es necesario un mínimo 3 caracteres",
            lettersonly: "No son válidos los caracteres especiales ni los números"
        },
        apellido: {
            required: "Por favor ingrese su apellido",
            minlength: "Es necesario un mínimo 3 caracteres",
            lettersonly: "No son válidos los caracteres especiales ni los números"
        },
        mail: {
            required: "Es obligatorio ingresar su correo",
            email: "El correo no es válido",
            maxlength: "El campo de email sólo admite hasta 50 caracteres"
        },
        telefono: {
            required: "Es obligatorio que ingrese un número de teléfono",
            number: "Sólo se acepta caracteres numéricos",
            minlength: "El número tiene que tener mínimo 8 caracteres numéricos",
            maxlength: "El numero puede tener hasta 12 caracteres numéricos"
        },
        asunto: {
            required: "Es obligatorio que ingrese un asunto",
            minlength: "Es necesario un mínimo de 5 caracteres",
            maxlength: "El asunto puede tener hasta un máximo de 18 caractes",
            lettersonly: "No son válidos los caracteres especiales ni los números"
        },
        mensaje: {
            required: "Ingrese su mensaje",
            minlength: "El mensaje puede tener un mínimo de 10 caracteres",
            maxlength: "El mensaje puede tener un máximo de 150 caracteres"
        }
    },
    
    submitHandler: function(form, e) {
        e.preventDefault();
        let datos = new Formulario(
            $("#inputNombre").val(),
            $("#inputApellido").val(),
            $("#inputEmail").val(),
            $("#inputTelefono").val(),
            $("#inputAsunto").val(),
            $("#areaMensaje").val()
        );
        datosUsuario.push(datos);
        console.log(datosUsuario);
    
        swal({
            title: 'Datos Enviados:',
            icon: "info",
            text: `Nombre: ${datos.nombre}
                   Apellido: ${datos.apellido}
                   Email: ${datos.mail}
                   Teléfono: ${datos.telefono}
                   Asunto: ${datos.asunto} 
                   Mensaje: ${datos.mensaje}`,
            timer: 3000,
            button: false
        });
    }
});
