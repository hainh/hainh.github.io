$(function() {
	(function () {
		$(".calc-year").each(function(){
			var t = $(this).attr("data-date").split("-");
			var d = new Date(parseInt(t[0]), parseInt(t[1]), parseInt(t[2]));
			t = Math.round((new Date() - d) / 3153600000) / 10 + '';
			$(this).text(t);
		});
	})();
});