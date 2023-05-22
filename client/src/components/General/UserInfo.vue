<template>
    <div :class="visible ? 'block' : 'hidden'" class="tooltip absolute bg-gray-800 text-white px-2 py-1 rounded">{{props.text}}</div>
</template>
<script lang="ts" setup>
const props =  defineProps({
    text: {
        type: String,
        required: true
    },
    visible: {
        type: String,
        
    },

})
</script>