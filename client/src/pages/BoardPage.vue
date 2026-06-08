<template>
  <DefaultVue>
    <BoardView :boards="store.boards" @selectedBoard="handleEvent" />

    <!-- Create board modal -->
    <div
      v-if="useLayoutStore.drawerOpen && useLayoutStore.modalContent === 'createBoard'"
      class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      @click.self="useLayoutStore.drawerOpen = false"
    >
      <div class="bg-bg-card border border-white/[0.08] rounded-2xl shadow-modal w-full max-w-md overflow-hidden">
        <!-- Amber top accent -->
        <div class="h-px bg-gradient-to-r from-amber-500/40 via-amber-400/20 to-transparent"></div>
        <div class="flex items-center justify-between px-6 py-4 border-b border-white/[0.05]">
          <h2 class="text-sm font-semibold text-[#F5F0E8]">New project</h2>
          <button
            @click="useLayoutStore.drawerOpen = false"
            class="w-7 h-7 flex items-center justify-center rounded-lg text-[#5A4E42] hover:text-[#F5F0E8] hover:bg-white/[0.06] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-6">
          <Modal />
        </div>
      </div>
    </div>
  </DefaultVue>
</template>

<script lang="ts" setup>
import Modal from '@/components/Modals/Modal.vue';
import BoardView from '@/components/Views/BoardView.vue';
import { toast } from 'vue-sonner';
import { layoutStore } from '@/stores/LayouStore';
import { useStore } from '@/stores/store';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { authStore } from '@/stores/auth/authStore';
import DefaultVue from '@/layouts/Default.vue';

const router = useRouter();
const auth = authStore();
const store = useStore();
const useLayoutStore = layoutStore();

onMounted(() => {
  auth.fetchUserInfo();
  store.fetchBoards().catch((err) => {
    if (err.response?.data?.error === 'Not Authorized token expired, please login again') {
      auth.logout();
      router.push({ path: '/login' });
    } else {
      toast.error('Could not load projects');
    }
  });
});

const handleEvent = (board: any) => {
  router.push({ path: '/board/' + board._id });
};
</script>
