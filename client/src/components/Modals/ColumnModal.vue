<template>
 <div class="bg-gray-300 text-black pl-8 rounded-lg text-center max-w-2xl m-auto">
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
            <span class="absolute inset-y-0 left-0 top-1.5 flex items-center text-center pl-3">
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
            
            <div class="relative">
            <input type="text" placeholder="Description" v-model="columnColor" class="px-3 py-2 mt-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white  pl-10"/>
            <span class="absolute inset-y-0 left-0 top-2 flex items-center text-center pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="16" height="16">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
</svg>
</span>
            </div>
          </div>
          <div class="">
            <GeneralButton text="Cancel" @submit="closeColumn" class="bg-none "/>
            <GeneralButton @submit="createColumn" text="Create Column" v-if="useLayoutStore.columnData.name === ''" />
            <GeneralButton @submit="editColumn" text="Edit Column" v-else />
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
import GeneralButton from '../buttons/GeneralButton.vue';
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
  .catch(() => {
    toast.error("Esta columna ya ha sido creada")
  })
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