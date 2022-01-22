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