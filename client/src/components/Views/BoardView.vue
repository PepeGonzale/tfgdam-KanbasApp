<template>
<div class="space-y-10 bg-blue-primary h-screen">
  <div
    class="items-center justify-between flex cursor-pointer m-auto bg-gray-300 mt-12 w-4/5 p-3 rounded-[3px]"
    
  >
    <div class="flex">
      <a class="text-2xl">My projects</a>
    </div>
    <div class="mx-auto items-center cursor-pointer rounded-md p-3 text-center bg-gray-300 w-1/3 ">
      <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
              @click="showStarred"
               class="text-gray-500 hover:text-gray-800 text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                :class="starred ? 'text-gray-900 bg-white' : 'text-gray-500'"
                
              >
                Starred
              </a>
            </li>
           
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
              @click="hideStarred"
                class="text-gray-500 hover:text-gray-800 text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                :class="!starred ? 'text-gray-900 bg-white' : 'text-gray-500'"
                
              >
                 All
              </a>
            </li> </ul>
          
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
  <!-- <section class="w-4/5 flex m-auto">
    <ul>
      <li class="bg-red-200 w-40  pt-1 pl-1 pb-6">Proyecto 1</li>
    </ul>
  </section> -->
   <section class="flex w-4/5 m-auto bg-gray-800 rounded-full" >
    <div class="flex-1">
      <ul
        v-for="project in store.boards"
        :key="project._id"
        class="relative "
        
      >
        <li v-show ="!starred" class="rounded-[3px] relative bg-gray-200 hover:bg-gray-300 p-3 cursor-pointer text-black text-center">
          <a class=""  @click="handleSelectedBoard(project)">
            <div class="block">{{ project.title }}</div>
            <div class="block">{{ project.description }}</div>
           
            </a>
      
          <button class="absolute top-1 right-1">

          </button>
        
          <div class="absolute right-0 top-2.5 hover:bg-gray-300" @click="handleStarred(project)">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer" :class="project.starred ? 'text-yellow-400' : 'text-black'">
   <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
 </svg>
 
             </div>
        </li> 
        <li v-show="starred && project.starred" class="relative hover:bg-gray-100 p-3 bg-gray-200 cursor-pointer text-center">
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
</div>
</template>
<script lang="ts" setup>
import { api } from "@/helpers/axios";
import { layoutStore } from "@/stores/LayouStore";
import { useStore } from "@/stores/store";
import { defineEmits, ref } from "vue";
import { toast } from "vue-sonner";
const props = defineProps({
  boards: {
    type: Object,
    required: true,
  },
  
});
const starred = ref(false)
const emits = defineEmits(["selectedBoard"]);
const store = useStore();
const useLayoutStore = layoutStore();
const handleSelectedBoard = (board: any) => {
  emits("selectedBoard", board);
};
const showStarred = () => {
  starred.value = true
}
const hideStarred = () => {
  starred.value = false
}
const handleStarred = async (project) => {
  try {
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
} catch(err) {
  toast
} finally {
  toast.success("Project starred succesfully")
}
  
  
}
const createBoard = () => {
  useLayoutStore.modalContent = "createBoard";
  useLayoutStore.drawerOpen = true;
};
</script>
