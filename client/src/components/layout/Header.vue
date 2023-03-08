<template>
<header class="bg-white dark:bg-dark-grey top-0 left-0 w-full flex items-center sm:pr-4">
  <div class="hidden items-center sm:flex pl-6 h-20 dark:border-r-lines-dark md:h-24"
    :class="useLayoutStore.drawerOpen ? ['min-w-[256px]', 'lg:min-w-[300px]', 'border-r'] : ['min-w-[200px] ']">
    logos
  </div>
  <a @click="useLayoutStore.drawerOpen = !useLayoutStore.drawerOpen" class="cursor-pointer">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
</a>

  <div class="mx-auto max-w-sm w-11/12 flex items-center h-16 gap-4
  sm:h-20">
    <div>
      logos
    </div>
    <div class="flex items-center gap-2 group cursor-pointer sm:hidden">
      <h1 class="text-black dark:text-white font-bold text-lg cursor-pointer">
        board
      </h1> 
    </div>
    <h1 class="text-black dark:text-white font-bold hidden text-2xl sm:block">
     board
    </h1>
    <div v-if="store.boards.length" class="flex items-center gap-4 ml-auto">
      hola
      <div class="sm:block">
    <button type="button" @click="createTask" class=" text-sm font-bold py-3 px-4 rounded-3xl bg-main-purple hover:bg-main-purple-light">
      <slot></slot>
      Add New Task
    </button>
  </div>
      <div>dropdown</div>
    </div>
  </div>
</header>
</template>
<script lang="ts" setup>
import { layoutStore } from "@/stores/LayouStore";
import { useStore } from "@/stores/store";
const useLayoutStore = layoutStore()
const store = useStore()
const createTask = () => {
    useLayoutStore.modalContent = "createTask"
    useLayoutStore.drawerOpen = true
}

</script>