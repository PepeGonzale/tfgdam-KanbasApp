<template>
  <li
    class="h-[100px] grid w-screen md:w-auto group gap-4 relative bg-white text-black p-3 m-3 items-center shadow-lg transition-shadow duration-300 hover:shadow-xl rounded-md border-b border-gray-300 hover:cursor-pointer"
    
  >
  
  
  <Transition name="fade">
    <div class="absolute right-1 top-1">
  <div
      @click="optionsTask = !optionsTask"
      class="relative hidden md:inline-block"
      ref="dropdownRef"
    >
    <button
        class="hover:bg-gray-300 w-auto p-1 rounded-md grid place-content-center"
       
      >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg>

      </button>
    <div
        class="absolute right-0 w-36 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg divide-y divide-gray-100 z-10"
        :class="optionsTask ? 'block' : 'hidden'"
        
      >
      <div class="grid relative">
    
          <span @click="handleArchive(props.task._id)" class="p-2 hover:bg-green-400 cursor-pointer rounded-md">Archive</span>
        
        <span @click="deleteTask(props.task._id)" class="p-2 hover:bg-red-200 cursor-pointer rounded-md">Delete from project</span>
      </div>
    
      </div>
        
      
    </div>
  </div>
  </Transition>
  <a class="text-sm md:text-md p-1 hover:underline text-center" @click="editTask(props.task._id, props.task)"><span class="drag-handle text-left cursor-move text-blue-primary">#{{ props.task.taskNum }}</span> {{ props.task.title }}</a>
  <img class="absolute right-0 bottom-0 object-cover rounded-full w-10 h-10 mr-2 mb-2" v-if="props.task.asignedTo?.image" :src="props.task.asignedTo?.image"/>

    
    <!-- <button
    
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
    </button> -->
  </li>
</template>
<script lang="ts" setup>
import { layoutStore } from '@/stores/LayouStore';
import { useStore } from '@/stores/store';
import { ref,onMounted,onBeforeUnmount } from 'vue';
const useLayoutStore = layoutStore()
const store = useStore()
const props = defineProps(['task']);
const optionsTask = ref(false)
const dropdownRef = ref(null);


const handleClickOutside = (event: MouseEvent) => {
  if (!dropdownRef.value?.contains(event.target as Node)) {
    optionsTask.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
const deleteTask = async(id:string) => {
  store.selectedTaskId = id
  await store.deleteTask()
}
const handleArchive = async (taskId: string) => {
  console.log(taskId)
  await store.archiveTask(taskId)
}
const editTask = async(id: string, task: any) => {
  store.selectedTaskId = id
  const res = await store.taskInfo()
  console.log(res)
   store.taskDefault = {
    title: res.data.title,
    description: res.data.description,
    status: res.data.status,
    comments: res.data.comments,
    priority: res.data.priority,
    asigned: res.data.createdBy
  } 
  
  
  useLayoutStore.drawerOpen = true
  useLayoutStore.modalContent = "editTask"
  
}
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
