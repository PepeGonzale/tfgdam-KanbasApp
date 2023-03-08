<template>
<div class="z-10 rounded-md transition-all fixed bg-cyan-300"
  :class="useLayoutStore.drawerOpen ? ['translate-x-[0]']: ['translate-x-[-100%]']">
    <div
      class="dark:bg-dark-grey min-h-[calc(100vh-80px)] w-64 lg:w-[300px] pb-10 hidden sm:flex sm:flex-col border-r border-r-lines-light dark:border-r-lines-dark">
      <p class="text-medium-grey text-xs font-bold py-4 px-6">ALL BOARDS ({{ store.boards.length }})</p>
      <div v-for="(board, index) in store.boards" :key="index"
        class="flex items-center gap-4 w-11/12 rounded-r-full px-6 py-3 cursor-pointer text-medium-grey font-bold   "
        >
        
        <span @click="handleSelectedBoard(board)">{{ board.title }}</span>
      </div>
      <div @click="createBoard()"
        class=" flex items-center gap-4 w-11/12 rounded-r-full px-6 py-3 cursor-pointer font-bold fill-main-purple text-main-purple hover:bg-medium-grey/10">
        
        <span>+ Create New Board</span>
      </div>
      <div class="flex flex-col gap-2 mt-auto">
        <div class="cursor-pointer bg-cyan-400 rounded-full w-full text-center m-auto p-2 hover:bg-gray-200 hover:border-t-2" @click="useLayoutStore.drawerOpen = !useLayoutStore.drawerOpen">Close sidebar</div>
       <div @click="useAuthStore.logout" class="cursor-pointer bg-cyan-400 rounded-full w-full text-center m-auto p-2 hover:bg-gray-200 hover:border-t-2">Logout</div>
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
import Header from "./Header.vue"
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
const createTask = () => {
    useLayoutStore.modalContent = "createTask"
    useLayoutStore.drawerOpen = true
}

const createColumn = () => {
    useLayoutStore.modalContent = "createColumn"
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