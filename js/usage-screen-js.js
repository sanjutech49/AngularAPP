$(document).ready(function() {
	var disableCallbacks = location.href.match(/(\?|&)nocallbacks($|&|=)/);

		active_menu_cb = function(e, submenu) {
			e.preventDefault();
			$('#demo1').find('li').removeClass('active');
			var li =  $(this).parent();
			var lis = li.parents('li');
			li.addClass('active');
			lis.addClass('active');
		};

});