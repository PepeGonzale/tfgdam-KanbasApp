<template>
  <div class="flex min-h-screen bg-bg-base items-center justify-center">
    <div class="text-center">
      <div class="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-sm text-[#5A4E42]">Signing you in...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { authStore } from '@/stores/auth/authStore';

const router = useRouter();
const store = authStore();

onMounted(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const email = params.get('email');
    const username = params.get('username');
    const imageUrl = params.get('imageUrl') || '';
    const _id = params.get('_id') || '';

    if (!token || !email) {
        router.push('/login');
        return;
    }

    store.user.token = token;
    store.user.email = email;
    store.userData.email = email;
    store.userData.username = username || '';
    store.userData.imageUrl = imageUrl;
    store.userData._id = _id;
    localStorage.setItem('user', JSON.stringify({ token, email }));

    router.push('/');
});
</script>
