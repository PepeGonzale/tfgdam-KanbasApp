<template>
 <Header/>
</template>
<script lang="ts" setup>
import { authStore } from '@/stores/auth/authStore';
import Header from '@/components/layout/Header.vue';
import {watch} from "vue"
import { storeToRefs } from 'pinia';
const auth = authStore();
const { isLoggedIn } = storeToRefs(auth);


watch(isLoggedIn, () => {
  if (!isLoggedIn.value) {
    auth.logout();
  }
});
</script>
