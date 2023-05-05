<template>
    <div>
  <label class="text-gray-500 block sm:inline"> Asignar </label>
    <button
      type="button"
      placeholder="Asigned to"
      class="mt-2 hover:bg-gray-200 hover:cursor-pointer rounded-lg p-3 items-center"
      @click="asignedDropdown = !asignedDropdown"
    >
      <div class="flex items-center space-x-2">
        <img
          :src="props.asigned?.image"
          class="w-8 h-8 rounded-full object-cover"
        />
        <span class="text-center" v-if="props.asigned?.email !== undefined">
          {{ props.asigned?.email }}</span
        >
        <span class="text-gray-200" v-else>Asigned to</span>
      </div>
    </button>
<div class="bg-gray-300 rounded-md p-2" :class="asignedDropdown ? 'block' : 'hidden'">
              
              <div class="">
                <input
                v-model="column"
                type="text"
                name="city"
                list="column"
                class="mt-2 shadow appearance-none border rounded py-1 px-1 text-black hover:cursor-pointer"
                autocomplete="off"
              />
              </div>
              <div v-if="asigned" class="border border-t-2 mt-3">
                <ul v-for="(column, index) in store.selectedBoard?.column"
                  :key="column._id">
                  <li class="cursor-pointer hover:bg-gray-400 px-2 py-2 text-center rounded-lg" @click="">{{ column.name }}</li>
                </ul>
              </div>
            
            </div>
            <label class="text-gray-500 block sm:inline"> Asignar </label>
    <button
      type="button"
      placeholder="Asigned to"
      class="mt-2 hover:bg-gray-300 hover:cursor-pointer rounded-lg p-3 items-center"
      @click="asignedDropdown = !asignedDropdown"
    >
      <div class="flex items-center space-x-2">
        <img
          :src="props.asigned?.image"
          class="w-8 h-8 rounded-full object-cover"
        />
        <span class="text-center" v-if="props.asigned?.email !== undefined">
          {{ props.asigned?.email }}</span
        >
        <span class="text-gray-200" v-else>Asigned to</span>
     </div>
    </button>
</div>
</template>
<script lang="ts" setup>
import { useStore } from "@/stores/store";
import {ref} from "vue"
const store = useStore();
const asignedDropdown = ref(false);
const props = {
  modelValue: {
    type: Object,
    String,
  },
  asigned: {
    type: Object
  },
  label: {
    type: String
  },
  asignedDropdown: {
    type: Boolean
  },
};
</script>