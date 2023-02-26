<template>
 <div class="relative flex min-h-screen bg-black">
    <div v-if = "useLayoutStore.open" class="bg-gray-900 text-cyan-100 w-64 space-y-6 py-4 absolute inset-y-0 left-0 transform -translate-x-full transition duration-200 ease-in-out md:relative md:translate-x-0">
        <a href="" class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
</svg>
<span class="text-2xl font-extrabold text-white ml-2">Laraveler</span>
        </a>
        <nav class="w-full py-4">
            <div v-for="board in boards" class="px-2">
            <a href="/" class="flex items-center border-4 px-4 py-3 border-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
</svg>

<span class="text-white ml-2">{{board.name}}</span>
</a>
        
        </div>
        
             <div class="fixed bottom-20 w-full bg-black">
                
               <button class="flex items-center p-4 text-white bg-gray-800 hover:bg-gray-600 w-full rounded showModal" @click="createBoard"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
  Create board
</button>
                </div>
              
            
        </nav>
      
    </div>
    <!-- Main content -->
    <div class="flex-1">
    <div class="bg-white flex shadow py-6">
       
        <button @click =" useLayoutStore.open = !useLayoutStore.open" :class="{'hidden': useLayoutStore.open}">
         
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
</button>
<div>First big project</div>
<div class="inline-block fixed right-0 mr-12">
  <button class="flex items-center p-2 text-white bg-gray-800 hover:bg-gray-600 rounded-full" @click=""><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
  Add New Task
</button>
</div>
    </div>
<!-- Content -->
    <div class="p-8 text-cyan-700">Content</div>
  </div>
</div>
<Modal v-if="useLayoutStore.drawerOpen"/>

</template>
<script lang="ts" setup>
 import { layoutStore } from '@/stores/LayouStore';
 import Modal from './Modal.vue';
const boards = [
 {id: 1,   name: "Primer projecto"}, {id: 2, name: "Segundo projecto"}
]
const useLayoutStore = layoutStore()

const createBoard = () => {
    useLayoutStore.modalContent = "createBoard"
    useLayoutStore.drawerOpen = true
}

</script>