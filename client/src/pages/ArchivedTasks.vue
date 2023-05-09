<template>
<Default>
  <div class="bg-blue-primary h-screen">
    <div class="mt-8 ml-8 flex gap-2 cursor-pointer " @click="router.go(-1)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
</svg>

        <span class="font-semibold text-xl">Archive</span>
    </div>
    <div
    class="items-center justify-between flex cursor-pointer m-auto mt-12 w-3/5 p-3"
    
  >    <form class="mx-auto hidden lg:flex bg-white border-4 -space-x-px rounded-md flex-1 shadow-sm items-center relative">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20" class="icon opacity-50 left-2 z-10 absolute pointer-events-none">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>
<input placeholder="Search Tasks..." type="text" class="bg-white rounded-md font-medium border-gray-300 text-sm w-full p-2 pl-10 text-gray-500 z-0 inline-flex items-center"/>
    </form>
</div>


    <div class="flex-1 w-3/5 mx-auto mt-12">
      <ul
        v-for="project in store.archivedTask"
        :key="project?._id"
        class="relative"
        
      >
        <li class="justify-between border-b-2 items-center border-gray-500 border-2 flex rounded-md bg-gray-200 p-3 text-black text-center">
        <div class="items-center space-x-2 hover:cursor-pointer">
          <input type="checkbox" class="rounded-md bg-gray-200 hover:cursor-pointer" @change="handleCheckbox(project)" v-model="project.checked"/>
          <span>{{ project?.title }}</span>
        </div>
        <div class="absolute right-1 top-1">
  <div
      @click=""
      class="relative hidden md:inline-block"
      ref="dropdownRef"
    >
    <button
        class="hover:bg-gray-300 w-auto p-1 rounded-md grid place-content-center"
        @click="project.dropdown = !project.dropdown"   
      >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg>

      </button>
    <div
        class="absolute right-0 w-36 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg divide-y divide-gray-100 z-10"
        :class="project.dropdown ? 'block': 'hidden'"
        
      >
      <div class="grid relative">
    
          <span @click="restoreTask(project._id)" class="p-2 hover:bg-green-400 cursor-pointer rounded-md">Restore</span>
        
        <span @click="deleteTask(project._id)" class="p-2 hover:bg-red-200 cursor-pointer rounded-md">Delete from project</span>
      </div>
    
      </div>
        
      
    </div>
  </div>
        </li> 
        
      </ul>
    </div>
  </div>
</Default>
</template>

<script setup lang="ts">
import Search from '@/components/Search.vue';
import { api } from '@/helpers/axios';
import Default from '@/layouts/Default.vue';
import { useStore } from '@/stores/store';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const store = useStore()
const router = useRouter()
const dropdown = ref(false)
let tasksSelected = []
onMounted(async () => {
await store.getBoard(router.currentRoute.value.params.id)
const res = await api.get(`/board/archived/${store.selectedBoard?._id}`).then((res) => {

store.archivedTask = res.data
  store.archivedTask.forEach((task) => {
    task.dropdown = false
    task.checked = false
  })
})
})
const deleteTask = async (taskId:string) => {
  store.selectedTaskId = taskId;
  await store.deleteArchiveTask()
}
const restoreTask = async (taskId: string) => {
  const res = await api.post(`board/${store.selectedBoard?._id}/restore/${taskId}`)
  console.log(res)
  store.archivedTask = res.data.archivedTasks
  store.selectedBoard.tasks = res.data.tasks
}
const handleCheckbox = (e) => {
  tasksSelected.push(e)
}
</script>