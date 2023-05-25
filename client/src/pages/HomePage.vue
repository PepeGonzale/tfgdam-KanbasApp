<template>
  <Default>
    <div class="flex flex-1">
      
      <main class="flex-1 overflow-hidden bg-blue-primary">
        <div class="flex flex-row lg:flex-col">
          <div class="shrink-0 hidden lg:flex justify-between items-center p-4">
            <h1 class="text-2x font-bold">
              Project Name : {{ store.selectedBoard?.title }}
            </h1>
            <IconNavigation :board-view="boardView" />
            <div>
              <CreateColumnVue />
            </div>
          </div>

          <Search @search="handleSearch"  />

          <div
            class="flex-1 lg:col-auto flex-col md:flex-col m-auto md:w-[2040px]"
            v-if="boardView === 'board'"
            :class="
              store.selectedBoard?.column?.length >= 7 ? 'overflow-x-auto' : ''
            "
          >
            <div
              class="inline-flex items-start flex-col mx-auto md:flex-row md:px-4 md:pb-4 md:space-x-4"
            >
         
              <div
                class="md:m-2 bg-gray-300 items-center md:items-start md:w-80 md:bg-none flex flex-col rounded-[3px]"
                v-for="column in store.selectedBoard?.column"
                :key="column._id"
              >
         
    <KanbanView :column="column" />

              </div>
             
            </div>
          </div>
          <div class="">
            <TableViewVue v-if="boardView === 'table'" />
          </div>
        </div>
      </main>
    </div>

    <div
      class="top-0 bottom-0 left-0 right-0 fixed modal overflow-auto z-index-40"
      v-if="useLayoutStore.drawerOpen"
    >
      <div class="p-1.5 my-10 mx-auto outline-none shadow-xl w-4/6">
        <div class="">
          <ColumnModal
            v-if="
              useLayoutStore.drawerOpen &&
              useLayoutStore.modalContent === 'createColumn'
            "
          />

          <EditTask
            v-if="
              useLayoutStore.drawerOpen &&
              useLayoutStore.modalContent == 'editTask'
            "
          />
          <AddUsers
            v-if="
              useLayoutStore.drawerOpen &&
              useLayoutStore.modalContent == 'addUsers'
            "
          />
        </div>
      </div>
    </div>
  </Default>
</template>
<script lang="ts" setup>
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { authStore } from "@/stores/auth/authStore";
import { layoutStore } from "@/stores/LayouStore";
import { useStore } from "@/stores/store";
import AddUsers from "@/components/Modals/AddUsers.vue";
import draggable from "vuedraggable";
import ColumnModal from "@/components/Modals/ColumnModal.vue";
import { watch } from "vue";
import { storeToRefs } from "pinia";
import EditTask from "@/components/Modals/EditTask.vue";
import KanbanView from "@/components/Views/KanbanView.vue";
import TableViewVue from "@/components/Views/TableView.vue";
import CreateColumnVue from "@/components/Column/CreateColumn.vue";
import { useRouter } from "vue-router";
import IconNavigation from "@/components/General/IconNavigation.vue";
import Default from "@/layouts/Default.vue";
import Search from "@/components/Search.vue";

const auth = authStore();
const { isLoggedIn } = storeToRefs(auth);
const useLayoutStore = layoutStore();
const store = useStore();
const router = useRouter();
const boardView = ref("board");
let columns = []
onBeforeMount(() => {
  store.fetchBoards();
  store.getBoard(router.currentRoute.value.params.id);
  auth.userInfo;
  
  /* columns = store.selectedBoard.column.map(c => ({...c}))   */
  
  
});

 columns = store.selectedBoard?.column.map(c => ({...c})) 
 
watch(isLoggedIn, () => {
  if (!isLoggedIn.value) {
    auth.logout();
  }
});

const handleSearch = (e) => {
  // getter para filtrar unicamente las tareas que den match con el search
  console.log(e);
  store.searchedTasks = e;
  store.searchedTask(e);
};
const handleDrag = async (e:any) => {
  if (e?.added?.element) {
    const column = e?.added.element;
    console.log(column)
    
    
    
   
  }
};
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
