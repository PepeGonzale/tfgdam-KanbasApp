<template>
 <header class="shrink-0 flex justify-between bg-white px-4 py-3">
      <a class="text-2xl font-black tracking-tight" href="">kanboard</a>
      <nav>
        <a class="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100"
        @click="router.push({path:'/boards'})"
          >My boards</a
        >
        <button class="ml-3">
          <img
            class="h-9 w-9 inline rounded-full"
            src="https://imgs.search.brave.com/dNkqNy6hrJysNFZxwqWBUDInv57wxPfly61xtKKC2Sg/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9sb2dv/c21hcmNhcy5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjEv/MDIvVHJlbGxvLUxv/Z28ucG5n"
          />
        </button>
      </nav>
    </header>
</template>
<script lang="ts" setup>
import { layoutStore } from "@/stores/LayouStore";
import { useStore } from "@/stores/store";
import PrimaryButton from "../buttons/PrimaryButton.vue";
import { useRoute, useRouter } from "vue-router";
const useLayoutStore = layoutStore();
const store = useStore();
const router = useRouter()
const createTask = () => {
  useLayoutStore.modalContent = "createTask";
  useLayoutStore.drawerOpen = true;
};
</script>
