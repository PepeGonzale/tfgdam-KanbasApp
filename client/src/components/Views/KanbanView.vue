<template>
  <div class="flex flex-col w-72 min-w-[288px] shrink-0">
    <!-- Column header -->
    <div class="bg-bg-surface rounded-t-xl px-4 py-3 flex items-center justify-between border-b border-white/[0.04]">
      <div class="flex items-center gap-2.5">
        <span class="drag-handle cursor-move text-[#5A4E42] text-xs select-none">⠿</span>
        <span
          v-if="props.column.color"
          class="w-2 h-2 rounded-full shrink-0 ring-1 ring-white/10"
          :style="{ backgroundColor: props.column.color }"
        ></span>
        <h3 class="text-xs font-semibold uppercase tracking-widest text-[#8A7A66]">
          {{ props.column.name }}
        </h3>
        <span class="text-[10px] font-medium tabular-nums bg-white/[0.05] text-[#5A4E42] rounded-md px-1.5 py-0.5 border border-white/[0.04]">
          {{ store.taskByColumn(props.column._id)?.length ?? 0 }}
        </span>
      </div>

      <!-- Column actions -->
      <div
        @mouseover="isEdit = true"
        @mouseleave="isEdit = false"
        class="relative hidden md:inline-block"
      >
        <button class="hover:bg-white/[0.06] p-1.5 rounded-md grid place-content-center transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3.5 h-3.5 text-[#5A4E42]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
        </button>
        <div
          class="absolute right-0 mt-1 w-36 origin-top-right bg-bg-elevated border border-white/[0.08] rounded-lg shadow-modal z-20"
          :class="isEdit ? 'block' : 'hidden'"
        >
          <div class="p-1">
            <span @click="editColumn(props.column)" class="block px-2.5 py-1.5 text-xs text-[#F5F0E8] hover:bg-white/[0.05] cursor-pointer rounded-md transition-colors">Edit</span>
            <span @click="deleteColumn(props.column)" class="block px-2.5 py-1.5 text-xs text-[#F5F0E8] hover:bg-red-500/10 hover:text-red-400 cursor-pointer rounded-md transition-colors">Delete</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Task list -->
    <div class="flex flex-col bg-bg-surface/60 border-x border-white/[0.04] flex-1 overflow-y-auto max-h-[calc(100vh-220px)]">
      <Column :column="props.column" />
    </div>

    <!-- Add task footer -->
    <div class="bg-bg-surface rounded-b-xl border-t border-white/[0.04]">
      <CreateTask :column="props.column" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/stores/store';
import Column from '@/components/Column/Column.vue';
import { ref } from 'vue';
import CreateTask from '@/components/Modals/CreateTask.vue';
import { layoutStore } from '@/stores/LayouStore';

const store = useStore();
const useLayoutStore = layoutStore();
const isEdit = ref(false);

const props = defineProps({
  column: {
    type: Object,
    required: true,
  },
});

const editColumn = (e: any) => {
  useLayoutStore.modalContent = 'createColumn';
  useLayoutStore.drawerOpen = true;
  useLayoutStore.columnData = e;
};

const deleteColumn = (e: any) => {
  useLayoutStore.modalContent = 'delete';
  useLayoutStore.drawerOpen = true;
  useLayoutStore.columnData = e;
};
</script>
