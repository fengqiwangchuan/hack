# hack
一个从前到后的整站项目

  技术栈：css3.0+javascript+jquery+vue2.0+vuex+vue-resource、node.js、mongodb、express
  
  前言:
    
    现在比较流行的是前后端分离的开发模式，本项目正是使用这种开发模式。
    开发一个整站项目，最需要解决的问题就是数据交互问题，所以，我们在开发前已经约定好数据格式
   
   以下是我们的数据格式参考：
      首页：
      内容数据表(clientContent):

      1.轮播图(Carouselfigure)：
      Carouselfigure:
      [
          {src:'img/1.jpg',content:'显示内容'},
         {src:'img/2.jpg',content:'显示内容'},
      ....  
      ]
      轮播图标签自定：但是后台只提供对应的数据，前台要进行渲染

      2.热门活动(activity);
      {title:'',src:'图片路径',time:'更新日期'};


      3.推送信息(hotpush),
      数据格式:相同，但是放在同一张表里的不同数组来控制内容，要求高度自适应

      就业薪资(emplyment)：
      [content:'',data:'',isHot:''，src:'该文章标题点击后连接的真正地址'];
      是否热门，热门文章样式更改

      学习经历(learning):
      班级活动（classactivity）:


      4.  联系我们(contactus)
      方式(ways)：
      {phone:''}
      wechat:{weibo:"src",weChat:"src"}


      5.主要内容板块(container)：
      展示简短新闻：
      showmessage:
      [{message:'',data:''},{message:'',data:''}]

      帖子展示(postdisplay)：

      在这里点击某一条会跳转到论坛页：

      数据格式:
      [
        {topic:'文章名',username:'用户名',发表时间},
        {topic:'文章名',username:'用户名2',发表时间},
      ]




      论坛页：数据库(forum)

      新增帖子。出现编辑框，限制输入内容长度，
      发送
      {topic：‘文章名’,username:'用户名',data:'发表时间',content:''}
      到服务器
      [
        {topic:'文章名',username:'用户名',data:'发表时间',content:''},
        {topic:'文章名',username:'用户名2',data:'发表时间',content:''},
      ]


      登录页：
      向后台验证用户信息：前台使用
      验证成功：后台会发送
      {
        usernmae:'',
        headImg:'
        src:'',
        post:{
          //帖子信息
          {title:'标题头',content:'内容',data:'发表时间'},
          {},
          {},
        }
      }

      注册页：
      内容：
      选择上传头像；
      发送用户名、密码
    
    
    数据约定好之后，接下来就是前后台可以同步进行啦！
    
    
    
一.使用介绍：

  1.该项目使用的是express框架搭建的服务器，所以你需要在项目中下载express
    cmd命令：npm install express -save
    
    
  2.服务器运行只能看到前台页面数据（暂存了一份数据在服务器上），
  
  3.前台显示的数据需要在mongo数据库中创建。
  
  4.想要看到后台管理页面，cmd命令下运行node app.js，在浏览器端打开 http://localhost:8080 端口即可查看.
  
  

二  . 页面介绍：
  前台：一共8个页面，包括首页、社区、登录、注册、用户个人信息页（修改个人信息页，个人信息展示页，个人帖子页面）、首页列表渲染页。
      
     
     首页：轮播图，返回顶部，列表，帖子预览，页面切换
      
    
    列表渲染页：默认不显示，点击列表项跳转该页面对应渲染。
     
   
     登录注册：受管理员用户限制，需要后台验证。
     
     
     个人信息页：用户登录后才可跳转到该页面，并且显示用户信息和该用户发过的帖子，用户可进行修改。
      
    
     社区：用户登录后可以发帖，自由评论，不登陆只可浏览页面。
      
      
 
  后台：首页是信息预览页面，左边是一个导航栏，右边是显示区域，总览页包括轮播图，帖子数量，用户信息等，可进行增删改查操作。
       首页内容展示区有两个图表，是使用插件echarts生成，方便管理员用户直观的查看数据变化，是一个较好的用户体验。
       
       左边点击相应的导航按钮，可以跳转相应板块，进行大图预览。同样可以进行增删改。
       
       
       后台数据与前台页面显示数据一致，后台可以方便的操控前台页面。
       
       
       
  
  静态预览：
       <a href="https://yidongying.github.io/hack/hack/public/black_productor/client/index.html">前台页面</a>
       
  后台截图：
    hack/screensheet.png
  
