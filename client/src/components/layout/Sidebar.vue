<template>
 <div class="relative flex justify-between min-h-screen ">
    <div v-if = "useLayoutStore.open" class="bg-gray-900 text-cyan-100 w-64 space-y-6 py-4 absolute inset-y-0 left-0 transform -translate-x-full transition duration-200 ease-in-out md:relative md:translate-x-0">
        <a href="" class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
</svg>
<span class="text-2xl font-extrabold text-white ml-2">Laraveler</span>
        </a>
        <div class="cursor-pointer hover:bg-gray-300 " @click="useLayoutStore.open = !useLayoutStore.open">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
</svg>
</div>
        <nav class="w-full py-4">
            <div v-for="(board, index) in store.boards" :key="index" class="px-2" @click="handleSelectedBoard(board)">
            <div class="flex items-center border-4 px-4 py-3 border-white cursor-pointer hover:border-black" :class="{selectBoard: 'bg-white'}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
</svg>
<span class="text-white ml-2">{{board.title}}</span>
</div>
        </div>
             <div class="fixed bottom-20 w-full bg-black">
                
               <button class="flex items-center p-4 text-white bg-gray-800 hover:bg-gray-600 w-full rounded showModal" @click="createBoard"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
  Create board
</button>
<button class="flex items-center p-4 text-white bg-gray-800 hover:bg-gray-600 w-full rounded showModal" @click="useAuthStore.logout"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
  Logout
</button>
                </div>  
        </nav>      
    </div>
    <!-- Main content -->
    <div class="w-full">
    <div class="justify-between bg-white flex shadow py-6">
      <div class="flex items-center">
        <button @click =" useLayoutStore.open = !useLayoutStore.open" :class="{'hidden': useLayoutStore.open}">     
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
</button>
<a class="m-4 text-xl">First Big project</a>
</div>
<div>
  <img class="h-20" src="https://imgs.search.brave.com/LZR0W8iWf1juPwCgYH-Vzn90mGLePi9TlUTYZ6UJg3U/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9yZXZl/bHJ5LmNvL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIwLzAxL2xv/Z28tZGVmYXVsdC1z/dGFja2VkQDJ4LTEu/cG5n"/>
</div>
<div class="inline-block mr-12 items-center">
  <button class="flex items-center p-2 text-white bg-gray-800 hover:bg-gray-600 rounded-full"  @click="createTask"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
  Add New Task
</button>
</div>
    </div>
<!-- Content -->
    <div class="p-8 text-cyan-700">
      <div v-if="store.selectedBoard?.column === undefined">
        <button @click="createColumn">Create Column</button>
      </div>
      <div v-else>
  <Column/>
      <div class="col-span-6 items-center "><button @click="createColumn" class="rounded shadow-sm p-4 text-white bg-blue-500 hover:bg-blue-350 focus:outline-dotted">Create Column</button></div>
      </div>
    </div>
  </div>
</div>
<Modal v-if="useLayoutStore.drawerOpen && useLayoutStore.modalContent === 'createBoard'"/>
<ColumnModal v-if="useLayoutStore.drawerOpen && useLayoutStore.modalContent === 'createColumn'"/>
<TaskModal v-if="useLayoutStore.drawerOpen && useLayoutStore.modalContent == 'createTask'"/>

</template>
<script lang="ts" setup>
 import { layoutStore } from '@/stores/LayouStore';
 import {useStore} from "@/stores/store"
 import { authStore } from '@/stores/auth/authStore';
import {onMounted, ref} from "vue"
import Column from '../Column.vue';
 import Modal from '../modals/Modal.vue';
import ColumnModal from "../modals/ColumnModal.vue"
import TaskModal from '../modals/TaskModal.vue';
const store = useStore()
const useAuthStore = authStore()
const useLayoutStore = layoutStore()
const selectBoard = ref(false)
const createBoard = () => {
    useLayoutStore.modalContent = "createBoard"
    useLayoutStore.drawerOpen = true
}
const createColumn = () => {
    useLayoutStore.modalContent = "createColumn"
    useLayoutStore.drawerOpen = true
}
const createTask = () => {
    useLayoutStore.modalContent = "createTask"
    useLayoutStore.drawerOpen = true
}
onMounted(() => {
  store.fetchBoards();
});
const handleSelectedBoard = (board: any) => {
  store.selectBoard(board)
  console.log(board.column);
}

</script>