<template>
 <div class="bg-gray-200 text-black pl-8 rounded-lg text-center max-w-2xl m-auto">
    <!-- The button to open modal -->
    <label for="" class="ml-auto pt-3 text-sm lg:text-lg">{{ store.selectedBoard?.title }} create new column</label>
    <!-- Put this part before </body> tag -->
    <div class="">
      <div class="">
        <div class="">
          <div class="m-4 items-center">
            <label class="block font-medium text-sm lg:text-md">Name</label>
            <div class="relative">
            <input type="text" placeholder="Title of the column" v-model="columnName" class="px-3 py-2 mt-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white pl-10"/>
            <span class="absolute inset-y-0 left-0 flex items-center text-center pl-3">
              <svg viewBox="0 0 24 24" width="16" height="16" class="inline-block"><path fill="currentColor" d="M21 13H14.4L19.1 17.7L17.7 19.1L13 14.4V21H11V14.3L6.3 19L4.9 17.6L9.4 13H3V11H9.6L4.9 6.3L6.3 4.9L11 9.6V3H13V9.4L17.6 4.8L19 6.3L14.3 11H21V13Z"></path></svg>
</span>
</div>

           <!--  <input
              type="text"
              v-model="columnName"
              class="mt-2 shadow appearance-none border rounded py-1 px-1"
            /> -->
          </div>
          <div class="m-4 items-center">
            <label class="block text-sm font-medium">Description</label>
            
            <input type="text" placeholder="Description" v-model="columnColor" class="px-3 py-2 mt-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white  pl-10"/>
          </div>
          <div class="">
          <button class="bg-red-500 p-2 rounded m-4 hover:bg-red-400 focus:outline" @click="closeColumn">Cancel</button>
          <button type="submit" class="bg-red-500 p-2 rounded m-4 hover:bg-red-400 focus:outline" v-if="useLayoutStore.columnData.name === ''" @click="createColumn">Create Column</button>
          <button type="submit" class="bg-red-500 p-2 rounded m-4 hover:bg-red-400 focus:outline" @click="editColumn" v-else>Edit Column</button>
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
import { toast } from 'vue-sonner';

const store = useStore()
const useLayoutStore = layoutStore()
const columnName = ref(useLayoutStore.columnData.name || '')
const columnColor = ref('')
const closeColumn = () => {
  useLayoutStore.drawerOpen = false
  
}
const createColumn = async () => {
  const payload = {
    name: columnName.value,
    color: columnColor.value
  }
  const result = await store.createColumn(payload)
  const save = result.data.column
  const last = save[save.length-1]
  store.selectedBoard?.column.push(last)
  useLayoutStore.columnData.name = ''
  useLayoutStore.drawerOpen = false

}
const editColumn = async () => {
  useLayoutStore.columnData.name = columnName.value
  const res = await store.editColumn(useLayoutStore.columnData)
  .then(() => {
    useLayoutStore.columnData.name = ''
    useLayoutStore.drawerOpen = false
    toast.success('Column edited successfully')
  })
}
</script>