<template>
   <div class="flex gap-6 ">
    <section data-dragscroll
      class="min-w-[280px] last:pr-6 box-content">
      <div class="flex items-center gap-3 pb-6 ">
        <div class="rounded-full h-4 w-4"></div>
        <h2 class="text-medium-grey font-bold text-xs uppercase">
          {{ column.name }}
        </h2>
      </div>
      <div class="">
        <TaskVue v-for="task in store.selectedBoard?.tasks.filter(t => t.status._id === column._id)" :key="task._id" :task="task"/>
    </div>
    </section>
</div>

     
</template>
<script lang="ts" setup>
import { useStore } from '@/stores/store';
import TaskVue from './Task.vue';

const props = defineProps({
  column: {
    type: Object,
    required: true
  }
})



const store = useStore()
</script>