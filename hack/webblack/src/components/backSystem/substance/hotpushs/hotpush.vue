<template id="hotpush">
    <div class="hotpush">
        <div class="hotpush-option">
            <!-- <div class="dosometing">
                <select name="" id="" class="selectContent">
                    <option value="none">none</option>
                    <option value="All">all</option>
                </select>
                <input type="button" value="删除">
            </div> -->
            <div class="hotpush-search">
                <label :for="'search-'+search.name" v-for="(search,index) in field.fields" :class="'search-'+search.name" :key="index">
                    <span v-text="search.name+':'"></span>
                    <input type="text" :id="'search-'+search.name" v-model="search.defVal" :class="'search-'+search.name" v-if="search.type!='select'">

                    <select name="" :id="'search-'+search.name" v-model="search.defVal" :class="'search-'+search.name" v-else>
                        <option v-for="(option,i) in search.options" v-text="option.name" :value="option.value" :key="i"></option>
                    </select>
                </label>

                <input type="button" class="search-btn" value="搜索" @click="searchItem">
                <input type="button" class="add-btn" value="新增" @click="showhotPopwwindow" v-if="field.isAdd">
            </div>
        </div>

        <table class="hotpus-table">
            <thead>
                <tr class="Titlemessage">
                    <th v-for="(item,index) in field.headers" :class="'Titlemessage-'+field.headClass[index]" v-text="item" :key="index" ></th>

                </tr>
            </thead>
            
            <tbody class="hotpus-table-tbody">
                <tr v-for="(item,index) in artices" :class="{'hotpush-active':item.isDisabled}" :key="index">
                    <td  v-for="(oItem,index) in field.fields" :class="'td-'+oItem.name" :key="index">
                        <input type="text" v-model="item[oItem.name]" :class="'hotpush-'+oItem.name" :disabled="item.isDisabled" v-if="!oItem.type">
        
                        <select name="" id="" :class="'hotpush-options'" :disabled="item.isDisabled" v-model="item.isHot" v-else-if="oItem.type=='select'">
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
        
                        <textarea name="" id="" cols="30" rows="10" :class="'hotpush-'+oItem.name" :disabled="item.isDisabled"  v-else v-model="item.title"></textarea>
                    </td>
                    <td class="td-opreation">
                        <span class="hotpush-del" @click="delitem(item)">删除</span>
                        <span class="hotpush-revise" @click="toggleSave(item)" v-text="item.toggleSave"></span>
                    </td>
                </tr>	
            </tbody>
        </table>

        <paging :hotpush-name="hotpushName" @get-data="getData"></paging>
        <hotpushwindow @add-item="addItem" :hotpush-name="hotpushName" v-if="field.isAdd"></hotpushwindow>
    </div>
</template>
<script>
    import hotpushwindow from './hotpushwindow.vue'
    import paging from './paging.vue'
    export default{
        name:"hotpush",
        props:['father','hotpushName'],
        components:{
            'paging':paging,
            'hotpushwindow':hotpushwindow
        },
        data(){
            return{
                opreation:{reviese:'修改',save:'保存'},
                curOpretion:'修改',
                findInfo:{},
                artices:[],
                oldEl:this.$store.state.menu.newEl
            };
        },
        created(){
            // console.log(this.oldEl.subchild);
            // console.log(this.$store.state.menu.oldEl.subchild);
            this.getData();
            // this.$watch('subchild', function(val,oldval){console.log(val)})
        },
        computed:{
            state(){
                return this.$store.state.hotpushment.fields;
            },
            field(){
                return this.$store.state.hotpushment[this.hotpushName];
            },
            hotpushSearch(){
                return this.$store.state.hotpushment[this.hotpushName].fields;
            }
        },
        methods:{
            //切换保存还是取消
            toggleSave:function(item){
                if(item.toggleSave==this.opreation.reviese){
                    item.toggleSave = this.opreation.save;
                    item.isChecked = true;
                    item.isDisabled = false;
                }
                else{
                    item.toggleSave = this.opreation.reviese;
                    item.isChecked = false;
                    item.isDisabled = true;
                    /*在这里进行保存item操作*/
                    this.$ajax({
                        url:'http://localhost:8080/miancontent/'+this.field.datasheet+'/update',
                        emulateJSON:true,
                        method:'POST',
                        data:JSON.stringify(item),
                    }).then((res)=>{
                        if('1'==res.data){
                            this.$store.commit('alert/open','修改成功');
                        }
                    });
                }
            },
            /*对请求过来的数据进行匹配删除*/
            delitem(item){
                this.$ajax({
                    url:'http://localhost:8080/miancontent/'+this.field.datasheet+'/del',
                    method:'POST',
                    data:JSON.stringify(item.id)
                }).then((res)=>{
                    if(res.data=='1'){
                        this.$store.commit('alert/open','删除成功');
                        for(var i in this.artices){
                            if(this.artices[i].id=item.id){
                                this.artices.splice(i,1);
                                var findInfo = {};
                                this.getData();
                                return;
                            }
                        }
                    }
                });
            },
            showhotPopwwindow(){
                this.$store.commit('hotpuswindow/open');
            },
            //增加一项
            addItem(){
                var data = this.$store.state.hotpuswindow.items;
                /*for(var i in this.artices){
                    if(this.artices[i].id==data.id){
                        this.$store.commit('alert/open','存在相同id');
                        return;
                    }
                }*/
                data = JSON.stringify(data);
                this.$ajax({
                    url:'http://localhost:8080/miancontent/'+this.field.datasheet+'/add',
                    method:'POST',
                    data:data
                }).then((res)=>{
                    if(res.data=='1'){
                        this.$store.commit('hotpuswindow/close');
                        this.$store.commit('alert/open','新增成功');
                        this.getData();	
                    }
                });
            },
            //发送搜索请求
            searchItem(){
                this.field.pageConfig = {pageSize:8,curPage:1,total:0,pageGroupIndex:1};
                for(var i in this.hotpushSearch){
                    if(!this.hotpushSearch[i].type)
                        this.findInfo[this.hotpushSearch[i].name]=this.hotpushSearch[i].defVal;
                    else{
                        this.findInfo[this.hotpushSearch[i].name] ={
                            value:this.hotpushSearch[i].defVal,
                            type:this.hotpushSearch[i].type
                        };
                    }
                }
                this.getData();	
            },
            getData(){
                //点击搜索的时候在去获取搜索框里面的内容
                this.$ajax({
                    url:'http://localhost:8080/miancontent/'+this.field.datasheet+'/getAll',
                    method:'POST',
                    emulateJSON:true,
                    data:JSON.stringify({
                        pageInfo:this.field.pageConfig,
                        findInfo:this.findInfo
                    })
                }).then((res)=>{
                    this.findInfo = {};
                    var artices = [];
                    /*当数据传输过来的时候将数据赋给pageConfig*/
                    this.field.pageConfig.total = res.data.total;
                    this.deepCopy(res.data.data,artices);
                    for(var i in artices){
                        artices[i].isDisabled = true;
                        artices[i].isChecked =false;
                        artices[i].toggleSave ='修改';
                    }
                    this.artices = artices;
                    // this.deepCopy(artices,this.artices);
                });
            },
            deepCopy(obj1,obj2){
                for(var p in obj1){
                    if(Array.isArray(obj1[p]))
                        obj2[p] = obj1[p].slice(0);	
                    else if((typeof obj1[p]=='object')&&obj1[p]!=null){
                        obj2[p] = {};
                        this.deepCopy(obj1[p],obj2[p]);
                    }else
                        obj2[p] = obj1[p];
                }
            },
        }
    }
</script>
<style scoped>
    /* 公共样式 */

    /* 操作栏 */
    .hotpush{background-color:#fff;padding:60px 40px 70px 40px;border-radius: 10px;min-width:650px;margin-bottom:30px;min-height:550px;margin-top:15px;}
    .hotpush .hotpush-option .selectContent{width:90px;height:35px;outline: none;border-radius: 5px;color:#666666;text-indent: 1.4em;font-size:16px;}
    .hotpush .hotpush-option .selectContent option{text-align: center;border-radius: 5px;}

    /* optionsStar */
    .hotpush .hotpush-option .dosometing{display:inline-block;}

    /* optionEnd */



    /* 搜索框star */
    .hotpush .hotpush-option .dosometing{border:1px solid #A19B9B;width:150px;}
    .hotpush .hotpush-option .hotpush-search{display:inline-block;margin-left:10px;}
    .hotpush .hotpush-option .hotpush-search label{margin-left:10px;font-size:16px;font-family: '微软雅黑'}
    .hotpush .hotpush-option .hotpush-search input{width:60px;outline: none;margin-left:10px;height:25px;}
    .hotpush .hotpush-option input.search-title{width:130px;}
    .hotpush .hotpush-option input.search-data{width:80px;}
    .hotpush .hotpush-option select{outline: none;}
    .hotpush .hotpush-option input.search-btn{padding:5px 10px;background:#818486;color:#fff;border-radius: 5px;outline: none;height:30px;}

    /* 搜索框end */

    /* 操作栏 */




    .hotpush .hotpush-list{margin-top:30px;list-style: none;}
    .hotpush .hotpush-list li{height:50px;border-bottom:1px dashed  #9F9A9A;position:relative;}

    /* 导航栏放什么东西 */

    /*  */

    /* 内容样式 */




    /* 标题样式设置 */
    .hotpush .Titlemessage{list-style: none;height: 40px;margin-bottom:15px;}
    .hotpush .hotpus-table{margin:20px;min-width: 500px;}
    .hotpush .hotpus-table thead{padding-bottom:20px;}
    .hotpush .hotpus-table .Titlemessage th{border:1px solid #ccc;line-height: 20px;text-align: center;font-size:15px;border-radius: 12px;font-weight: normal;}

    /* 标题样式设置End */



    /* 内容区域设置Star */
    .hotpush .hotpus-table-tbody:before {line-height:1.2em; content:"\200C"; display:block;}
    .hotpush .hotpus-table-tbody tr{height:50px;/* border-bottom:1px dashed  #9F9A9A; */position:relative;}
    .hotpush .hotpus-table-tbody>tr>td{border-bottom:1px dashed  #9F9A9A;border-collapse:collapse;}
    .hotpush .hotpus-table-tbody>tr>td>input{border:1px solid #6BB2B0;text-align: center;}
    .hotpush .hotpus-table-tbody>tr>td.td-id{padding:0 20px;}
    .hotpush .hotpus-table-tbody>tr>td>.hotpush-id{width:30px;border:1px solid #7F7A7A;border-color:rgba(0,0,0,0.4);border-radius: 5px;}
    .hotpush .hotpus-table-tbody>tr>td>.hotpush-title{border:1px solid #6BB2B0;resize: none;height:40px;width:240px;background:white;text-align: center;box-sizing: border-box;}
    .hotpush .hotpus-table-tbody>tr>td.td-isHot{padding:0px 20px;} 
    .hotpush .hotpus-table-tbody>tr>td.td-isHot>.hotpush-options{width:60px;}
    .hotpush .hotpus-table-tbody>tr>td.td-src input{width:150px;}
    .hotpush .hotpus-table-tbody>tr>td.td-data input{width:80px;}
    .hotpush .hotpus-table-tbody>tr>td.td-opreation{padding:0 20px;}
    .hotpush .hotpus-table-tbody>tr>td.td-opreation span{cursor: pointer;display:inline-block;border:1px solid #ccc;padding:5px 10px;background:#B88A8A;border-radius: 6px;color:white;}
    .hotpush .hotpus-table-tbody>tr>td>input{background:white;}

    /* 内容区域设置End */



    /* 设置input禁用时，和textarea禁用时的样式Star */
    .hotpush .hotpus-table-tbody .hotpush-active td input{border-color:rgba(0,0,0,0);box-shadow: none;}
    .hotpush .hotpus-table-tbody .hotpush-active td input.hotpush-id{border-color:rgba(0,0,0,0.4);}

    .hotpush .hotpush-list .hotpush-active td input[disabled]{background:white;}

    .hotpush .hotpus-table-tbody>tr>td>.hotpush-title[disabled]{background:white;border-color:rgba(0,0,0,0);}
    /* 设置input禁用时，和textarea禁用时的样式End */


</style>
