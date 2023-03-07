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
                v-model="columnName"
                class="mt-2 shadow appearance-none border rounded py-1 px-1"
              />
            </div>
            <div class="m-4 items-center">
              <label class="block text-sm font-medium">Description</label>
              <input
              v-model="columnColor"
                type="color"
                class="mt-2 shadow appearance-none border rounded py-1 px-1"
              />
            </div>
            <div class="flex">
            <button class="bg-red-500 p-2 rounded m-4 hover:bg-red-400 focus:outline" @click="useLayoutStore.drawerOpen = false">Cancel</button>
            <button type="submit" class="bg-red-500 p-2 rounded m-4 hover:bg-red-400 focus:outline" @click="createColumn">Create Column</button>
        </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { layoutStore } from '@/stores/LayouStore';
import { useStore } from '@/stores/store';
const store = useStore()
const useLayoutStore = layoutStore()
const columnName = ref('')
const columnColor = ref('')
const createColumn = () => {
  const payload = {
    name: columnName.value,
    color: columnColor.value
  }
  store.createColumn(payload)
}
</script>