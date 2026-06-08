<template>
  <form
    @input="handleSearch"
    class="hidden md:flex items-center gap-2 ml-6 px-3 py-2 bg-bg-surface border border-white/[0.06] rounded-xl max-w-xs flex-1 focus-within:border-amber-500/30 transition-all"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-4 h-4 text-[#5A4E42] shrink-0"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
    <input
      v-model="search"
      placeholder="Search tasks..."
      type="text"
      class="bg-transparent text-sm text-[#F5F0E8] placeholder-[#3D3425] outline-none w-full"
    />
  </form>
</template>

<script lang="ts" setup>
import { api } from "@/helpers/axios";
import { layoutStore } from "@/stores/LayouStore";
import { useStore } from "@/stores/store";
import { ref } from "vue";

const store = useStore();
const search = ref('');
const emits = defineEmits(['search']);
const useLayoutStore = layoutStore();

const handleSearch = async () => {
  store.searchingTasks = true;
  if (!search.value) {
    store.searchedTasks = [];
    emits('search', []);
    return;
  }
  const res = await api.get(`/board/${store.selectedBoard?._id}/search?search=${search.value}`);
  emits('search', res.data);
};
</script>
