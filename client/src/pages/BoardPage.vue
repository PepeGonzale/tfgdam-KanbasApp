<template>
  <DefaultVue>
<BoardView :boards="store.boards" @selectedBoard="handleEvent"/>
<div
      class="top-0 bottom-0 left-0 right-0 fixed modal overflow-auto z-index-40"
      v-if="useLayoutStore.drawerOpen"
    >
      <div class="p-1.5 my-10 mx-auto outline-none shadow-xl w-4/6">
        <div class="">
<Modal
      v-if="
        useLayoutStore.drawerOpen &&
        useLayoutStore.modalContent === 'createBoard'
      "
    />
</div>
</div>
</div>
</DefaultVue>
</template>
<script lang="ts" setup>

import Modal from '@/components/Modals/Modal.vue';
import BoardView from '@/components/Views/BoardView.vue';
import { Toaster, toast } from 'vue-sonner'
import { layoutStore } from '@/stores/LayouStore';
import { useStore } from '@/stores/store';
import { onMounted,ref } from 'vue';
import { useRouter } from 'vue-router'
import { authStore } from '@/stores/auth/authStore';
import DefaultVue from '@/layouts/Default.vue';
const router = useRouter()
const auth = authStore()
const store = useStore()
const useLayoutStore = layoutStore()

onMounted(() => {
  auth.userInfo
  store.fetchBoards()
  .catch((err) => {
    if (err.response.data.error === "Not Authorized token expired, please login again") {
      auth.logout()
      router.push({path: "/login"})
    }
    toast.error("Error, try again later")
  }
  ) 
})
const handleEvent = (board: any) => { 
  
  const toastPromise = toast.promise(() => new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
    setTimeout(() => {
      router.push({path: "/board/" + board._id})
    }, 500)
  }), {
  loading: 'Loading',
  success: (data: any) => 'Success' ,
  error: (data: any) => 'Error'
    
})


  
  
}
</script>
<style scoped>
.sidebar-transition-enter-active,
.sidebar-transition-leave-active {
  transition: transform 0.3s ease;
}

.sidebar-transition-enter,
.sidebar-transition-leave-to {
  transform: translateX(-100%);
}
.modal {
  background: rgba(0, 0, 0, 0.33);
}
</style>