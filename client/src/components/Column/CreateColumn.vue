<template>
     <div class="w-full">
              <button
                class="flex  items-center bg-white/10 w-full hover:bg-white/20 text-black p-2 text-sm font-medium rounded-md"
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