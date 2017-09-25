//nav组件
var navigation=Vue.extend({
	template:"#navigation",
	// data:function(){
	// 	return{
	// 		post:function(){
	// 			console.log(1);
	// 		}
	// 	}
	// }
	methods:{
		getFocus:function(){
			if(window.localStorage.prouser){
				this.$store.state.isShow =!this.$store.state.isShow;
				document.getElementById('textarea5').focus();
				//console.log(document.getElementById('textarea5').value);
			}
			else{
				// this.$store.commit('open','请先登录哦');
				alert('请先进行登录');
			}

		}
	}
});