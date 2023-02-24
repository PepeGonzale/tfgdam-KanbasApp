<template>
    <button @click="auth.logout">logout</button>
<div>
Bienvenido a tu Kanban App
{{ auth.isLoggedIn }}
</div>
</template>
<script lang="ts" setup>
import { authStore } from '@/stores/auth/authStore';
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
