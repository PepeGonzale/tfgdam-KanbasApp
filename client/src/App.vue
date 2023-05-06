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
      <Transition name="page">
      <RouterView />
    </Transition>

    
</template>


<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
.slide-from-right-enter-active,
.slide-from-right-leave-active {
  transition: all 0.4s;
}
.slide-from-right-enter-from,
.slide-from-right-leave-to {
  transform: translateX(100%);
}

</style>