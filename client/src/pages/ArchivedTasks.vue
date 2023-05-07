<template>
<Default>
    <div class="mt-8 ml-8 flex gap-2 cursor-pointer" @click="router.go(-1)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
</svg>

        <span class="font-semibold text-xl">Archive</span>
    </div>
    <div
    class="items-center justify-between flex cursor-pointer m-auto bg-gray-500 mt-12 w-3/5 p-3"
    
  >    <form @input="handleSearch" class="mx-auto hidden lg:flex bg-white border-4 -space-x-px rounded-md flex-1 shadow-sm items-center relative">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20" class="icon opacity-50 left-2 z-10 absolute pointer-events-none">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>
<input v-model="search" placeholder="Search Tasks..." type="text" class="bg-white rounded-md font-medium border-gray-300 text-sm w-full p-2 pl-10 text-gray-500 z-0 inline-flex items-center"/>
    </form>
</div>


    <div class="flex-1 w-3/5 mx-auto mt-12">
      <ul
        v-for="project in store.archiveTask"
        :key="project?._id"
        class=" "
        
      >
        <li class="bg-gray-200 hover:bg-gray-300 p-3 cursor-pointer text-black text-center">
        {{ project?.title }}
        </li> 
        
      </ul>
    </div>
  
</Default>
</template>

<script setup lang="ts">
import Search from '@/components/Search.vue';
import { api } from '@/helpers/axios';
import Default from '@/layouts/Default.vue';
import { useStore } from '@/stores/store';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const store = useStore()
const router = useRouter()
let tasks  = []
onMounted(async () => {
await store.getBoard(router.currentRoute.value.params.id)
const res = await api.get(`/board/archived/${store.selectedBoard?._id}`).then((res) => {
  console.log(res)
store.archiveTask = res.data
    
})
})


</script>