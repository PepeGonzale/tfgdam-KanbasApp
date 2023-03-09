<template>
  <header
    class="bg-lessblack dark:bg-dark-grey top-0 left-0 w-full flex items-center sm:pr-4 text-white "
  >
    <div
      class="hidden items-center sm:flex pl-6 h-20 dark:border-r-lines-dark md:h-24"
      :class="
        useLayoutStore.sidebar
          ? ['min-w-[256px]', 'lg:min-w-[280px]', 'border-r', 'bg-black text-white']
          : ['min-w-[200px] ']
      "
    >
    <a href="" class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
</svg>
<span class="m-3 text-xl font-bold p-3">Laraveler</span>
</a>
    </div>
    <div class="justify-between flex items-center w-full">
    <a
      @click="useLayoutStore.sidebar = !useLayoutStore.sidebar"
      class="cursor-pointer"
      :class="useLayoutStore.sidebar ? 'hidden' : 'block mx-4'"
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
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </a>
    <h2 class="font-bold mx-6">{{ store.selectedBoard?.title }}</h2>
          <button
            type="button"
            @click="createTask"
            class="flex items-center border-2 text-sm font-bold py-3 px-4 rounded-3xl bg-green-300 mx-4 hover:bg-main-purple-light"
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
</svg>

           <slot>Add New Task</slot>
          </button>
     
  </div>
  </header>
</template>
<script lang="ts" setup>
import { layoutStore } from "@/stores/LayouStore";
import { useStore } from "@/stores/store";
const useLayoutStore = layoutStore();
const store = useStore();
const createTask = () => {
  useLayoutStore.modalContent = "createTask";
  useLayoutStore.drawerOpen = true;

};

</script>
