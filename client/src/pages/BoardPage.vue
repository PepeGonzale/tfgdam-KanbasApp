<template>
<Header/>
<div class="flex items-center max-w-full">
    <div class="m-auto p-2 text-lg">
     Boards: {{ store.boards.length }}
  </div>
</div> 
<div class="flex items-center max-h-full bg-blue-300">
  
<BoardView :boards="store.boards"/>
<div
    class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] max-w-xs w-11/12 sm:max-w-md"
  >
<Modal
      v-if="
        useLayoutStore.drawerOpen &&
        useLayoutStore.modalContent === 'createBoard'
      "
    />
</div>
</div>
</template>
<script lang="ts" setup>
import Header from '@/components/layout/Header.vue';
import Modal from '@/components/modals/Modal.vue';
import BoardView from '@/components/views/BoardView.vue';
import { layoutStore } from '@/stores/LayouStore';
import { useStore } from '@/stores/store';
import { onMounted } from 'vue';
const store = useStore()
const useLayoutStore = layoutStore()
onMounted(() => {
  store.fetchBoards();
});
</script>