<template id="paging">
    <div class="hotpust-paging">
        <ul class="paging-list">
            <li class="fa fa-arrow-left" @click="pageChange('left')"></li>
            <li v-for="(item,i) in pages" v-show="item<=pageConfig.pageGroupIndex*pageGroupNum&&item>=(pageConfig.pageGroupIndex-1)*pageGroupNum+1" v-text="item" @click="pageChange(item)" :class="{'active':pageConfig.curPage==item}" :key="i">
            </li>
            <li class="fa fa-arrow-right" @click="pageChange('right')"></li>
        </ul>
    </div>
</template>
<script>
    export default{
        name:'paging',
        props:['hotpushName'],
        data(){
            return{
                pageGroupNum:2,//页码数量(可以自定义进行更改)
                pageSize:8
            };
        },
        watch:{//专门监听内部的数据
            pageSize(newValue,oldValue){
                this.pageConfig.pageSize=newValue;
            }
        },
        created(){
            this.pageMsg = this.$store.state.hotpushment[this.hotpushName].pageConfig;
        },
        computed:{
            pageConfig(){
                return this.$store.state.hotpushment[this.hotpushName].pageConfig;
            },
            pages(){
                return Math.ceil((this.pageConfig.total)*1.0/this.pageConfig.pageSize);
            },
            /*总的页码数*/
            pageGroups(){
                return Math.ceil(this.pages*1.0/this.pageGroupNum);
            },
            showNum(){
                return this.pageGroupNum;
            }
        },
        methods:{
            pageChange(num){
                console.log('我是谁');
                console.log(this.pages);
                if(num=='left'&&this.pageConfig.pageGroupIndex>1){
                    this.pageConfig.pageGroupIndex--;
                    return;
                }
                if(num=='right'&&this.pageConfig.pageGroupIndex<this.pageGroups){
                    this.pageConfig.pageGroupIndex++;
                    return;
                }
                if(typeof num=='number'){
                    this.pageConfig.curPage = num;
                    this.$emit('get-data');
                }
            }
        }
    }
</script>
<style scoped>
    .hotpust-paging{height:50px;margin-top:40px;position:absolute;bottom:60px;width:100%;margin-left:-40px;}
    .hotpust-paging .paging-list{list-style: none;width: 100%;text-align: center;}
    .hotpust-paging .paging-list>li{display: inline-block;height:40px;width:40px;background:#575456;border-radius: 50%;margin-top:5px;color:#FFFFFF;font-size:20px;line-height: 40px;cursor: pointer;margin-left:15px;}
    .hotpust-paging .paging-list>li.active{background:#F06969;}
    .hotpust-paging .paging-list>li:hover{background:#E9A64F;}
</style>
