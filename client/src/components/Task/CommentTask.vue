<template>
    <div v-for="c in props.task.comments">
        <div>
            CreatedBy: {{ c.commentBy }}
        </div>
    {{ c.comment }}
    </div>
</template>

<script lang="ts" setup>
const props = defineProps(['task'])

</script>