<template>
	<popwindow :is-show='$store.state.alert.isShow'>
        <div slot="header" class='alert-header'>
            <span @click='$store.commit("alert/close")'>×</span>
            <h2>提示:</h2>
        </div>
        <div slot="body" class="alert-body">
            <h2 v-text="$store.state.alert.msg"></h2>
        </div>
        <div slot="footer" class='alert-footer'>
            <input type="button" value="确定" @click='$store.commit("alert/close")'>
        </div>
    </popwindow>
</template>
<script>
import popwindow from './popwindow.vue'
export default{
    name: 'alert',
    components:{popwindow}
}
</script>
<style>
    .alert-header{
        /* position:absolute;left:0;top:0; */
        background-color:#3F4040;
        width:100%;
        padding:5px 5px;
        overflow:hidden;
    }
    .alert-header>h2{
        padding:0 20px;
        color:white;text-indent: 1em;
        font-size:18px;

    }
    .alert-header>span{
        float:right;color:white;
        width:30px;height:30px;
        font-size:25px;
        border-radius:15px;
        line-height:30px;
        border:1px solid white;
        text-align:center;
        margin-top:5px;
        margin-right:10px;
        cursor:pointer;
    }
    .alert-header>span:hover{
        box-shadow:0 0 5px 1px #ccc;
    }
    .alert-body>h2{font-size:18px;padding:15px 65px;}
    .alert-footer{
        overflow:hidden;
        border-top:1px solid #E4E4E4;
        background-color:#F1F1F1;
        text-align:center;
        padding:10px 5px;

    }
    .alert-footer>input{
        float: right;
        font-size:14px;
        margin-bottom:5px;
        margin-right:20px;
        background-color:#3F4040;
        color:white;
        border:none;
        padding:5px 10px;
        border-radius:5px;
        cursor:pointer;
    }
    .alert-footer>input:hover{
        box-shadow:0 0 5px 1px #333;
    }
</style>
