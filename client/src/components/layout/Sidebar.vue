<template>
  <div
    class="flex z-10 transition-all bg-lessblack text-white bg-black "
    :class="
      useLayoutStore.sidebar ? ['translate-x-[0]' ,] : ['translate-x-[-100%]']
    "
    
  >
    <div
      class="dark:bg-dark-grey min-h-[calc(100vh-80px)] w-64 lg:w-[280px] pb-10 hidden sm:flex sm:flex-col border-r border-r-lines-light dark:border-r-lines-dark"
    >
      <p class="text-white text-xs font-bold py-4 px-6 ">
        ALL BOARDS ({{ store.boards.length }})
      </p>
      <div class="h-128" :class="store.boards.length >= 11 ? 'overflow-auto' : 'overflow-hidden'">
      <BoardView :boards="store.boards"/>
    </div>
      <div class="flex flex-col gap-2 mt-6">
        <PrimaryButton
          @click="useLayoutStore.sidebar = !useLayoutStore.sidebar"
          text="Close Sidebar"
        />
      
      <PrimaryButton @click="useAuthStore.logout" text="Logout"/>
    </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { layoutStore } from "@/stores/LayouStore";
import { useStore } from "@/stores/store";
import { authStore } from "@/stores/auth/authStore";
import { onMounted, ref } from "vue";
import PrimaryButton from "../buttons/PrimaryButton.vue";
import Modal from "../modals/Modal.vue";
import ColumnModal from "../modals/ColumnModal.vue";
import TaskModal from "../modals/TaskModal.vue";
import BoardView from "../views/BoardView.vue";
const store = useStore();
const useAuthStore = authStore();
const useLayoutStore = layoutStore();
const selectBoard = ref(false);

onMounted(() => {
  store.fetchBoards();
});
</script>
