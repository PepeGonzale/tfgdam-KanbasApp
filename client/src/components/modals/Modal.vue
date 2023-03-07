<template>
  <div
    id="popup-modal"
    tabindex="-1"
    class="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
  >
    <div class="relative w-full h-full max-w-md md:h-auto">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="space-y-1">
          <div class="grid grid-cols-1 lg:grid-col-2 lg:gap-3">
            <div class="m-4 items-center">
              <label class="block text-sm font-medium">Name</label>
              <input
                type="text"
                v-model="nameBoard"
                class="mt-2 shadow appearance-none border rounded py-1 px-1"
              />
            </div>
            <div class="m-4 items-center">
              <label class="block text-sm font-medium">Description</label>
              <input
              v-model="descriptionBoard"
                type="text"
                class="mt-2 shadow appearance-none border rounded py-1 px-1"
              />
            </div>
            <div class="flex">
            <button class="bg-red-500 p-2 rounded m-4 hover:bg-red-400 focus:outline" @click="useLayoutStore.drawerOpen = false">Cancel</button>
            <button type="submit" class="bg-red-500 p-2 rounded m-4 hover:bg-red-400 focus:outline" @click="createBoard">Create Board</button>
        </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { layoutStore } from "@/stores/LayouStore";
import {useStore } from "@/stores/store"
import { ref } from "vue";
const useLayoutStore = layoutStore();
const store = useStore()
const nameBoard = ref('')
const descriptionBoard = ref('')
const createBoard = async () => {
    const payload:any = {title: nameBoard.value, description: descriptionBoard.value}
    const result = await store.createBoard(payload)
    useLayoutStore.drawerOpen = false
}

</script>
