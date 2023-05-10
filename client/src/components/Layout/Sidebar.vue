<template>

<div class="min-h-full px-3 py-4 overflow-y-auto bg-gray-900">
  <a  class="hover:cursor-pointer text-center bg-gray-100">


   </a>
      <ul class="space-y-2 font-medium">
        <li>
            <a @click="useLayoutStore.sidebar = !useLayoutStore.sidebar" href="#" class="flex items-center p-2 text-gray-50 rounded-lg  dark:hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
</svg>
               <span class="ml-3">Close Sidebar</span>
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-gray-50 rounded-lg  dark:hover:bg-gray-700">
               <svg aria-hidden="true" class="w-6 h-6 text-gray-500 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
               <span class="ml-3">Boards</span>
            </a>
         </li>
         <li>
            <a @click="listUsers" href="#" class="flex items-center p-2 text-gray-50 rounded-lg  dark:hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
</svg>

               <span class="ml-3">Add Users</span>
            </a>
         </li>
         <li>
            <a @click="router.push({path:'/profile'})" href="#" class="flex items-center p-2 text-gray-50 rounded-lg  dark:hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>

               <span class="ml-3">Profile</span>
            </a>
         </li>
      </ul>
   </div>


</template>
<script lang="ts" setup>
import { layoutStore } from "@/stores/LayouStore";
import { useStore } from "@/stores/store";
import { authStore } from "@/stores/auth/authStore";
import { onMounted, ref } from "vue";

import Modal from "../Modals/Modal.vue";
import ColumnModal from "../Modals/ColumnModal.vue";
import router from "@/router";
import BoardView from "../Views/BoardView.vue";
const store = useStore();
const auth = authStore();
const useLayoutStore = layoutStore();
const selectBoard = ref(false);

onMounted(() => {
  store.fetchBoards();
});
const listUsers = () => {
  useLayoutStore.drawerOpen = true
  useLayoutStore.modalContent = 'addUsers'
  auth.listUsers()
}

</script>
