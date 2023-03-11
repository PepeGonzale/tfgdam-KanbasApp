<template>
  <div class="modal text-white bg-slate-900 pl-8 rounded-lg">
    <!-- The button to open modal -->
    <label for="my-modal" class="ml-auto pt-3">Create new board</label>
    <!-- Put this part before </body> tag -->
    <div class="modal">
      <div class="modal-box">
        <div class="modal-action items-center">
          <div class="m-4 items-center">
            <label class="block text-sm font-medium">Name</label>
            <input
              type="text"
              v-model="nameBoard"
              class="mt-2 shadow appearance-none border rounded py-1 px-1 text-black"
            />
          </div>
          <div class="m-4 items-center">
            <label class="block text-sm font-medium">Description</label>
            <input
              v-model="descriptionBoard"
              type="text"
              class="mt-2 shadow appearance-none border rounded py-1 px-1 text-black"
            />
          </div>
          <div class="flex">
          <button class="bg-red-500 p-2 rounded m-4 hover:bg-red-400 focus:outline" @click="useLayoutStore.drawerOpen = false">Cancel</button>
          <button type="submit" class="bg-red-500 p-2 rounded m-4 hover:bg-red-400 focus:outline" @click="createBoard">Create Task</button>
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
