<template>
    <div class="lesson">
        
    </div>
</template>

<script>
export default {
    name:"lesson",
    props:{
        information:{
            title:String,
            description:String,
            files:[],
            attendance_date: Date,
            teachers:[],
            status:String,

        }
    }
}
</script>