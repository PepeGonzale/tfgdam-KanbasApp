<template>
<div class="group flex flex-col bg-white dark:bg-dark-grey p-4 rounded-lg cursor-pointer shadow-task max-w-[280px]">
    <h3 class="text-black dark:text-white font-bold group-hover:text-main-purple select-none">{{task.name}}</h3>
    <p class="text-xs text-medium-grey font-bold select-none">{{ task.title }}  </p>
  </div>
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