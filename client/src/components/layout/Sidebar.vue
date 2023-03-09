<template>
  <div
    class="z-10 transition-all fixed bg-black text-white"
    :class="
      useLayoutStore.sidebar ? ['translate-x-[0]'] : ['translate-x-[-100%]']
    "
  >
    <div
      class="dark:bg-dark-grey min-h-[calc(100vh-80px)] w-64 lg:w-[280px] pb-10 hidden sm:flex sm:flex-col border-r border-r-lines-light dark:border-r-lines-dark"
    >
      <p class="text-white text-xs font-bold py-4 px-6">
        ALL BOARDS ({{ store.boards.length }})
      </p>
      <BoardView :boards="store.boards"/>
      <div class="flex flex-col gap-2 mt-auto">
        <div
          class="cursor-pointer rounded-full w-full text-center m-auto p-2 hover:border-t-2"
          @click="useLayoutStore.sidebar = !useLayoutStore.sidebar"
        >
          Close sidebar
        </div>
        <div
          @click="useAuthStore.logout"
          class="cursor-pointer bg-cyan-400 rounded-full w-full text-center m-auto p-2 hover:bg-gray-200 hover:border-t-2"
        >
          Logout
        </div>
      </div>
    </div>
  </div>

</template>
<script lang="ts" setup>
import { layoutStore } from "@/stores/LayouStore";
import { useStore } from "@/stores/store";
import { authStore } from "@/stores/auth/authStore";
import { onMounted, ref } from "vue";
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
