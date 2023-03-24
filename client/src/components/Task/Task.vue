<template>
  <li
    class="group gap-4 relative flex flex-col bg-white p-3 items-center shadow-lg transition-shadow duration-300 hover:shadow-xl rounded-md border-b border-gray-300 hover:bg-gray-50 hover:cursor-pointer"
    @click="editTask(props.task._id, props.task)"
  >
  

    <a class="text-sm"><span class="drag-handle text-left cursor-move">#{{ props.task.taskNum }}</span> {{ props.task.title }}</a>
    <div class="text-sm" :class="task.priority === 'high' ? 'bg-red-900': 'bg-blue-900'">
      Priority: {{ task.priority }}
    </div>
    <div class="text-sm">
      <CommentTask :task="task"/>
    </div>
    <button
    @click="deleteTask(props.task._id)"
      class="absolute text-red-500 top-1 right-1 w-8 h-8 mt-2 bg-gray-50 place-content-center hidden group-hover:grid rounded-md hover:text-black hover:bg-red-400"
     
    >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
    </button>
    <button
    @click="editTask(props.task._id, props.task)"
      class="absolute top-1 right-10 m-auto w-8 h-8 mt-2 bg-gray-50 place-content-center hidden group-hover:grid rounded-md text-green-600 hover:text-black hover:bg-green-200"
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
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
    </button>
  </li>
</template>
<script lang="ts" setup>
import { layoutStore } from '@/stores/LayouStore';
import { useStore } from '@/stores/store';
import CommentTask from './CommentTask.vue';
const useLayoutStore = layoutStore()
const store = useStore()
const props = defineProps(['task']);
const deleteTask = async(id:string) => {
  store.selectedTaskId = id
  console.log(id);
  
  await store.deleteTask()
}
const editTask = (id: string, task: any) => {
  
  store.selectedTaskId = id
  
  
  store.taskDefault = {
    title: task.title,
    description: task.description,
    status: task.status,
    comments: task.comments,
    priority: task.priority
  }
  useLayoutStore.drawerOpen = true
  useLayoutStore.modalContent = "editTask"
  console.log('[task]',store.taskDefault);
  
}
</script>
<style scoped>
</style>
