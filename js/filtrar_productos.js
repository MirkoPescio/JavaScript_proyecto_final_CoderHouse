// Aplicando el filtro de productos por categorías

$(document).ready(function(){

	// AGREGANDO CLASE ACTIVE AL PRIMER ENLACE ====================
	$('.category_list .category_item[category="todo"]').addClass('ct_item-active');

	// FILTRANDO PRODUCTOS  ============================================

	$('.category_item').click(function(){
		let categoriaProducto = $(this).attr('category'); // Esta varable va a ser igual al valor de su atributo category
		console.log(categoriaProducto);

		// AGREGANDO CLASE ACTIVE AL ENLACE SELECCIONADO
		$('.category_item').removeClass('ct_item-active');
		$(this).addClass('ct_item-active');

		// OCULTANDO PRODUCTOS =========================
		$('.producto').css('transform', 'scale(0)');
		function hideProduct(){
			$('.producto').hide();
		} setTimeout(hideProduct, 500);

		// MOSTRANDO PRODUCTOS =========================
		function showProduct(){
			$('.producto[category="'+categoriaProducto+'"]').show();
			$('.producto[category="'+categoriaProducto+'"]').css('transform', 'scale(1)');
		} setTimeout(showProduct, 500);
	});

	// MOSTRANDO TODOS LOS PRODUCTOS =======================

	$('.category_item[category="todo"]').click(function(){
		function showAll(){
			$('.producto').show();
			$('.producto').css('transform', 'scale(1)');
		} setTimeout(showAll,500);
	});
});



// Aplicando el filtro de productos por rango de precio

$(document).on("submit", "form.precioRange", (e) => {
    let precioEnValueMenor = e.target[0].value;
	let precioEnValueMayor = e.target[2].value;
        
    for (const producto of $('.producto')) {
            
        let precioEnProducto = producto.querySelector(".precioProducto").innerHTML;

        if (parseInt(precioEnProducto) > parseInt(precioEnValueMenor) && parseInt(precioEnProducto) < parseInt(precioEnValueMayor)) {
			// Simplemente no se aplica nada
        } else {
            producto.remove(); // Se eliminan los productos que no cumplen con la condición
        }
    }
});

$("#restablecerFiltros").click(function restablecerFiltros() {
	// Simplemente recargamos la página
	location.reload(true);
});

//CAMBIAMOS EL VALOR DE OUTPUT PARA QUE CAMBIE CON EL VALUE DEL INPUT
$(document).on('input', '#rangeSlider', (e) => {
    e.target.nextElementSibling.value = e.target.value
}); 
$(document).on('input', '#rangeSlider_inversed', (e) => {
    e.target.nextElementSibling.value = e.target.value
});