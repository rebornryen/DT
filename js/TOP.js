$(document).ready(function(){

	// 回到顶部
	$('#topcontrol').click(function (event) {
		$('html,body').animate({scrollTop: 0}, 1000);
	});

	$(window).scroll(function(event) {

		var sTop = $(window).scrollTop();

		if (sTop >= 100) {
			$('#topcontrol').fadeIn('slow');
		} else {
			$('#topcontrol').fadeOut('slow');
		}
	});
});