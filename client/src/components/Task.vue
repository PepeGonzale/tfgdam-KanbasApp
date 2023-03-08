<template>
<article class="group flex flex-col bg-white border dark:bg-dark-grey p-7 rounded-lg cursor-pointer shadow-task max-w-[280px]">
    <h3 class="text-black font-bold group-hover:text-main-purple select-none">{{ task.title }}</h3>
    <p class="text-xs text-medium-grey mt-3 text-black font-bold select-none">{{ task.description }}  </p>
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