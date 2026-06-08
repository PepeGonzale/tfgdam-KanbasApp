<template>
  <header class="relative bg-bg-base/90 backdrop-blur-xl border-b border-white/[0.06] flex px-6 py-0 items-center justify-between h-14 sticky top-0 z-40">
    <!-- Amber accent line at bottom -->
    <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>

    <!-- Left: Logo + Projects dropdown -->
    <div class="flex items-center gap-4">
      <a class="flex items-center gap-1.5 font-bold text-lg tracking-tight text-[#F5F0E8]" href="/boards">
        Kanvas<span class="w-1.5 h-1.5 rounded-full bg-amber-500 mb-1 inline-block shadow-glow"></span>
      </a>

      <div
        class="relative hidden md:inline-block"
        ref="dropdown"
        @mouseover="drop"
        @mouseout="useLayoutStore.projectDropdown = false"
      >
        <button
          type="button"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[#8A7A66] hover:text-[#F5F0E8] rounded-md hover:bg-white/[0.05] transition-colors"
        >
          Projects
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        <div
          class="absolute left-0 mt-1 w-56 origin-top-left bg-bg-surface border border-white/[0.08] rounded-xl shadow-modal z-20 py-1"
          :class="useLayoutStore.projectDropdown ? 'block' : 'hidden'"
        >
          <div v-for="project in store.boards.slice(0, 4)" :key="project._id">
            <a
              :href="`/board/${project._id}`"
              class="block px-4 py-2 text-sm text-[#8A7A66] hover:bg-amber-500/[0.06] hover:text-[#F5F0E8] transition-colors"
              @click="handleSelectedBoard(project)"
            >{{ project.title }}</a>
          </div>
          <div class="border-t border-white/[0.06] mt-1 pt-1">
            <a
              href="/"
              class="block px-4 py-2 text-sm text-[#5A4E42] hover:text-amber-400 transition-colors"
            >See all projects</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Center: current board name -->
    <div
      v-if="store.selectedBoard?.title"
      class="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 text-sm font-medium text-[#8A7A66]"
    >
      <span class="w-1 h-1 rounded-full bg-amber-500/60"></span>
      {{ store.selectedBoard.title }}
    </div>

    <!-- Right: My boards + Avatar -->
    <div class="flex items-center gap-3">
      <a
        @click="router.push({ path: '/' })"
        class="hidden md:block text-sm text-[#5A4E42] hover:text-[#8A7A66] cursor-pointer transition-colors"
      >My boards</a>

      <!-- Profile dropdown -->
      <div
        class="relative hidden md:inline-block"
        @mouseover="useLayoutStore.profileDropdown = true"
        @mouseout="useLayoutStore.profileDropdown = false"
      >
        <button
          type="button"
          class="flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] hover:border-amber-500/20 rounded-lg px-2.5 py-1.5 transition-all"
        >
          <img
            class="rounded-full w-6 h-6 object-cover ring-1 ring-amber-500/20"
            :src="useAuthStore.userData.imageUrl"
            alt=""
          />
          <span class="text-sm font-medium text-[#F5F0E8] truncate max-w-[100px]">{{ useAuthStore.userData.username }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3 text-[#5A4E42]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        <div
          :class="useLayoutStore.profileDropdown ? 'block' : 'hidden'"
          class="absolute right-0 mt-1 w-64 origin-top-right bg-bg-surface border border-white/[0.08] rounded-xl shadow-modal z-20"
        >
          <!-- User info -->
          <div class="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.06]">
            <img class="w-9 h-9 object-cover rounded-full ring-2 ring-amber-500/20 shrink-0" :src="useAuthStore.userData.imageUrl" alt="" />
            <div class="min-w-0">
              <div class="text-sm font-semibold text-[#F5F0E8] truncate">{{ useAuthStore.userData.username }}</div>
              <div class="text-xs text-[#5A4E42] truncate">{{ useAuthStore.userData.email }}</div>
            </div>
          </div>
          <div class="p-1">
            <a
              class="block px-3 py-2 text-sm text-[#8A7A66] hover:bg-white/[0.04] hover:text-[#F5F0E8] cursor-pointer rounded-lg transition-colors"
              @click="router.push({ path: '/profile' })"
            >Profile</a>
            <a
              class="block px-3 py-2 text-sm text-[#8A7A66] hover:bg-red-500/10 hover:text-red-400 cursor-pointer rounded-lg transition-colors"
              @click="logout"
            >Sign out</a>
          </div>
        </div>
      </div>

      <!-- Mobile profile link -->
      <div
        class="md:hidden cursor-pointer text-sm text-[#5A4E42]"
        @click="router.push({ path: '/profile' })"
      >Profile</div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { layoutStore } from '@/stores/LayouStore';
import { useStore } from '@/stores/store';
import { useRouter } from 'vue-router';
import { authStore } from '@/stores/auth/authStore';
import { ref } from 'vue';
import { toast } from 'vue-sonner';

const useLayoutStore = layoutStore();
const store = useStore();
const useAuthStore = authStore();
const router = useRouter();
const dropdown = ref(null);

const drop = () => {
  useLayoutStore.projectDropdown = true;
};

const handleSelectedBoard = (project: any) => {
  store.selectBoard(project);
};

const logout = () => {
  toast.error('Logged out successfully');
  setTimeout(() => {
    useAuthStore.logout();
  }, 1000);
};
</script>
