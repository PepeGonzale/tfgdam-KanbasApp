<template>
  <div
    :class="props.show ? 'flex' : 'hidden'"
    class="fixed inset-0 z-50 items-center justify-center bg-black/70 backdrop-blur-sm"
  >
    <div class="bg-bg-card border border-white/[0.08] rounded-2xl shadow-modal w-full max-w-sm mx-4 overflow-hidden">
      <!-- Red top accent -->
      <div class="h-px bg-gradient-to-r from-red-500/50 via-red-400/30 to-transparent"></div>

      <div class="p-6">
        <!-- Icon -->
        <div class="flex items-center justify-center w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>

        <h3 class="text-base font-semibold text-[#F5F0E8] text-center mb-1">Delete column</h3>
        <p class="text-xs text-[#6A5C4E] text-center mb-6 leading-relaxed">
          This action cannot be undone. All tasks in this column will be permanently removed.
        </p>

        <div class="flex gap-3">
          <button
            @click="useLayoutStore.closeModal()"
            type="button"
            class="flex-1 bg-white/[0.04] hover:bg-white/[0.07] text-[#8A7A66] font-semibold rounded-xl px-4 py-2.5 text-sm transition-colors border border-white/[0.06]"
          >Cancel</button>
          <button
            @click="handleDelete"
            type="button"
            class="flex-1 bg-red-500 hover:bg-red-400 text-white font-bold rounded-xl px-4 py-2.5 text-sm transition-all"
          >Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { layoutStore } from '@/stores/LayouStore';
import { useStore } from '@/stores/store';

const store = useStore();
const useLayoutStore = layoutStore();
const props = defineProps({ show: Boolean });

const handleDelete = async () => {
  await store.deleteColumn(useLayoutStore.columnData._id);
  useLayoutStore.closeModal();
};
</script>
