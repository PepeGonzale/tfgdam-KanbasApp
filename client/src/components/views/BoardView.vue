<template>
<div
        v-for="(board, index) in boards"
        :key="index"
        class="flex items-center gap-4 w-11/12 px-6 py-3 rounded-r-full border-2 hover:bg-gray-200 cursor-pointer text-medium-grey font-bold border-r-2 mx-2 "
        @click="handleSelectedBoard(board)">
        <span>{{ board.title }}</span>
      </div>
      <div
        @click="createBoard()"
        class="flex items-center gap-4 w-11/12 rounded-r-full px-6 py-3 cursor-pointer font-bold fill-main-purple text-main-purple hover:bg-medium-grey/10"
      >
        <span>+ Create New Board</span>
      </div>
</template>
<script lang="ts" setup>
import { layoutStore } from '@/stores/LayouStore';
import { useStore } from '@/stores/store';
const props = defineProps({
    boards: {
    type: Object,
    required:true
    }
})
const store = useStore()
const useLayoutStore = layoutStore()
const handleSelectedBoard = (board: any) => {
  store.selectBoard(board);
  console.log(board.column);
};
const createBoard = () => {
  useLayoutStore.modalContent = "createBoard";
  useLayoutStore.drawerOpen = true;
};
</script>