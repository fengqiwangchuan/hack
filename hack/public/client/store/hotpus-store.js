var employmentModule={
	namespace:true,
	headClass:["id","artice","link","data","hot"],
	headers:["编号","文章名","链接","日期","热门"],
	isAdd:true,
	// editShow:true,
	// editItem:{id:"",name:"",sex:"",address:"",nation:""},
	datasheet:'employment',
	key:'id',
	addOrUpdate:'add',	
	fields:[
		{name:'id',isKey:true,defVal:'',isRItem:true,class:'id'},
		{
			name:'title',
			isRItem:true,
			defVal:'',
			class:'title',
		},
		{
			name:'src',
			isRItem:true,
			defVal:'',
			class:'src'
		},
		{
			name:'data',
			isRItem:true,
			defVal:'',
			class:'data'
		},
		{
			name:'isHot',
			defVal:'true',
			type:'select',
			options:[
				{name:true,value:true},
				{name:false,value:"false"},
			],
			class:'isHot'
		}
	],
	// 用于存放这个表需要显示的数据
	artices:[],
	pageConfig:{pageSize:8,curPage:1,total:0,pageGroupIndex:1}
};
var learningModule={
	namespace:true,
	headClass:["id","artice","link","data","hot"],
	headers:["编号","文章名","链接","日期","是否热门"],
	isAdd:true,
	datasheet:'learning',
	// editShow:false,
	// editItem:{id:"",name:"",sex:"",address:"",nation:""},
	key:'id',
	addOrUpdate:'add',	
	fields:[
		{name:'id',isKey:true,defVal:'',isRItem:true,class:'id'},
		{
			name:'title',
			isRItem:true,
			defVal:'',
			class:'title',
		},
		{
			name:'src',
			isRItem:true,
			defVal:'',
			class:'src'
		},
		{
			name:'data',
			isRItem:true,
			defVal:'',
			class:'data'
		},
		{
			name:'isHot',
			defVal:'true',
			type:'select',
			options:[
				{name:true,value:"true"},
				{name:false,value:"false"},
			],
			class:'isHot'
		}
	],
	// 用于存放这个表需要显示的数据
	artices:[],
	pageConfig:{pageSize:8,curPage:1,total:0,pageGroupIndex:1}
};
var classactivityModule={
	namespace:true,
	headClass:["id","artice","link","data","hot"],
	headers:["编号","文章名","链接","日期","是否热门"],
	isAdd:true,
	datasheet:'classactivity',
	// editShow:false,
	// editItem:{id:"",name:"",sex:"",address:"",nation:""},
	key:'id',
	addOrUpdate:'add',	
	fields:[
		{name:'id',isKey:true,defVal:'',isRItem:true,class:'id'},
		{
			name:'title',
			isRItem:true,
			defVal:'',
			class:'title',
		},
		{
			name:'src',
			isRItem:true,
			defVal:'',
			class:'src'
		},
		{
			name:'data',
			isRItem:true,
			defVal:'',
			class:'data'
		},
		{
			name:'isHot',
			defVal:'true',
			type:'select',
			options:[
				{name:true,value:true},
				{name:false,value:"false"},
			],
			class:'isHot'
		}
	],
	// 用于存放这个表需要显示的数据
	artices:[],
	pageConfig:{pageSize:8,curPage:1,total:0,pageGroupIndex:1}
};
var forumModule={
	namespace:true,
	headClass:["id","title","link","data"],
	headers:["编号","用户名","内容","日期"],
	isAdd:false,
	datasheet:'forum',
	// editShow:false,
	// editItem:{id:"",name:"",sex:"",address:"",nation:""},
	key:'id',
	addOrUpdate:'add',	
	fields:[
		{name:'id',isKey:true,defVal:'',isRItem:true,class:'id'},
		{
			name:'username',
			isRItem:true,
			defVal:'',
			class:'src'
		},
		{
			name:'content',
			isRItem:true,
			defVal:'',
			class:'title',
		},
		{
			name:'data',
			isRItem:true,
			defVal:'',
			class:'data'
		},
	],
	// 用于存放这个表需要显示的数据
	artices:[],
	pageConfig:{pageSize:8,curPage:1,total:0,pageGroupIndex:1}
};
var userModule={
	namespace:true,
	headClass:["id","title","link","data"],
	headers:["编号","用户名","密码"],
	isAdd:false,
	datasheet:'user',
	key:'id',
	addOrUpdate:'add',	
	fields:[
		{name:'id',isKey:true,defVal:'',isRItem:true,class:'id'},
		{
			name:'username',
			isRItem:true,
			defVal:'',
			class:'src'
		},
		{
			name:'password',
			isRItem:true,
			defVal:'',
			class:'src',
		},
	],
	// 用于存放这个表需要显示的数据
	artices:[],
	pageConfig:{pageSize:8,curPage:1,total:0,pageGroupIndex:1}
};

var hotpushmentModule={
	namespaced:true,
	state:{
		fields:[//这里放的employment的搜索框信息
			{name:'id',value:""},
			{name:'title',value:""},
			{name:'data',value:""},
			{name:'src',value:""},
			{name:'isHot',type:'select',value:""}
		],
		
	},
	getters:{},
	mutations:{//mutations方法中只能使用同步修改
		
	},
	//如果是异步更改state必须用actions中的方法
	actions:{},
	modules:{
		employment:{state:employmentModule},
		learning:{state:learningModule},
		classactivity:{state:classactivityModule},
		forum:{state:forumModule},
		user:{state:userModule}

	}
};