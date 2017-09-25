$(function(){
			var timer = setInterval(function(){
				$('#flip').animate({left:'+=500px'},15000);
				$('#flip').animate({left:'-=500px'},15000);
			},1000);
			
		})