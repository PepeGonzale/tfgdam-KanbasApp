<template>
  <div class="px-3 py-2.5">
    <div @focusout="showInput = false">
      <input
        v-if="props.column === store.selectedColumn"
        v-model="body"
        @keypress.enter="handleTask(props.column)"
        :class="showInput ? 'block' : 'hidden'"
        placeholder="Task title..."
        class="w-full bg-bg-base border border-white/[0.08] rounded-lg px-3 py-2
               text-[#F5F0E8] placeholder-[#3D3425]
               focus:border-amber-500/30 focus:outline-none
               text-xs transition-all mb-2"
      />
      <button
        v-if="showInput"
        @click="handleTask(props.column)"
        class="w-full flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-400
               text-[#0E0C0A] text-xs font-bold rounded-lg px-3 py-2 transition-all"
      >
        Add task
      </button>
    </div>
    <button
      v-if="!showInput"
      @click="startEdit(props.column)"
      class="w-full flex items-center gap-1.5 px-3 py-2 text-xs font-medium
             text-[#5A4E42] hover:text-amber-500 hover:bg-amber-500/[0.05]
             rounded-lg transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3 h-3">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      Add card
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/stores/store';
import { ref } from 'vue';
import { toast } from 'vue-sonner';

const store = useStore();
const showInput = ref(false);
const body = ref('');
const props = defineProps(['column']);

type Column = { name: string; _id: string; color: string };

const handleTask = async (column: Column) => {
  try {
    await store.createTask({
      title: body.value,
      status: {
        name: column.name,
        _id: store.selectedBoard?.column.filter((t) => t.name === column.name)[0]._id,
      },
    });
  } catch {
    return;
  } finally {
    toast.success('Task created');
    body.value = '';
    showInput.value = false;
  }
};

const startEdit = (column: any) => {
  store.selectedColumn = column;
  showInput.value = true;
};
</script>
