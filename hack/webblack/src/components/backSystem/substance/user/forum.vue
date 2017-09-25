<template id="forum">
    <div class="employment">
        <hotpush :hotpush-name="'forum'"></hotpush>	
    </div>
</template>
<script>
    import hotpush from  '../hotpushs/hotpush.vue'
    import hotpushwindow from '../hotpushs/hotpushwindow.vue'
    export default{
        name:'forum',
        components:{
            'hotpush':hotpush,
            'hotpushwindow':hotpushwindow
        },
    }
</script>