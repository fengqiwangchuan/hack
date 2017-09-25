var menuModule={
	namespaced:true,
	state:{
		menuList:[
		{superMenu:'主页管理',subMenu:{index:'主页'},isshow:true,subchild:'index'},
		{superMenu:'首页管理',subMenu:{allcontent:'信息总览',Carouselfigure:'轮播图',activity:'活动广告位',},isshow:false,subchild:''},
		{superMenu:'活动信息',subMenu:{employment:'工作详情',learning:'学习详情',classactivity:'班级活动'},isshow:false,subchild:''},
		{superMenu:'用户信息',subMenu:{forum:'论坛',user:'用户信息'},isshow:false,subchild:''}
		],
		menuShow:true,
		/*第一次初始化的时候显示那个数据，并且用这个值来确定menu菜单里面活动的菜单为哪个*/
		oldEl:'',
	},
	getters:{},
	mutations:{
		
	},
	actions:{}
};