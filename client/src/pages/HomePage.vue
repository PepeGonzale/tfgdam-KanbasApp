<template>
  <Header />
  <main>
    <div class="flex w-full ">
      <Sidebar />
      <div v-dragscroll:nochilddrag
        class="relative h-full w-screen min-h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] overflow-auto bg-light-grey dark:bg-very-dark-grey transition-all "
        :class="useLayoutStore.drawerOpen ? ['sm:translate-x-[256px] lg:translate-x-[300px] max-w-[calc(100vw+256px'] : ['translate-x-[0]']">
        <div data-dragscroll class="mx-auto w-11/12 pt-6 pb-24 ">
          <div class="flex">
            <Column v-for="column in store.column" :key="column._id" :column="column"/>
          </div>
        </div>
      </div>
    </div>
    
  </main>
</template>
<script lang="ts" setup>
import { authStore } from '@/stores/auth/authStore';
import { layoutStore } from '@/stores/LayouStore';
import { useStore } from '@/stores/store';
import Header from '@/components/layout/Header.vue';
import Column from '@/components/Column.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import {watch} from "vue"
import { storeToRefs } from 'pinia';
const auth = authStore();
const { isLoggedIn } = storeToRefs(auth);
const useLayoutStore = layoutStore()
const store = useStore()
watch(isLoggedIn, () => {
  if (!isLoggedIn.value) {
    auth.logout();
  }
});
</script>
