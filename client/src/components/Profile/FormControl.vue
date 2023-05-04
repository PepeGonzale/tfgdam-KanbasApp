<template>

<form @submit.prevent="submit" class="rounded-2xl flex-col bg-gray-200 flex">
        
            <slot></slot>
        
            </form>
</template>

<script lang="ts" setup>
const emits = defineEmits(['submit'])
const submit = (e) => {
    emits('submit', e)
}
</script>