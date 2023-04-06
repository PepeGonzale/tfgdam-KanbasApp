<template>
<Header/>

  <Toaster richColors :duration="10000" position="top-center"/>
<BoardView :boards="store.boards" @selectedBoard="handleEvent"/>
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

</template>
<script lang="ts" setup>
import Header from '../components/Layout/Header.vue';
import Modal from '@/components/Modals/Modal.vue';
import BoardView from '@/components/Views/BoardView.vue';
import { Toaster, toast } from 'vue-sonner'
import Toast from '@/components/buttons/Toast.vue';
import { layoutStore } from '@/stores/LayouStore';
import { useStore } from '@/stores/store';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()

const store = useStore()
const useLayoutStore = layoutStore()
onMounted(() => {
  store.fetchBoards();
});
const handleEvent = (board: any) => {
  console.log(board)
  const toastPromise = toast.promise(() => new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
    store.selectBoard(board)
    setInterval(() => {
      router.push({path: "/"})
    }, 500)
  }), {
  loading: 'Loading',
  success: (data: any) => 'Success' ,
  error: (data: any) => 'Error'
    
})


  
  
}
</script>