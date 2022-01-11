/*
>> Consigna: codifica animaciones concatenadas sobre uno o más elementos.
Es decir que luego de finalizar una animación en su función callback, 
se especifica la llamada a otra animación.

>> Aspectos a incluir en el entregable:
Archivo HTML y archivo JavaScript referenciado, que incluya la 
definición de dos o más animaciones y sus respectivas funciones callback.

>> Ejemplo de secuencia de animación:
1) Mostrar un elemento con fadeIn() y al concluir su transición, 
  ocultar otro elemento con fadeOut(). 
2) Aumentar el margen de un elemento con animate() y al concluir su 
  transición, disminuir el margen del mismo elemento con animate().
3) Disminuir la altura de un elemento con animate() y al concluir su 
  transición, esperar con delay() unos ms, y volver al tamaño original.

>> Mi algoritmo planteado: si el producto ya fué agregado al carrito
  de compras y el localStorage, entonces también mostrar en su respectivo
  card un párrafo que indique que dicho producto ya fué agregado al
  carrito

  * @ version: v1.0.0
  * @ autor: Mirko Pescio
  * @ fecha: 10/01/2022
  * @ Descripción: 2da Preentrega del proyecto final

*/

// El ejercicio se ejecuta en el archivo carrito.js desde la línea 46