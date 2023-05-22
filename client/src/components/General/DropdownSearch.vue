<template>
  <div class="">
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
    <!-- Asigned to dropdown -->
    <div
      class="bg-gray-300 rounded-md p-2 absolute origin-top-right"
      :class="asignedDropdown ? 'block' : 'hidden'"
    >
      <div class="">
        <input
          @input="search"
          type="text"
          class="mt-2 shadow appearance-none border rounded py-1 px-1 text-black"
          autocomplete="off"
        />
      </div>
      <div v-if="props.asigned.email !== ''" class="border border-t-2 mt-3">
                <ul v-for="(data, i) in store.usersInBoard?.slice(0,2)" 
                  :key="data._id">
                  <li class="cursor-pointer hover:bg-gray-400 px-2 py-2 text-center rounded-lg" @click="asignedToUser(data.email)">{{ data.email }}</li>
                </ul>
              </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { layoutStore } from "@/stores/LayouStore";
import { useStore } from "@/stores/store";
import { defineProps, defineEmits, computed, ref } from "vue";
import { toast } from "vue-sonner";
const store = useStore();
const useLayoutStore = layoutStore()
const asignedDropdown = ref(false);
const inputValue = ref("")
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
const emits = defineEmits(["search", "update:modelValue"]);
const asignedToUser = async (email: string) => {
  /*   const payload = {
    asigned: asigned.value,
  }; */
  const payload = { asigned: email };
  const res = await store.asignTaskToUser(payload)
  .then(() => {
    toast.success('Tarea asignada a: ' + email)
    setTimeout(() => {
      useLayoutStore.drawerOpen = false;
    }, 1000);
  })
};
const search = async (e) => {
    
  
   const res = await store.usersWithAccess(e.target.value);
    store.usersInBoard = res.data;
};
</script>
