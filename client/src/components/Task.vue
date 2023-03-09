<template>
<article class="group flex flex-col bg-gray-200 items-center border dark:bg-dark-grey p-3 m-4 rounded-lg cursor-pointer shadow-task max-w-[280px] hover:bg-gray-400">
    <h3 class="text-black text-sm font-bold group-hover:text-main-purple select-none">{{ task.title }}</h3>
    <p class="text-xs text-medium-grey mt-3 text-black font-bold select-none"> </p>
  </article>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})
console.log(props.task);

</script>