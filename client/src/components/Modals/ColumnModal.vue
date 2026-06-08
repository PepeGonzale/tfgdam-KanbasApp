<template>
  <div class="space-y-5">
    <div>
      <label class="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A4E42] mb-2">Column name</label>
      <input
        type="text"
        placeholder="e.g. In Progress"
        v-model="columnName"
        class="w-full bg-bg-surface border border-white/[0.08] rounded-xl px-4 py-3
               text-[#F5F0E8] placeholder-[#3D3425]
               focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/10 focus:outline-none
               text-sm transition-all"
      />
    </div>

    <div>
      <label class="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A4E42] mb-2">Color</label>
      <div class="flex items-center gap-3">
        <input
          type="color"
          v-model="columnColor"
          class="w-10 h-10 rounded-xl border border-white/[0.08] bg-bg-surface cursor-pointer p-1 shrink-0"
        />
        <input
          type="text"
          v-model="columnColor"
          placeholder="#f59e0b"
          class="flex-1 bg-bg-surface border border-white/[0.08] rounded-xl px-4 py-3
                 text-[#F5F0E8] placeholder-[#3D3425]
                 focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/10 focus:outline-none
                 text-sm transition-all font-mono"
        />
      </div>
    </div>

    <div class="flex gap-3 pt-1">
      <button
        type="button"
        @click="closeColumn"
        class="flex-1 bg-white/[0.04] hover:bg-white/[0.07] text-[#8A7A66] font-semibold rounded-xl px-4 py-2.5 text-sm transition-colors border border-white/[0.06]"
      >Cancel</button>
      <button
        v-if="useLayoutStore.columnData.name === ''"
        type="button"
        @click="createColumn"
        class="flex-1 bg-amber-500 hover:bg-amber-400 text-[#0E0C0A] font-bold rounded-xl px-4 py-2.5 text-sm transition-all"
        style="box-shadow: 0 0 16px rgba(245,158,11,0.18);"
      >Create Column</button>
      <button
        v-else
        type="button"
        @click="editColumn"
        class="flex-1 bg-amber-500 hover:bg-amber-400 text-[#0E0C0A] font-bold rounded-xl px-4 py-2.5 text-sm transition-all"
        style="box-shadow: 0 0 16px rgba(245,158,11,0.18);"
      >Save Changes</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { layoutStore } from '@/stores/LayouStore';
import { useStore } from '@/stores/store';
import { toast } from 'vue-sonner';

const store = useStore();
const useLayoutStore = layoutStore();
const columnName = ref(useLayoutStore.columnData.name || '');
const columnColor = ref('#f59e0b');

const closeColumn = () => {
  useLayoutStore.drawerOpen = false;
};

const createColumn = async () => {
  const payload = { name: columnName.value, color: columnColor.value };
  const result = await store.createColumn(payload);
  const save = result.data.column;
  const last = save[save.length - 1];
  store.selectedBoard?.column.push(last);
  useLayoutStore.columnData.name = '';
  useLayoutStore.drawerOpen = false;
};

const editColumn = async () => {
  useLayoutStore.columnData.name = columnName.value;
  await store.editColumn(useLayoutStore.columnData);
  useLayoutStore.columnData.name = '';
  useLayoutStore.drawerOpen = false;
  toast.success('Column updated');
};
</script>
