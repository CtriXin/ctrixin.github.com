
(function( $ ) {

	/*
	Thumbnail: Select
	*/
	$('.mg-toolbar input[type=checkbox]').on('change', function( ev ) {
		var wrapper = $(this).parents('.thumbnail');
		if($(this).is(':checked')) {
			wrapper.addClass('thumbnail-selected');
		} else {
			wrapper.removeClass('thumbnail-selected');
		}
		console.log("the input is checked")
	});

	/*
	Toolbar: Select All
	*/
	$('#mgSelectAll').on('click', function( ev ) {
		ev.preventDefault();
		var $this = $(this),
			$label = $this.find('> span');
			$checks = $('.mg-toolbar input[type=checkbox]');

		if($this.attr('data-all-selected')) {
			$this.removeAttr('data-all-selected');
			$checks.prop('checked', false).trigger('change');
			$label.html($label.data('all-text'));
		} else {
			$this.attr('data-all-selected', 'true');
			$checks.prop('checked', true).trigger('change');
			$label.html($label.data('none-text'));
		}
	});


	/*
	Thumnail: Dropdown Options
	*/
	$('.thumbnail .mg-toggle').parent()
		.on('show.bs.dropdown', function( ev ) {
			$(this).closest('.mg-thumb-options').css('overflow', 'visible');
		})
		.on('hidden.bs.dropdown', function( ev ) {
			$(this).closest('.mg-thumb-options').css('overflow', '');
		});

	$('.thumbnail').on('mouseenter', function() {
		var toggle = $(this).find('.mg-toggle');
		if ( toggle.parent().hasClass('open') ) {
			toggle.dropdown('toggle');
		}
	});	;

}(jQuery));
