<template>
    <div>
        <loginwindow></loginwindow>
        <Alert></Alert>
    </div>
</template>

<script>
    import Alert from './../backSystem/pagecontent/alert.vue'
    import loginwindow from './loginwindow.vue'
    export default {
        name: 'backSystem',
        components:{
        'Alert':Alert,
        'loginwindow':loginwindow
        }
    }
</script>

<style>
*{padding:0;margin:0;}
body,html{height:100%;width:100%;}
ul{list-style: none;}
/*background:url('/static/img/login/loginbg.png');*/
</style>

