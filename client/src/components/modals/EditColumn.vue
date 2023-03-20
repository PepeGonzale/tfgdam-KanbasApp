<template>
      <div class="modal bg-slate-900 text-white pl-8 rounded-lg">
    <!-- The button to open modal -->
    <label for="my-modal" class="ml-auto pt-3">open modal</label>

    <!-- Put this part before </body> tag -->

    <div class="modal">
      <div class="modal-box">
        <div class="modal-action items-center">
          <div class="m-4 items-center">
            <label class="block text-sm font-medium">Name</label>
            <input
              type="text"
              v-model="store.draftColumn.name"
              class="mt-2 shadow appearance-none border rounded py-1 px-1 text-black"
            />
          </div>
          <div class="m-4 items-center">
            <label class="block text-sm font-medium">Description</label>
            <input
              v-model="store.draftColumn.color"
              type="text"
              class="mt-2 shadow appearance-none border rounded py-1 px-1 text-black"
            />
          </div>
        
          <div class="flex">
            <button @click="deleteColumn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

            </button>
          <button class="bg-red-500 p-2 rounded m-4 hover:bg-red-400 focus:outline" @click="useLayoutStore.drawerOpen = false">Cancel</button>
          <button type="submit" class="bg-red-500 p-2 rounded m-4 hover:bg-red-400 focus:outline" @click="editTask">Edit Task</button>
      </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from '@/stores/store';
import { layoutStore } from '@/stores/LayouStore';
const store = useStore()
const useLayoutStore = layoutStore()

const deleteColumn = () => {
    store.deleteColumn(store.draftColumn._id);
    useLayoutStore.drawerOpen = false
}

</script>