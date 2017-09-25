var alertModule = {
	namespaced: true,
	state: {
		isShow: false,
		msg: '这是要显示的内容'
	},
	getters: {},
	mutations: {// mutations方法中只能使用同步修改
		open: function (state, msg) {
			state.isShow = true;
			state.msg = msg;
		},
		close: function (state) {
			state.isShow = false;
			return true;
		}
	},
	// 如果是异步更改state必须用actions中的方法
	actions: {}
}
export default alertModule