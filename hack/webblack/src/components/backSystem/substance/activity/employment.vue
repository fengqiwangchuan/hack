<template id="employment">
    <div class="employment">
        <hotpush :hotpush-name="'employment'"></hotpush>
    </div>
</template>
<script>
    import hotpush from  '../hotpushs/hotpush.vue'
    import hotpushwindow from '../hotpushs/hotpushwindow.vue'
    export default{
        name:'employment',
        components:{
            'hotpush':hotpush,
            'hotpushwindow':hotpushwindow
        },
    }
</script>