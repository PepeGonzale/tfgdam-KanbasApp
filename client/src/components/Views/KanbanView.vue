<template>
  <div
    class="flex mt-4 justify-between items-center w-full px-3 py-2 bg-gray-300"
  >
    <div>
      <span class="drag-handle text-left cursor-move">⠏ </span>
    </div>
    <h3 class="text-md font-semibold">
      {{ props.column.name.toUpperCase() }}
      <span>({{ store.taskByColumn(props.column._id)?.length }})</span>
    </h3>

    <div
      @mouseover="isEdit = true"
      @mouseleave="isEdit = false"
      class="relative md:inline-block hidden"
    >
    <button
        class="hover:bg-gray-300 w-auto p-2 rounded-md grid place-content-center"
       
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </button>
    <div
        class="absolute right-0 w-36 origin-center bg-white border border-gray-200 rounded-md shadow-lg divide-y divide-gray-100 z-10"
        :class="isEdit ? 'block' : 'hidden'"
        
      >
      <div class="grid relative">
        <span @click="createColumn(props.column)" class="p-2 hover:bg-green-400 cursor-pointer rounded-md">Edit</span>
        <span @click="deleteColumn(props.column)" class="p-2 hover:bg-red-200 cursor-pointer rounded-md">Delete</span>
      </div>
      </div>
    
      
      
        
      
    </div>
  </div>
  <div class="w-full flex flex-col h-[680px] bg-gray-200">
    <div class="flex-1">
      <Column :column="props.column" />
    </div>
    <CreateTask :column="props.column" />
  </div>
</template>
<script lang="ts" setup>
import { useStore } from '@/stores/store';
import Column from "@/components/Column/Column.vue";
import {ref} from "vue"
import CreateTask from "@/components/Modals/CreateTask.vue";
import { layoutStore } from '@/stores/LayouStore';

const store = useStore();
const useLayoutStore = layoutStore();
const isEdit = ref(false)
const props = defineProps({
    column: {
        type: Object,
        required: true
    }
})
const createColumn = (e) => {
  
  useLayoutStore.modalContent = "createColumn"
  useLayoutStore.drawerOpen = true
  useLayoutStore.columnData = e
}
const deleteColumn = (e) => {
  useLayoutStore.modalContent = "delete"
  useLayoutStore.drawerOpen = true
  useLayoutStore.columnData = e
  
}
</script>
