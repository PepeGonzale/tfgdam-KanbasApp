<template>
  <Header />
  <main>
    <div class="flex w-full">
      <Sidebar />
      <div
        v-dragscroll:nochilddrag
        class="relative h-full w-screen min-h-[calc(95vh-64px)] max-h-[calc(100vh-64px)] overflow-auto bg-light-grey dark:bg-very-dark-grey transition-all"
        :class="
          useLayoutStore.sidebar
            ? [
                'sm:translate-x-[256px] lg:translate-x-[300px] max-w-[calc(100vw+256px',
              ]
            : ['translate-x-[0]']
        "
      >
        <div data-dragscroll class="mx-auto w-11/12 pt-6 pb-24">
          <div class="flex">
            <Column
              v-for="column in store.column"
              :key="column._id"
              :column="column"
            />
            <div
            @click="createColumn" 
              class="flex w-72 gap-6 border text-center bg-gray-100 hover:bg-gray-200 hover:cursor-pointer"
            >
            <div class="text-center m-auto">
              Create column
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <div
    class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] max-w-xs w-11/12 sm:max-w-md"
  >
    <Modal
      v-if="
        useLayoutStore.drawerOpen &&
        useLayoutStore.modalContent === 'createBoard'
      "
    />
    <ColumnModal
      v-if="
        useLayoutStore.drawerOpen &&
        useLayoutStore.modalContent === 'createColumn'
      "
    />
    <TaskModal
      v-if="
        useLayoutStore.drawerOpen && useLayoutStore.modalContent == 'createTask'
      "
      id="modal"
    />
  </div>
</template>
<script lang="ts" setup>
import { authStore } from "@/stores/auth/authStore";
import { layoutStore } from "@/stores/LayouStore";
import { useStore } from "@/stores/store";
import Header from "@/components/layout/Header.vue";
import Column from "@/components/Column.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Modal from "@/components/modals/Modal.vue";
import ColumnModal from "@/components/modals/ColumnModal.vue";
import TaskModal from "@/components/modals/TaskModal.vue";
import { watch } from "vue";
import { storeToRefs } from "pinia";
const auth = authStore();
const { isLoggedIn } = storeToRefs(auth);
const useLayoutStore = layoutStore();
const store = useStore();
watch(isLoggedIn, () => {
  if (!isLoggedIn.value) {
    auth.logout();
  }
});
const createColumn = () => {
  useLayoutStore.modalContent = "createColumn";
  useLayoutStore.drawerOpen = true;
};
</script>
