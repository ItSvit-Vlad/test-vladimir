$(document).ready(function() {
	
	var openEdit = false;

	$('.cont-list a').on('click', function(e) {
		$('#viewContact').modal('show');
	});
	
	$('.modal-body .action .cancel').on('click', function() {
		$('#editContact').modal('hide');
	});
	
	$('.modal-body .action .edit').on('click', function() {
		openEdit = true;
		$('#viewContact').modal('hide');
	});
	
	$("#viewContact").on('hidden.bs.modal', function () {
		if (openEdit) {
			openEdit = false;
			$('#editContact').modal('show');
		}
	});
	
	$('body').on('click', '.modal-body .email-fields span', function() {
		$(this).parent().fadeOut('fast', function() {
			$(this).remove();
		});
	});
	
	$('.modal-body .add a').on('click', function() {
		var bl = $('#addBlank').html();
		$('.email-fields').append(bl);
	});
});