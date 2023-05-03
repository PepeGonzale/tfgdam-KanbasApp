<template>
  
  <div class="flex flex-col min-h-screen bg-white">
    <div class="flex flex-1">
      <transition name="sidebar-transition" appear>
  <div class="w-1/6 bg-gray-200 flex-col" v-if="useLayoutStore.sidebar">
    <Sidebar/>
  </div>
</transition>
    <main class="flex-1 overflow-hidden">
      <div class="flex flex-row lg:flex-col">
        <div class="shrink-0 hidden lg:flex justify-between items-center p-4">
          <h1 class="text-2x font-bold">Project Name : {{ store.selectedBoard?.title }}</h1>
          <div class="flex items-center">
            <button @click="handleView">
              <span v-if="boardView === 'board'">Table View</span>
              <span v-else>Board View</span>
            </button>
  <!-- <div v-for="a in store.selectedBoard?.usersWithAccess" class="avatar w-12 h-12 rounded-full object-cover">
    <img :src="a.image" class="rounded-full"/>
  </div> -->
</div>
         <div>

         </div>
        </div>
        
          <div class="flex-1 lg:col-auto md:overflow-x-auto flex-col md:flex-col" v-if="boardView==='board'">
          <div class="inline-flex items-start md:h-full flex-col mx-auto md:flex-row md:px-4 md:pb-4 md:space-x-4 w-screen" 
         
>
            <div
              class="md:m-2 items-center md:items-start md:w-80 h-auto md:bg-none flex space-y-4 h-auto md:h-screen flex-col w-full rounded-md"
              v-for="column in store.selectedBoard?.column"
              
            >
             <KanbanView :column="column" />
             
            </div>
            <CreateColumnVue/>
              
           
           
          </div>
        </div>
        <div class="">
          <TableViewVue v-if="boardView==='table'"/>
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
import Sidebar from "@/components/Layout/Sidebar.vue";
import ColumnModal from "@/components/Modals/ColumnModal.vue";
import { watch } from "vue";
import { storeToRefs, type Store } from "pinia";
import EditTask from "@/components/Modals/EditTask.vue";

import EditColumn from "@/components/Modals/EditColumn.vue";
import KanbanView from "@/components/Views/KanbanView.vue";
import TableViewVue from "@/components/Views/TableView.vue";
import CreateColumnVue from "@/components/Column/CreateColumn.vue";
import { useRouter } from "vue-router";

const auth = authStore();
const { isLoggedIn } = storeToRefs(auth);
const useLayoutStore = layoutStore();
const store = useStore();
const router = useRouter()

const boardView = ref('board')
onMounted(() => {
  
  store.getBoard(router.currentRoute.value.params.id)
  
})
watch(isLoggedIn, () => {
  if (!isLoggedIn.value) {
    auth.logout();
  }
});
const handleView = () => {
  if (boardView.value === 'board') {
    boardView.value = 'table'
  } else {
    boardView.value = 'board'
  }
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
