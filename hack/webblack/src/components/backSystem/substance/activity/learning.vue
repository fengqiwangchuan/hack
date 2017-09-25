<template id="learning">
    <div class="employment">
        <hotpush :hotpush-name="'learning'"></hotpush>
    </div>
</template>
<script>
    import hotpush from  '../hotpushs/hotpush.vue'
    import hotpushwindow from '../hotpushs/hotpushwindow.vue'
    export default{
        name:'learning',
        components:{
            'hotpush':hotpush,
            'hotpushwindow':hotpushwindow
        },
    }
</script>