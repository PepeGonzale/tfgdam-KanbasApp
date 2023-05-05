<template>
   <form @input="handleSearch" class="ml-12 hidden lg:flex bg-white border-4 -space-x-px rounded-md max-w-xl flex-1 shadow-sm items-center relative">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20" class="icon opacity-50 left-2 z-10 absolute pointer-events-none">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>
<input v-model="search" placeholder="Search Tasks..." type="text" class="bg-white rounded-md font-medium border-gray-300 text-sm w-full p-2 pl-10 text-gray-500 z-0 inline-flex items-center"/>
    </form>

</template>
<script lang="ts" setup>
import { api } from "@/helpers/axios";
import { useStore } from "@/stores/store";
import axios from "axios";
import {ref} from "vue"
const store = useStore()
const search = ref('')
const emits = defineEmits(['search'])
const handleSearch = async () => {
  store.searchingTasks = true
  if (search.value === undefined) store.searchedTasks = null
  const res = await api.get(`http://localhost:3000/api/boards/board/${store.selectedBoard?._id}/search?search=${search.value}`)
  emits('search', res.data)

}
</script>