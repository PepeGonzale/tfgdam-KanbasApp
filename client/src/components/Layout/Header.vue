<template>
  <header
    class="shrink-0 flex justify-between bg-white px-6 py-5 border-b-2 shadow-md"
  >
    <a class="text-2xl font-black tracking-tight" href="">kanboard</a>
   <a @click="useLayoutStore.sidebar = !useLayoutStore.sidebar" class="hover:cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
</svg>

   </a>

    <nav class="flex items-center gap-6">
      <a
        class="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 hover:cursor-pointer"
        @click="router.push({ path: '/boards' })"
        >My boards</a
      >

      <Dropdown />
      <a class="cursor-pointer hover:bg-gray-100" @click="useAuthStore.logout">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
      </a>
    </nav>
  </header>
</template>
<script lang="ts" setup>
import { layoutStore } from "@/stores/LayouStore";
import { useStore } from "@/stores/store";
import PrimaryButton from "../buttons/PrimaryButton.vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { authStore } from "@/stores/auth/authStore";
import Dropdown from "../buttons/Dropdown.vue";
import { ref } from "vue";
const useLayoutStore = layoutStore();
const store = useStore();
const useAuthStore = authStore();
const router = useRouter();
</script>
