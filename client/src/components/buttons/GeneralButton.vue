<template>
    <button @click="handleSubmit" type="submit" class="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded border-blue-600 dark:border-blue-500 ring-blue-300 dark:ring-blue-700 bg-blue-primary dark:bg-blue-500 text-white hover:bg-blue-secundary hover:border-blue-700 hover:dark:bg-blue-600 hover:dark:border-blue-600 py-2 px-3 mr-3 last:mr-0 mb-3">
                    <span class="px-2">{{text}}</span>
                </button>
</template>
<script lang="ts" setup>
const props = defineProps({
    text: {
        type:String,
        required: true
    }
})
const emits = defineEmits(['submit'])
const handleSubmit = () => {
    emits('submit')
}
</script>