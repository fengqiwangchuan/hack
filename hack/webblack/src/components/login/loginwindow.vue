<template id="login">
    <transition enter-active-class="rubberBand" leave-active-class="hinge">
        <div class="login-wrapper animated"  v-show="wrappershow">
            <div class="login-title" >
                <span class="login-logo"></span>
                <h3 class="login-title-message">后台管理系统</h3>
            </div>
            <div class="login-content">
                <form action="http://localhost:8080/login/user/test" method="post">
                    <ul>
                        <li>
                            <div class="login-username">
                                <label for=""><span class="fa fa-user"></span><input type="text" name="username" placeholder='用户名' v-model="username" v-on:blur="usjudge" @keyup="usjudge"></label>
                                <span class="showerr" v-show="usererror">用户名格式错误</span>
                            </div>
                        </li>
                        <li>
                            <div  class="login-password">
                                <label for=""><span class="fa fa-key"></span><input type="password" name="password" placeholder='密码' v-model="password" v-on:blur="pswjudeg" @keyup="pswjudeg"></label>
                                <span class="showerr" v-show="pswderror" >请输入密码</span>
                            </div>
                        </li>
                        <li class="login-test">
                            <div  class="login-idcode">
                                <label for=""><span class="fa fa-magic"></span><input type="text" name="idcode" placeholder='验证码' v-model="idcode" v-on:blur="idcojudeg" @keyup="idcojudeg"></label>
                                <span class="showerr" v-show="idcodeer"
                                >格式错误</span>
                            </div>
                            <div class="login-idnum" @click="rtnNum">
                                <label for=""><span v-text="idnum"></span></label>
                            </div>
                        </li>
                        <li class="submit">
                            <div><input type="submit" value="登录"  @click="ispass($event)"></div>
                        </li>
                    </ul>
                        
                </form>
                <div class="transfer">
                    <a href="../../black_productor/client/assist-page/login.html">切换用户登录</a>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    export default{
        name:'login',
        data:function(){
            return{
                idnum:'',
                wrappershow:false,
                username:'',
                usererror:false,
                password:'',
                pswderror:false,
                idcode:'',
                idcodeer:false,
                idcodeArr:{
                    num:[0,1,2,3,4,5,6,7,8,9],
                    letters:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
                },
            };
        },
        
        mounted:function () {
            //这里是vue初始化完成后执行的函数
            this.wrappershow = true;
            this.$nextTick(function () {
            //应该是这里执行关闭动画
            });
        },
        components:{

        },
        watch:{
        },
        computed:{
            state:function(){
                return this.$store.state.alert;
            }
        },
        created:function(){
            this.rtnNum();
            var username = localStorage.getItem('username');
            var password = localStorage.getItem('password');
            this.autoverify(username,password);
        },
        methods:{
            /*能否通过验证*/
            ispass:function(ev){
                ev.preventDefault();
                var reg = '/'+this.idnum+'/gi';
                reg = ''+reg+'.test("'+this.idcode+'")';
                /*用户名密码是否填写完整*/
                if(this.username==''||this.password==''||this.idcode==''){
                    this.state.isShow=true;
                    this.state.msg='请输入登录信息';
                    // alert('请输入登录信息');
                    return;
                }
                /*验证码是否是否正确*/
                if(!eval(reg)){
                    this.state.isShow=true;
                    this.state.msg='请输入正确验证码';
                    // alert('请输入正确验证码');
                    return;
                }
                /*如果信息填写正确发送服务器请求*/
                this.successfulVerify(this.username,this.password);
                
            },
            /*验证码生成规则*/
            rtnNum:function(){
                this.idnum ='';
                for(var i=0,n='';i<3;i++){
                    n= Math.floor(Math.random()*this.idcodeArr.num.length);
                    this.idnum+=n;
                }
                for(var i=0,n='';i<1;i++){
                    n= Math.floor(Math.random()*this.idcodeArr.letters.length);
                    n=this.idcodeArr.letters[n];
                    this.idnum+=n;
                }
            },
            /*用户名格式提示*/
            usjudge:function(){
                if(this.username.length<5){
                    this.usererror = true;
                }else{
                    this.usererror = false;
                }
            },
            /*密码格式提示*/
            pswjudeg:function(){
                if(this.password.length==0)
                    this.pswderror=true
                else 
                    this.pswderror=false;
            },
            idcojudeg:function(){
                if(this.idcode.length!=4)
                    this.idcodeer=true
                else 
                    this.idcodeer=false;
            },
            successfulVerify:function(username,password){
                this.$http({
                    url:"http://localhost:8080/login/user/test",
                    method:'POST',
                    data:JSON.stringify({username:username,password:password})
                }).then(function(res){
                    if('ok'==res.data){
                        localStorage.setItem('username',this.username);
                        localStorage.setItem('password',this.password);
                        window.location.href='http://localhost:8080/client/index.html';
                    }else{
                        this.$store.commit('alert/open','用户名或密码错误');
                    }
                });
            },
            autoverify:function(username,password){
                if(username!=null&&password!=null){
                    this.username = username;
                    this.password = password;
                    this.idcode = this.idnum;
                }
            }
        }
    }
</script>
<style scoped>
    /* 公共样式 */
    *{padding:0;margin:0;}
    body,html{height:100%;width:100%;}
    ul{list-style: none;}
    body{background:url(/static/img/login/login-bg.png);}

    /* 公共样式End */

    /* 字体
    /* 字体图标结束 */




    /* 登录框style */

    /* 整体框子style */
    .login-wrapper{border:1px solid #dadada;box-shadow: 0 9px 30px -6px rgba(0,0,0,.2), 0 18px 20px -10px rgba(0,0,0,.04), 0 18px 20px -10px rgba(0,0,0,.04), 0 10px 20px -10px rgba(0,0,0,.04);display:inline-block;position:absolute;left:50%;top:50%;margin-top:-275px;margin-left:-220px;background:#FFFFFF;width:440px;height:550px;border-radius: 15px;animation-delay: .4s;}

    /* 标题部分样式 */
    .login-title{text-align:center;}
    .login-title>.login-logo{margin-top:40px;display:inline-block;height:120px;width:120px;background-image: url(/static/img/login/logo.png);background-size:100% 100%;border-radius: 50%;transition:all 1s;}
    .login-title>.login-logo:hover{transform:rotate(-360deg);}

    .login-title>.login-title-message{margin-top:15px;font-weight:normal;color:#838181;}




    /* 表单区域样式 */
    .login-content{padding-top:30px;width:440px;}
    .login-content ul{text-align: center;margin:0 auto;width:334px;}

    /* 用户名密码验证框star */
    .login-content ul li{margin-bottom:10px;display: inline-block;width:100%;border-radius: 10px;overflow:hidden;border:2px solid #ccc;}

    .login-content ul li:hover{color:#CFCCCC;box-shadow: 0 0 5px 2px #ccc;}
    .login-content .login-username,.login-content .login-password,.login-content .submit{width:330px;height:45px;background: #fff;/* box-shadow: 0 3px 5px -4px rgba(0,0,0,.4) inset, -1px 0 3px -2px rgba(0,0,0,.1) inset; */border-radius: 3px;font-size: 18px;background:#fbfbfb;}

    .login-content ul li div>label{color:#bfbfbf;font-size:30px;}
    .login-content  label span{width:45px;height:45px;display:inline-block;box-sizing: border-box;text-align: center;line-height: 45px;color:#8E8787;}



    .login-content  input{height:100%;display:inline-block;width:280px;outline:none;box-sizing: border-box;padding:0 15px;float:right;color:#818181;border-width:0 0 0 1px;border-style: solid;border-color: #ddd;}

    .login-content input::-webkit-input-placeholder{font-size:17px;color:#C3C4C7;}

    .login-content ul li div{position:relative;}
    .login-content ul li div .showerr{position:absolute;top:0;right:20px;height:21px;background:#d16d62;margin-top:10px;padding:2px 10px;color:#FFFFFF;font-size:12px;line-height: 21px;border-radius: 3px;}


    /* 验证码框样式 */
    .ceshi{text-align: left;}
    .login-content .login-idcode{border-radius: 3px;display: inline-block;float:left;}
    .login-content .login-idcode label span{width:45px;}
    .login-content .login-idcode input{height:45px;width:165px;}

    .login-idnum {display: inline-block;float:right;}
    .login-content .login-idnum:hover{box-shadow: none;}
    .login-content .login-idnum label{font-family: '微软雅黑';display: inline-block;width:100px;background:#D9D6D6;border-radius: 5px;}
    .login-content .login-idnum label span{width:100%;text-align: center;cursor: pointer;}

    /*验证码样式*/

    .login-content .submit{border:none;}
    .login-content .submit:hover{border:none;box-shadow: none;}
    .login-content .submit input{width:330px;height:45px;border-radius:5px;font-size:17px;border:none;color:#f9f9f9;transition:all 1s;opacity:.7;box-shadow: none;cursor: pointer;background: linear-gradient(#6f97e5,#527ed9);}
    .login-content .submit input:hover{opacity:1;border:none;
        box-shadow: inset 0 1px 2px #7ea1e8;color: #fff;text-shadow: #4f70b3 0 -1px 0;border:none;} 
    /* 用户名密码验证框End */

    /* 表单区域样式End */


    /* 切换到前台部分 */

    .login-content .transfer:hover{box-shadow: none;}
    .login-content .transfer{width:100%;height:45px;text-align: center;}
    .login-content .transfer a{text-decoration: none;color:#ccc;}

    /* 切换到前台部分End */

    /* 登录框End */

</style>
