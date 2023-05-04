<template>
  <DefaultVue>
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
</DefaultVue>
</template>
<script lang="ts" setup>
import Header from '../components/Layout/Header.vue';
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