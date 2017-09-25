<template id="hotpushwindow">
    <div>
        <popwindow :is-show='$store.state.hotpuswindow.isShow'>
            <div slot="header" class='alert-header'>
                <span @click='$store.commit("hotpuswindow/close")'>×</span>
                <h2>新增内容</h2>
            </div>
            <div slot="body" class="hotpushwindow-body">
                <ul>
                    <li>
                        <label for="">data:</label>
                        <input type="text" v-model="state.data">
                    </li>
                    <li>
                        <label for="">src:</label>
                        <input type="text" v-model="state.src">
                    </li>
                    <li>
                        <label for="">isHot:</label>
                        <select v-model="state.isHot">
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                    </li>
                    <li class="textareaLi">
                        <label for="">title:</label>
                        <textarea name="" id="" cols="30" rows="10" v-model="state.title"></textarea>
                    </li>
                </ul>
            </div>
            <div slot="footer" class='alert-footer'>
                <input type="button" value="确定" @click="addItem">
            </div>
        </popwindow>
    </div>
</template>
<script>
    import popwindow from '../../pagecontent/popwindow.vue'
    export default{
        name:'hotpushwindow',
        props:['hotpushName'],
        components:{
            'popwindow':popwindow
        },
        created(){
            
        },
        computed:{
            state(){
                return this.$store.state.hotpuswindow.items;
            }
        },
        methods:{
            addItem(){
                this.$emit('add-item');
            }
        }
    }
</script>
<style scoped>
    .hotpushwindow-body{min-width: 350px;min-height:200px;}
    .hotpushwindow-body ul{list-style: none;}
    .hotpushwindow-body ul li{height:20px;margin-top:20px;text-align: center;vertical-align: top;position: relative;}
    .hotpushwindow-body ul li label{width:70px;display: inline-block;}
    .hotpushwindow-body ul li input{border:1px solid #B1B1B1;height:100%;width:170px;outline: none;}
    .hotpushwindow-body ul li select{height:100%;width:170px;}
    .hotpushwindow-body ul li textarea{width:170px;height:60px;resize: none;border:1px solid #B1B1B1;outline: none;display: inline-block;}

    .hotpushwindow-body ul li.textareaLi label{height:60px;transform:translateY(-45px);}
	

</style>
