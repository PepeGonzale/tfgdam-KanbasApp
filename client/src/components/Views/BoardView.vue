<template>

  <div
    class="items-center text-black justify-between flex cursor-pointer m-auto bg-gray-200 mt-12 w-4/5 p-3"
    @click="handleSelectedBoard(board)"
  >
    <div class="flex">
      <a class="text-2xl">My projects</a>
    </div>
   
    <div>
      <button
        class="text-2xl bg-cyan-300 p-2 rounded-md"
        @click="() => createBoard()"
      >
        New Project
      </button>
    </div>
  </div>
  
  <section class="flex w-4/5 m-auto bg-gray-200" >
    <div class="flex-1 m-auto">
      <ul
        v-for="project in store.boards"
        :key="project._id"
        class="relative"
        
      >
        <li v-show ="!starred" class="relative bg-white hover:bg-gray-100 p-3 cursor-pointer text-center">
          <a class=""  @click="handleSelectedBoard(project)">
            <div class="block">{{ project.title }}</div>
            <div class="block">{{ project.description }}</div>
           
            </a>
      
          <button class="absolute top-1 right-1">

          </button>
        
          <div class="absolute right-0 top-0 m-auto hover:bg-gray-300" @click="handleStarred(project)">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer" :class="project.starred ? 'text-yellow-400' : 'text-black'">
   <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
 </svg>
 
             </div>
        </li> 
        <li v-show="starred && project.starred" class="relative bg-white hover:bg-gray-100 p-3 cursor-pointer text-center">
          <a class=""  @click="handleSelectedBoard(project)">
            <div class="block">{{ project.title }}</div>
            <div class="block">{{ project.description }}</div>
           
            </a>
      
          <button class="absolute top-1 right-1">

          </button>
        
          <div class="absolute right-0 top-0 m-auto hover:bg-gray-300" @click="handleStarred(project)">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer" :class="project.starred ? 'text-yellow-400' : 'text-black'">
   <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
 </svg>
 
             </div>
        </li>
      </ul>
    </div>
  </section>
  
</template>
<script lang="ts" setup>
import { api } from "@/helpers/axios";
import { layoutStore } from "@/stores/LayouStore";
import { useStore } from "@/stores/store";
import axios from "axios";
import { defineEmits, ref } from "vue";
const props = defineProps({
  boards: {
    type: Object,
    required: true,
  },
  starred: {
    type: Boolean,
    required: true,
  
  }
});

const emits = defineEmits(["selectedBoard"]);
const store = useStore();
const useLayoutStore = layoutStore();
const handleSelectedBoard = (board: any) => {
  emits("selectedBoard", board);
};
const handleStarred = async (project) => {
  
  const res = await api.post(`/starred/${project._id}`, {
    starred: !project.starred
  }).then(data => {
    if (data.data.starred) {
      project.starred = true
    }
    else {
      project.starred = false
    }
  })
  
  
}
const createBoard = () => {
  useLayoutStore.modalContent = "createBoard";
  useLayoutStore.drawerOpen = true;
};
</script>
