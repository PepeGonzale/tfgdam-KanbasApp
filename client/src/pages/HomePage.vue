<template>
  <Default>
    <div class="flex flex-1">
      <main class="flex-1 overflow-hidden bg-bg-base">
        <div class="flex flex-row lg:flex-col">

          <!-- Top bar -->
          <div class="shrink-0 hidden lg:flex justify-between items-center px-6 py-3 border-b border-white/[0.05]">
            <div class="flex items-center gap-2">
              <span class="w-1 h-1 rounded-full bg-amber-500/60"></span>
              <h1 class="text-sm font-semibold text-[#8A7A66]">
                {{ store.selectedBoard?.title }}
              </h1>
            </div>
            <div class="flex items-center gap-3">
              <IconNavigation v-model:boardView="boardView" />
              <CreateColumnVue />
            </div>
          </div>

          <Search @search="handleSearch" />

          <!-- Kanban view -->
          <div v-if="boardView === 'board'" class="flex-1 overflow-x-auto">
            <div class="inline-flex items-start gap-4 px-6 py-5 min-h-full">
              <KanbanView
                v-for="column in store.selectedBoard?.column"
                :key="column._id"
                :column="column"
              />
            </div>
          </div>

          <!-- Table view -->
          <div v-if="boardView === 'table'" class="flex-1 p-5">
            <TableViewVue />
          </div>

        </div>
      </main>
    </div>

    <!-- Modal overlay -->
    <div
      v-if="useLayoutStore.drawerOpen && useLayoutStore.modalContent !== 'editTask' && useLayoutStore.modalContent !== 'delete'"
      class="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      @click.self="useLayoutStore.drawerOpen = false"
    >
      <div class="bg-bg-card border border-white/[0.08] rounded-2xl shadow-modal w-full max-w-md">
        <div class="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <h2 class="text-sm font-semibold text-[#F5F0E8]">
            <span v-if="useLayoutStore.modalContent === 'createColumn'">
              {{ useLayoutStore.columnData?.name ? 'Edit column' : 'New column' }}
            </span>
            <span v-else-if="useLayoutStore.modalContent === 'addUsers'">Add member</span>
          </h2>
          <button
            @click="useLayoutStore.drawerOpen = false"
            class="w-7 h-7 flex items-center justify-center rounded-lg text-[#5A4E42] hover:text-[#F5F0E8] hover:bg-white/[0.06] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-6">
          <ColumnModal v-if="useLayoutStore.modalContent === 'createColumn'" />
          <AddUsers v-if="useLayoutStore.modalContent === 'addUsers'" />
        </div>
      </div>
    </div>

    <EditTask v-if="useLayoutStore.drawerOpen && useLayoutStore.modalContent === 'editTask'" />
  </Default>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { authStore } from '@/stores/auth/authStore';
import { layoutStore } from '@/stores/LayouStore';
import { useStore } from '@/stores/store';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

import AddUsers from '@/components/Modals/AddUsers.vue';
import ColumnModal from '@/components/Modals/ColumnModal.vue';
import EditTask from '@/components/Modals/EditTask.vue';
import KanbanView from '@/components/Views/KanbanView.vue';
import TableViewVue from '@/components/Views/TableView.vue';
import CreateColumnVue from '@/components/Column/CreateColumn.vue';
import IconNavigation from '@/components/General/IconNavigation.vue';
import Default from '@/layouts/Default.vue';
import Search from '@/components/Search.vue';

const auth = authStore();
const { isLoggedIn } = storeToRefs(auth);
const useLayoutStore = layoutStore();
const store = useStore();
const router = useRouter();
const boardView = ref('board');

onBeforeMount(async () => {
  await store.getBoard(router.currentRoute.value.params.id as string);
  store.fetchBoards();
  auth.fetchUserInfo();
});

watch(isLoggedIn, () => {
  if (!isLoggedIn.value) auth.logout();
});

const handleSearch = (e: any) => {
  store.searchedTasks = e;
};
</script>
