<script setup lang="ts">

import { Toaster } from 'vue-sonner';
import Delete from './components/Modals/Delete.vue';
import Default from './layouts/Default.vue';
import { layoutStore } from "@/stores/LayouStore";

const useLayoutStore = layoutStore()
</script>

<template>
    <Toaster position="top-center" richColors />
    <Delete
      v-if="useLayoutStore.drawerOpen && useLayoutStore.modalContent === 'delete'"
      :show="true"
      />
      <RouterView />

    
</template>


