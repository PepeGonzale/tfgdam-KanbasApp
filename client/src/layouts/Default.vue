<template>
  <div class="flex flex-col min-h-screen w-screen bg-white overflow-auto">
    <Toaster position="top-center" richColors />
    <DeleteVue
      v-if="useLayoutStore.drawerOpen && useLayoutStore.modalContent === 'delete'"
      :show="true"
      />
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>
<script lang="ts" setup>
import Footer from "@/components/Layout/Footer.vue";
import Header from "@/components/Layout/Header.vue";
import DeleteVue from "@/components/Modals/Delete.vue";
import { layoutStore } from "@/stores/LayouStore";
import { Toaster } from "vue-sonner";

const useLayoutStore = layoutStore()
</script>
