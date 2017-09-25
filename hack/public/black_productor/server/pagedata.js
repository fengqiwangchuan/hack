/*轮播图函数*/
var Carouselfigure = require('./getData/Carouselfigure.js');
var employment = require('./getData/employment.js');
var learning = require('./getData/learning.js');
var classActive = require('./getData/classActive.js');
var otherPagedata = require('./getData/otherData.js');

var pageData={
	// 轮播图数据
	slideList:[
        {
            clickUrl: "#",
            image:'images/banner/1.jpg',
            context:'"30000元"悬赏最拼的你-致每一位在黑马奋斗的你'
        },
        {
            clickUrl: "#",
            image: 'images/banner/2.jpg',
            context:'【2017最新版】28天PHP视频教程免费赠送'
        },
        {
            clickUrl: "#",
            image: 'images/banner/3.jpg',
            context:'【播妞首发】Python进阶之Django框架'
        }
		    ],
    // 热门活动数据
    activity:{
		titles:['热门活动'],
		srcs:['images/hot2.jpg'],
	} ,
	//推荐阅读数据
	reads:{
			readImgs:['images/read01.png','images/read02.png'], // ,'images/read03.jpg'
			readTexts:[
				{text1:['【济南校区】小鲁哥哥白话笔记-接口','【黑马程序员济南】我的黑马导师之路',
				'【播妞说】2017你不清楚的18个非技术面试题','黑马程序员—2017年全年开班计划表']},
				{text2:['【7.21资源更新】设计行业下一个浪潮分析会','Java基础视频精华版深入浅出（有源码）',
				'【完结】年薪3W到年薪30W需要多久','一贴集合社区全部资源所有学科持续更新中']}
			]
	},
	//hotpush热门推送数据
	hotpushConfig:{
		title:['就业薪资','学习经历','班级活动'],
		contents:{
			employment:[
				'北京黑马Android就业100期 平均薪资9000元',
				'北京黑马JavaEE就业49期 毕业23个工作日，平均薪10119元，就业率80.61%！',
				'北京传智JavaEE就业243期 毕业38工作日，平均薪资9078元，就业率83.78%！',
				'北京黑马JavaEE46期 平均薪资10131元，毕业46个工作日，就业率92.16%！',
				'北京传智JavaEE245期 平均薪资8719元，毕业24个工作日，就业率64.47%！',
				'北京传智Python4期毕业9个工作日，就业率60% ，平均薪资10784'
				],
			learning:[
				'18期的汉子，一个菜鸟忽悠到9.5K【连载】',
				'学累了休息时的无聊贴',
				'吐槽讲师无极限，钟爱黑马每一天！！！',
				'北上之路，能走多远。',
				'学员感言区的发帖规范',
				'这个世界很大，但是我们遇见了'
				],
			classActive:[
				'扬理想的风帆，铸清洁的灵魂-安卓104期就业班',
				'生活不求完美，但求实在---致黑马JavaEE基础316期',
				'Python，刚好遇见你~~~',
				'小小的天，大大的梦想——就业班开班啦',
				'7月我们奋斗在路上---致北京传智JavaEE基础304期！',
				'一张帖看完全国所有学科、班级就业薪资'
				],
		},
	},
	//resource部分的数据
	 titles:['学习交流','北京校区'], //,'官方动态'
	studyConfig:{
		con1:{
			srcs:['fa-telegram'],
			cons:['免费资源','主题：3792','帖数：3456','【2017最新版】28天PHP视频教程 ...','tansinaxin']
		},
		con2:{
			srcs:['fa-podcast'],
			cons:['技术交流','主题：39万','帖数：7万','【Java高级】OA+工作流实战视频','a5529002']
		},
		con3:{
			srcs:['fa-vcard'],
			cons:['学习路线图专区','主题：369','帖数：2567','免费分享《2017PHP基础视频教程','']
		},
		con4:{
			srcs:['fa-star-half-empty'],
			cons:['大家说','主题：6784','帖数：4万','','ahvshd']
		}
	},
	schoolConfig:{
		con1:{
			srcs:['fa-ship'],
			cons:['新人报到','主题：3452','帖数：7896','[伯虎报道]+看书与旅行+在你看的...','100387510']
		},
		con2:{
			srcs:['fa-soccer-ball-o'],
			cons:['就业薪资','主题：6万','帖数：798','北京黑马JavaEE51期','1204576274']
		},
		con3:{
			srcs:['fa-wheelchair-alt'],
			cons:['学习经历','主题：3542','帖数：6万','学累了休息时的无聊贴',' zzxt']
		},
		con4:{
			srcs:['fa-user-secret'],
			cons:['班级活动','主题：289','帖数：934','千年等一回——黑马前端就业34期 ...','ahvshd']
		}
	},
	// officialConfig:{
	// 	con1:{
	// 		srcs:['images/resourceConfig/common_601_icon.png'],
	// 		cons:['社区活动 ','主题：3790','帖数：4560','【回帖领黑马币】在山东，你最想 ...','Oliverwqcwrw']
	// 	},
	// 	con2:{
	// 		srcs:['images/resourceConfig/common_602_icon.png'],
	// 		cons:['官方公告','主题：9万','帖数：4790','黑马社区注册必看！（一张帖解决 ... ','']
	// 	},
	// 	con3:{
	// 		srcs:['images/resourceConfig/common_603_icon.png'],
	// 		cons:['求职/招聘','主题：3542','帖数：3523','【黑马招募令】你辣么优秀机智， ... ','hacker1520']
	// 	},
	// 	con4:{
	// 		srcs:['images/resourceConfig/common_504_icon.png'],
	// 		cons:['影像故事','主题：5678','帖数：832','在最好的时代爱上你','沈唁']
	// 	}
	// },
}
function getData(req,res){

	/*轮播图数据更改函数*/
	Carouselfigure(pageData.slideList);
	/*事业推送信息更改*/
	employment(pageData.hotpushConfig.contents);
	learning(pageData.hotpushConfig.contents);
	classActive(pageData.hotpushConfig.contents);

	otherPagedata(pageData.reads,pageData.studyConfig,pageData.schoolConfig);



	// pageData.slideList=Carouselfigure();
	setTimeout(function(){
		res.write(JSON.stringify(pageData));
		res.end();
	},200);
	
}
module.exports = getData;