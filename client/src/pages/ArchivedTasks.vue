<template>
  <Default>
    <div class="min-h-screen bg-bg-base px-6 py-8">
      <!-- Back nav -->
      <div
        class="inline-flex items-center gap-2 mb-8 cursor-pointer text-[#5A4E42] hover:text-amber-400 transition-colors"
        @click="router.go(-1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        <span class="text-sm font-medium">Back</span>
      </div>

      <div class="max-w-2xl mx-auto">
        <div class="mb-6">
          <p class="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A4E42] mb-1">Board</p>
          <h1 class="text-2xl font-semibold text-[#F5F0E8]">Archived Tasks</h1>
        </div>

        <!-- Search -->
        <div class="relative mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 text-[#5A4E42] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            placeholder="Search archived tasks..."
            type="text"
            class="w-full bg-bg-card border border-white/[0.07] rounded-xl pl-10 pr-4 py-2.5
                   text-[#F5F0E8] placeholder-[#3D3425]
                   focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/10 focus:outline-none
                   text-sm transition-all"
            v-model="archiveSearch"
            @input="handleSearch"
          />
        </div>

        <!-- Task list -->
        <div class="space-y-1.5">
          <div
            v-for="project in archivedLocal"
            :key="project?._id"
            class="group relative flex items-center justify-between bg-bg-card border border-white/[0.06] rounded-xl px-4 py-3 hover:border-amber-500/15 transition-all"
          >
            <!-- Checkbox + title -->
            <div class="flex items-center gap-3">
              <input
                type="checkbox"
                class="w-4 h-4 rounded bg-bg-surface border-white/20 accent-amber-500 cursor-pointer shrink-0"
                @change="handleCheckbox(project)"
                v-model="project.checked"
              />
              <span class="text-sm text-[#8A7A66] group-hover:text-[#F5F0E8] transition-colors">{{ project?.title }}</span>
            </div>

            <!-- Actions dropdown -->
            <div class="relative hidden md:inline-block" ref="dropdownRef">
              <button
                class="p-1.5 rounded-lg text-[#3D3425] hover:text-[#8A7A66] hover:bg-white/[0.05] transition-colors"
                @click="project.dropdown = !project.dropdown"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </button>
              <div
                class="absolute right-0 mt-1 w-40 origin-top-right bg-bg-elevated border border-white/[0.08] rounded-xl shadow-modal z-10 overflow-hidden"
                :class="project.dropdown ? 'block' : 'hidden'"
              >
                <span
                  @click="restoreTask(project._id)"
                  class="flex items-center gap-2 px-3 py-2.5 text-xs text-[#8A7A66] hover:bg-amber-500/[0.07] hover:text-amber-400 cursor-pointer transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3.5 h-3.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                  </svg>
                  Restore
                </span>
                <span
                  @click="deleteTask(project._id)"
                  class="flex items-center gap-2 px-3 py-2.5 text-xs text-[#8A7A66] hover:bg-red-500/[0.07] hover:text-red-400 cursor-pointer transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3.5 h-3.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  Delete permanently
                </span>
              </div>
            </div>
          </div>

          <!-- Empty state -->
          <div v-if="!archivedLocal.length" class="text-center py-20">
            <div class="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#5A4E42]" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <p class="text-sm text-[#5A4E42]">No archived tasks</p>
            <p class="text-xs text-[#3D3425] mt-1">Tasks you archive from the board will appear here</p>
          </div>
        </div>
      </div>
    </div>
  </Default>
</template>

<script setup lang="ts">
import { api } from '@/helpers/axios';
import Default from '@/layouts/Default.vue';
import { useStore } from '@/stores/store';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const archiveSearch = ref('');
let tasksSelected: any[] = [];

interface ArchivedUI { _id: string; title: string; dropdown: boolean; checked: boolean }
const archivedLocal = ref<ArchivedUI[]>([]);

function toUI(raw: any[]): ArchivedUI[] {
  return raw.map((t) => ({ ...t, dropdown: false, checked: false }));
}

onMounted(async () => {
  await store.getBoard(router.currentRoute.value.params.id as string);
  const res = await api.get(`/board/archived/${store.selectedBoard?._id}`);
  archivedLocal.value = toUI(res.data);
});

const deleteTask = async (taskId: string) => {
  store.selectedTaskId = taskId;
  await store.deleteArchiveTask();
  archivedLocal.value = archivedLocal.value.filter((t) => t._id !== taskId);
};

const restoreTask = async (taskId: string) => {
  const boardId = store.selectedBoard?._id;
  if (!boardId) return;
  const res = await api.post(`/board/${boardId}/restore/${taskId}`);
  archivedLocal.value = toUI(res.data.archivedTasks);
  if (store.selectedBoard) store.selectedBoard.tasks = res.data.tasks;
};

const handleCheckbox = (e: any) => {
  tasksSelected.push(e);
};

const handleSearch = async () => {
  const boardId = store.selectedBoard?._id;
  if (!boardId) return;
  const res = await api.get(
    `/board/${boardId}/archived/search?archivedSearch=${archiveSearch.value}`
  );
  archivedLocal.value = toUI(res.data);
};
</script>
