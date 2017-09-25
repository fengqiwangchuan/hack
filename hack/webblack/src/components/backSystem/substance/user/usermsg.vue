<template id="user">
    <div class="employment">
        <hotpush :hotpush-name="'user'"></hotpush>	
    </div>
</template>
<script>
    import hotpush from  '../hotpushs/hotpush.vue'
    import hotpushwindow from '../hotpushs/hotpushwindow.vue'
    export default{
        name:'user',
        components:{
            'hotpush':hotpush,
            'hotpushwindow':hotpushwindow
        }
    }
</script>