<template id="classactivity">
    <div class="employment">
        <hotpush :hotpush-name="'classactivity'"></hotpush>	
    </div>
</template>
<script>
    import hotpush from  '../hotpushs/hotpush.vue'
    import hotpushwindow from '../hotpushs/hotpushwindow.vue'
    export default{
        name:'classactivity',
        components:{
            'hotpush':hotpush,
            'hotpushwindow':hotpushwindow
        }
    }
</script>