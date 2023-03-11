<template>
 <div class="modal bg-slate-900 text-black bg-lessblack pl-8 rounded-lg">
    <!-- The button to open modal -->
    <label for="my-modal" class="ml-auto pt-3">{{ store.selectedBoard?.title }} create new column</label>
    <!-- Put this part before </body> tag -->
    <div class="modal">
      <div class="modal-box">
        <div class="modal-action items-center">
          <div class="m-4 items-center">
            <label class="block text-sm font-medium">Name</label>
            <input
              type="text"
              
              class="mt-2 shadow appearance-none border rounded py-1 px-1"
            />
          </div>
          <div class="m-4 items-center">
            <label class="block text-sm font-medium">Description</label>
            <input
              
              type="text"
              class="mt-2 shadow appearance-none border rounded py-1 px-1"
            />
          </div>
          <div class="flex">
          <button class="bg-red-500 p-2 rounded m-4 hover:bg-red-400 focus:outline" @click="useLayoutStore.drawerOpen = false">Cancel</button>
          <button type="submit" class="bg-red-500 p-2 rounded m-4 hover:bg-red-400 focus:outline" @click="createColumn">Create Task</button>
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
const createColumn = async () => {
  const payload = {
    name: columnName.value,
    color: columnColor.value
  }
  const result = await store.createColumn(payload)
  const save = result.data.column
  const last = save[save.length-1]
  store.selectedBoard?.column.push(last)
  useLayoutStore.drawerOpen = false

}
</script>