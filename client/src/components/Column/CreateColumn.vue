<template>
     <div class="w-full">
              <button
                class="bg-white  p-1.5 rounded-md px-2s hover:bg-gray-100"
                @click="createColumn"
              >
                <span>Create new list</span>
              </button>
            </div>
</template>
<script lang="ts" setup>
import { layoutStore } from '@/stores/LayouStore';

const useLayoutStore = layoutStore();

const createColumn = () => {
  useLayoutStore.modalContent = "createColumn"
  useLayoutStore.drawerOpen = true
  useLayoutStore.columnData.name = ''
}
</script>