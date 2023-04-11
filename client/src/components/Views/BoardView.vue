<template>
  <div
    class="text-black justify-between flex cursor-pointer m-auto bg-gray-200 mt-12 w-4/5 p-3"
    @click="handleSelectedBoard(board)"
  >
    <div class="flex">
      <a class="text-2xl">My projects</a>
    </div>
    <div>
      <button
        class="text-2xl bg-cyan-300 p-2 rounded-md"
        @click="() => createBoard()"
      >
        New Project
      </button>
    </div>
  </div>
  <section class="flex w-4/5 m-auto bg-gray-200">
    <div class="flex-1 m-auto">
      <ul
        v-for="project in store.boards"
        @click="handleSelectedBoard(project)"
        class=""
      >
        <li class="bg-white hover:bg-gray-100 p-3 cursor-pointer text-center">
          <a class="">
            <div class="block">{{ project.title }}</div>
            <div class="block">{{ project.description }}</div>
            </a>
          <button class="absolute top-1 right-1">
a
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { layoutStore } from "@/stores/LayouStore";
import { useStore } from "@/stores/store";
import { defineEmits } from "vue";
const props = defineProps({
  boards: {
    type: Object,
    required: true,
  },
});
const emits = defineEmits(["selectedBoard"]);
const store = useStore();
const useLayoutStore = layoutStore();
const handleSelectedBoard = (board: any) => {
  emits("selectedBoard", board);
};
const createBoard = () => {
  useLayoutStore.modalContent = "createBoard";
  useLayoutStore.drawerOpen = true;
};
</script>
