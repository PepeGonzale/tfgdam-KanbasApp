<template>
  <div
    v-for="board in boards"
    class="text-black flex cursor-pointer m-8 "
    @click="handleSelectedBoard(board)"
  >
 
  <div class="p-8 max-h-24 bg-blue-600 rounded-lg text-white m-auto font-bold">
    <div class="">
    {{ board.title }}
  </div>
  </div>
  </div>
  <div class="p-8 max-h-24 bg-blue-600 rounded-lg text-white m-auto font-bold hover:cursor-pointer" @click="createBoard">
    <div class="">
    Create new Board
  </div>
  </div>
  
</template>
<script lang="ts" setup>
import { layoutStore } from "@/stores/LayouStore";
import { useStore } from "@/stores/store";
import { useRouter } from 'vue-router'
const props = defineProps({
  boards: {
    type: Object,
    required: true,
  },
});
const store = useStore();
const router = useRouter()
const useLayoutStore = layoutStore();
const handleSelectedBoard = (board: any) => {
  store.selectBoard(board);
  router.push({path: "/"})
};
const createBoard = () => {
  useLayoutStore.modalContent = "createBoard";
  useLayoutStore.drawerOpen = true;
};
</script>
