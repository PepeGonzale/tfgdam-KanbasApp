<template>
  <div
    v-for="board in boards"
    class="text-black flex cursor-pointer"
    @click="handleSelectedBoard(board)"
  >
    {{ board.title }}
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
  console.log(board.column);
  router.push({path: "/"})
};
const createBoard = () => {
  useLayoutStore.modalContent = "createBoard";
  useLayoutStore.drawerOpen = true;
};
</script>
