<template>
  
  <div class="flex flex-col min-h-screen bg-blue-600">
    
    <Header />
    <div class="flex flex-1">
      <transition name="sidebar-transition" appear>
  <div class="w-1/6 bg-gray-200 flex-col" v-if="useLayoutStore.sidebar">
    <Sidebar/>
  </div>
</transition>
    <main class="flex-1 overflow-hidden">
      <div class="flex flex-row lg:flex-col">
        <div class="shrink-0 hidden lg:flex justify-between items-center p-4">
          <h1 class="text-2xl text-white font-bold">Project Name : {{ store.selectedBoard?.title }}</h1>
          <div class="flex items-center">
  <div v-for="a in store.selectedBoard?.usersWithAccess" class="avatar w-12 h-12 rounded-full object-cover">
    <img :src="a.image" class="rounded-full"/>
  </div>
</div>
         <div>

         </div>
        </div>
        
          <div class="flex-1 lg:col-auto md:overflow-x-auto flex-col md:flex-col">
          <div class="inline-flex items-start md:h-full flex-col mx-auto md:flex-row md:px-4 md:pb-4 md:space-x-4 w-screen" 
         
>
            <div
              class="md:m-2 items-center md:items-start md:w-80 h-auto md:bg-none flex space-y-4 h-auto md:h-129 bg-gray-200 flex-col w-screen rounded-md"
             
              v-for="column in store.selectedBoard?.column"
            >
              <div class="flex mt-4 justify-between items-center w-full px-3 py-2 ">
                <div>
                  <span class="drag-handle text-left cursor-move">⠏ </span>

                </div>
                <h3 class="text-md font-semibold text-gray-700">
                  {{ column.name.toUpperCase() }}
                </h3>
                <button
                  class="hover:bg-gray-300 w-auto p-2 rounded-md grid place-content-center"
                  @click="editColumn(column)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                    />
                  </svg>
                </button>
              </div>
              <div class="px-3 pb-3 flex flex-col overflow-hidden">
                <div class="flex-1 overflow-y-auto">
                  <Column :column="column" />
                </div>
                <CreateTask :column="column"/>
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

  </div>

  <div class="top-0 bottom-0 left-0 right-0 fixed modal overflow-auto z-index-40" v-if="useLayoutStore.drawerOpen">
    <div class="p-1.5 my-10 mx-auto outline-none shadow-xl w-4/6">
  <div
    class=""
  >
    <ColumnModal
      v-if="
        useLayoutStore.drawerOpen &&
        useLayoutStore.modalContent === 'createColumn'
      "
    />
 
    <EditTask
      v-if="
        useLayoutStore.drawerOpen && useLayoutStore.modalContent == 'editTask'
      "
    />
    <EditColumn
      v-if="
        useLayoutStore.drawerOpen && useLayoutStore.modalContent == 'editColumn'
      "
    />
    <AddUsers v-if="
        useLayoutStore.drawerOpen && useLayoutStore.modalContent == 'addUsers'
      "/>
  </div>
</div>
</div>
</template>
<script lang="ts" setup>
import { onMounted,ref } from "vue";
import { authStore } from "@/stores/auth/authStore";
import { layoutStore } from "@/stores/LayouStore";
import { useStore } from "@/stores/store";
import AddUsers from "@/components/Modals/AddUsers.vue"
import Header from "@/components/Layout/Header.vue";
import Column from "@/components/Column/Column.vue";
import Sidebar from "@/components/Layout/Sidebar.vue";
import ColumnModal from "@/components/Modals/ColumnModal.vue";
import { watch } from "vue";
import { storeToRefs, type Store } from "pinia";
import EditTask from "@/components/Modals/EditTask.vue";
import router from "@/router";
import EditColumn from "@/components/Modals/EditColumn.vue";
import Toast from "@/components/buttons/Toast.vue";
import Draggable from "vuedraggable"
import { toast } from "vue-sonner";
import CreateTask from "@/components/Modals/CreateTask.vue";

const auth = authStore();
const { isLoggedIn } = storeToRefs(auth);
const useLayoutStore = layoutStore();
const store = useStore();

onMounted(() => {
  if (store.selectedBoard === undefined) {
    router.push("/boards")
  }
})
watch(isLoggedIn, () => {
  if (!isLoggedIn.value) {
    auth.logout();
  }
});
const createColumn = () => {
  useLayoutStore.modalContent = "createColumn"
  useLayoutStore.drawerOpen = true

}
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

  .sidebar-transition-enter-active, .sidebar-transition-leave-active {
  transition: transform 0.3s ease;
}

.sidebar-transition-enter, .sidebar-transition-leave-to {
  transform: translateX(-100%);
}
.modal {
  background: rgba(0,0,0,.33);
}
</style>
