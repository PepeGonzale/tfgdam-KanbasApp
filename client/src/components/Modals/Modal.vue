<template>
  <div class="space-y-5">
    <div>
      <label class="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A4E42] mb-2">Project name</label>
      <input
        type="text"
        placeholder="e.g. Sprint Planning"
        v-model="nameBoard"
        class="w-full bg-bg-surface border border-white/[0.08] rounded-xl px-4 py-3
               text-[#F5F0E8] placeholder-[#3D3425]
               focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/10 focus:outline-none
               text-sm transition-all"
      />
    </div>
    <div>
      <label class="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A4E42] mb-2">
        Description <span class="normal-case font-normal text-[#3D3425] ml-1">(optional)</span>
      </label>
      <textarea
        placeholder="What is this project about?"
        v-model="descriptionBoard"
        rows="3"
        class="w-full bg-bg-surface border border-white/[0.08] rounded-xl px-4 py-3
               text-[#F5F0E8] placeholder-[#3D3425]
               focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/10 focus:outline-none
               text-sm transition-all resize-none"
      ></textarea>
    </div>
    <div class="flex gap-3 pt-1">
      <button
        type="button"
        @click="useLayoutStore.drawerOpen = false"
        class="flex-1 bg-white/[0.04] hover:bg-white/[0.07] text-[#8A7A66] font-semibold rounded-xl px-4 py-2.5 text-sm transition-colors border border-white/[0.06]"
      >Cancel</button>
      <button
        type="button"
        @click="createBoard"
        class="flex-1 bg-amber-500 hover:bg-amber-400 text-[#0E0C0A] font-bold rounded-xl px-4 py-2.5 text-sm transition-all"
        style="box-shadow: 0 0 16px rgba(245,158,11,0.18);"
      >Create Project</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { layoutStore } from '@/stores/LayouStore';
import { useStore } from '@/stores/store';
import { ref } from 'vue';
const useLayoutStore = layoutStore();
const store = useStore();
const nameBoard = ref('');
const descriptionBoard = ref('');
const createBoard = async () => {
  const payload: any = { title: nameBoard.value, description: descriptionBoard.value };
  await store.createBoard(payload);
  useLayoutStore.drawerOpen = false;
};
</script>
