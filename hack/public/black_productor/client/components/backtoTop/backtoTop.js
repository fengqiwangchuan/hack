var backtoTop=Vue.extend({
	template:'#backtoTop',
	methods:{
		backtoTop:function(){
			// console.log(123);
			// document.querySelector("#top").scrollIntoView(true);

			// document.body.scrollTop = document.documentElement.scrollTop = 0;
		
			var timer = null;
			cancelAnimationFrame(timer);
			timer = requestAnimationFrame(function fn(){
			var oTop = document.body.scrollTop || document.documentElement.scrollTop;
			if(oTop > 0){
			document.body.scrollTop = document.documentElement.scrollTop = oTop - 20;
			timer = requestAnimationFrame(fn);
			}else{
			cancelAnimationFrame(timer);
			} 
			});
		}
	}
});