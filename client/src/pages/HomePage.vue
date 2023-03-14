<template>
  <div class="flex flex-col max-h-screen bg-blue-600">
    <Header />
    <main class="flex-1 overflow-hidden">
      <div class="flex flex-col">
        <div class="shrink-0 flex justify-between items-center p-4">
          <h1 class="text-2xl text-white font-bold">Board title</h1>
          <div>
            <button
              class="inline-flex items-center bg-white hover:bg.white/20 px-3 py-2 font-medium text-sm text-black rounded-md"
            >
              Settings
            </button>
          </div>
        </div>
        <div class="flex-1 overflow-x-auto">
          <div class="inline-flex items-start h-full px-4 pb-4 space-x-4">
            <div
              class="w-72 bg-gray-200 flex h-129 flex-col rounded-md"
              :class="
                store.selectedBoard?.column?.length || 0 >= 6
                  ? 'h-128'
                  : 'h-129'
              "
              v-for="column in store.selectedBoard?.column"
            >
              <div class="flex items-center justify-between px-3 py-2">
                <h3 class="text-sm font-semibold text-gray-700">
                  {{ column.name }}
                </h3>
                <button
                  class="hover:bg-gray-300 w-8 h-8 rounded-md grid place-content-center"
                >
                  Options
                </button>
              </div>
              <div class="px-3 pb-3 flex flex-col overflow-hidden">
                <div class="flex-1 overflow-y-auto">
                  <Column :column="column"/>
                </div>
                <div class="mt-3">
                  <button
                    class="flex items-center p-2 text-sm font-medium text-gray-600 gover:text-black hover:bg-gray-300 rounded-md w-full"
                    @click="createTask"
                  >
                    add card
                  </button>
                </div>
              </div>
            </div>
            <div class="w-72">
              <button
                class="flex items-center bg-white/10 w-full hover:bg-white/20 text-white p-2 text-sm font-medium rounded-md"
                @click="createColumn"
              >
                <span>Create new list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  <div
    class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] max-w-xs w-11/12 sm:max-w-md"
  >
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
    <EditTask
      v-if="
        useLayoutStore.drawerOpen && useLayoutStore.modalContent == 'editTask'
      "
    />
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { authStore } from "@/stores/auth/authStore";
import { layoutStore } from "@/stores/LayouStore";
import { useStore } from "@/stores/store";
import Header from "@/components/layout/Header.vue";
import Column from "@/components/Column.vue";
import Task from "@/components/Task.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Modal from "@/components/modals/Modal.vue";
import ColumnModal from "@/components/modals/ColumnModal.vue";
import TaskModal from "@/components/modals/TaskModal.vue";
import { watch } from "vue";
import { storeToRefs } from "pinia";

import BoardViewVue from "@/components/views/BoardView.vue";
import EditTask from "@/components/modals/EditTask.vue";
import Draggable from "vuedraggable";
import type TaskVue from "@/components/Task.vue";

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
const createTask = () => {
  useLayoutStore.modalContent = "createTask";
  useLayoutStore.drawerOpen = true;
};
</script>
<style scoped>
.draggable-list {
  background: #3f51b5;
  color: #fff;
  border: 1px solid;
  height: 50vh;
}
.list-item {
  margin: 10px;
  padding: 40px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 5px;
  background: #f44336;
  display: inline-block;
}
</style>
