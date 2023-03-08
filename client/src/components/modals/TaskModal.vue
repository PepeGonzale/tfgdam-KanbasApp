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
              v-model="title"
              class="mt-2 shadow appearance-none border rounded py-1 px-1"
            />
          </div>
          <div class="m-4 items-center">
            <label class="block text-sm font-medium">Description</label>
            <input
            v-model="description"
              type="text"
              class="mt-2 shadow appearance-none border rounded py-1 px-1"
            />
         
           
          </div>
          <div class="m-4 items-center">
            <label class="block text-sm font-medium">Which column? </label>
            
          <input v-model="column" type="text" name="city" list="cityname" autocomplete="off">
    <datalist id="cityname">
      <option v-for="(column, index) in store.selectedBoard?.column" :key="column._id" :value="column.name"/>
        
    </datalist>
    </div>

          <div class="flex">
          <button class="bg-red-500 p-2 rounded m-4 hover:bg-red-400 focus:outline" @click="useLayoutStore.drawerOpen = false">Cancel</button>
          <button type="submit" class="bg-red-500 p-2 rounded m-4 hover:bg-red-400 focus:outline" @click="createTask">Create Task</button>
      </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script lang="ts" setup>
import { useStore } from '@/stores/store';
import { layoutStore } from '@/stores/LayouStore';
import { ref } from 'vue';
const useLayoutStore = layoutStore()
const store = useStore()
const title = ref('')
const description = ref('')
const column = ref('')
console.log(status);
const createTask = () => {
  const payload = {
    title: title.value,
    description: description.value,
    status : { title: column.value, _id: store.selectedBoard?.column.filter((t) => t.name===column.value)[0]._id }
  }
  console.log(payload);
  
  const res = store.createTask(payload)
}
</script>