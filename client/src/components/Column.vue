<template>
  
   <div class="flex gap-6 border text-center bg-gray-100 max-h-full w-72">
    <section
      class="min-w-[250px] last:pr-6 box-content items-center w-80">
      <div class="flex items-center gap-3 pb-6 ">
        <div class="rounded-full h-4 w-4"></div>
        
        <h2 class="text-medium-grey font-bold text-xs uppercase">
          {{ column.name }}
        </h2>
        
      </div>
      <div class="">
    <Draggable ghost-class="ghost" drag-class="drag" v-model="tasks" group="tasks" item-key="id" class="space-y-3">
      
      <template #item="{element}">
        <TaskVue class="w-full hover:bg-lessblack list-group-item" :task="element"/>
        </template>
        </Draggable>
  </div>
    </section>
    
</div>

     
</template>
<script lang="ts" setup>
import { useStore } from '@/stores/store';
import { ref } from 'vue';
import TaskVue from './Task.vue';
import Draggable from "vuedraggable"
const store = useStore()
const props = defineProps({
  column: {
    type: Object,
    required: true
  }
})
const tasks = ref(store.selectedBoard?.tasks)




</script>