<template>
  <div class="space-y-5">
    <!-- Search + Role row -->
    <div class="flex gap-3">
      <div class="flex-1 relative">
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A4E42]" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          v-model="userSelect"
          @input="search"
          type="text"
          placeholder="Search by email..."
          class="w-full bg-bg-surface border border-white/[0.08] rounded-xl pl-10 pr-4 py-3
                 text-[#F5F0E8] placeholder-[#3D3425]
                 focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/10 focus:outline-none
                 text-sm transition-all"
        />
      </div>
      <select
        v-model="role"
        class="bg-bg-surface border border-white/[0.08] text-[#8A7A66] text-sm rounded-xl
               focus:border-amber-500/40 focus:outline-none px-3 py-3 transition-all"
      >
        <option value="" disabled selected>Role</option>
        <option value="Admin">Admin</option>
        <option value="Write">Write</option>
        <option value="Read">Read</option>
      </select>
    </div>

    <!-- User results -->
    <div v-if="auth.allUsers?.length" class="bg-bg-surface border border-white/[0.06] rounded-xl overflow-hidden">
      <a
        v-for="user in auth.allUsers.slice(0, 4)"
        :key="user._id"
        class="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-amber-500/[0.04] transition-colors border-b border-white/[0.04] last:border-0"
        @click="handleUserSelect(user)"
      >
        <div class="w-7 h-7 rounded-full bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-[9px] font-semibold text-amber-400 shrink-0">
          {{ user.email?.[0]?.toUpperCase() }}
        </div>
        <span class="text-sm text-[#8A7A66] truncate">{{ user.email }}</span>
      </a>
    </div>

    <!-- Selected user pill -->
    <div v-if="selectedEmail" class="flex items-center gap-2 bg-amber-500/[0.07] border border-amber-500/20 rounded-xl px-4 py-2.5">
      <div class="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/25 flex items-center justify-center text-[9px] font-semibold text-amber-400 shrink-0">
        {{ selectedEmail?.[0]?.toUpperCase() }}
      </div>
      <span class="text-sm text-amber-300/80 flex-1 truncate">{{ selectedEmail }}</span>
      <button @click="selectedEmail = ''" class="text-[#5A4E42] hover:text-[#8A7A66] transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div class="flex gap-3 pt-1">
      <button
        type="button"
        @click="useLayoutStore.drawerOpen = false"
        class="flex-1 bg-white/[0.04] hover:bg-white/[0.07] text-[#8A7A66] font-semibold rounded-xl px-4 py-2.5 text-sm transition-colors border border-white/[0.06]"
      >Cancel</button>
      <button
        type="button"
        @click="asignUser"
        class="flex-1 bg-amber-500 hover:bg-amber-400 text-[#0E0C0A] font-bold rounded-xl px-4 py-2.5 text-sm transition-all"
        style="box-shadow: 0 0 16px rgba(245,158,11,0.18);"
      >Add Member</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { authStore } from '@/stores/auth/authStore';
import { useStore } from '@/stores/store';
import { layoutStore } from '@/stores/LayouStore';
const store = useStore();
const useLayoutStore = layoutStore();
const auth = authStore();
const userSelect = ref(auth.selectedUser);
const role = ref('');
const selectedEmail = ref('');
const search = async () => {
  auth.listUsers(userSelect.value);
};
const handleUserSelect = (user: any) => {
  if (store.selectedBoard !== undefined) {
    store.addUser.user = user._id;
    store.addUser.board = store.selectedBoard._id;
  }
  selectedEmail.value = user.email;
  userSelect.value = user.email;
  auth.allUsers = [];
};
const asignUser = async () => {
  store.addUser.role = role.value;
  await store.asignUserToBoard(store.addUser).catch(() => {});
  useLayoutStore.drawerOpen = false;
};
</script>
