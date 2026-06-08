<template>
  <div class="relative">
    <!-- Trigger button -->
    <button
      type="button"
      @click="open = !open"
      class="w-full flex items-center gap-2 bg-bg-card border border-white/[0.07] rounded-xl px-3 py-2.5 text-sm transition-all hover:border-amber-500/20"
    >
      <img
        v-if="props.asigned?.image"
        :src="props.asigned.image"
        class="w-6 h-6 rounded-full object-cover shrink-0"
      />
      <div
        v-else
        class="w-6 h-6 rounded-full bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-[9px] font-semibold text-amber-400 shrink-0"
      >
        {{ props.asigned?.email?.[0]?.toUpperCase() ?? '?' }}
      </div>
      <span class="flex-1 text-left truncate" :class="props.asigned?.email ? 'text-[#F5F0E8]' : 'text-[#3D3425]'">
        {{ props.asigned?.email ?? 'Assign to...' }}
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-[#5A4E42] shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </button>

    <!-- Dropdown -->
    <div
      v-if="open"
      class="absolute top-full left-0 right-0 mt-1 bg-bg-elevated border border-white/[0.08] rounded-xl shadow-modal z-20 overflow-hidden"
    >
      <div class="p-2 border-b border-white/[0.05]">
        <input
          v-model="query"
          @input="onSearch"
          type="text"
          placeholder="Search by email..."
          class="w-full bg-bg-surface border border-white/[0.07] rounded-lg px-3 py-2
                 text-[#F5F0E8] placeholder-[#3D3425]
                 focus:border-amber-500/40 focus:outline-none
                 text-xs transition-all"
          autocomplete="off"
        />
      </div>
      <ul class="max-h-40 overflow-y-auto">
        <li
          v-for="user in store.usersInBoard?.slice(0, 5)"
          :key="user._id"
          @click="assign(user)"
          class="flex items-center gap-2.5 px-3 py-2 cursor-pointer hover:bg-amber-500/[0.04] transition-colors"
        >
          <div class="w-6 h-6 rounded-full bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-[9px] font-semibold text-amber-400 shrink-0">
            {{ user.email?.[0]?.toUpperCase() }}
          </div>
          <span class="text-sm text-[#8A7A66] truncate">{{ user.email }}</span>
        </li>
        <li v-if="!store.usersInBoard?.length" class="px-3 py-3 text-xs text-[#5A4E42] text-center">
          No members found
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from '@/stores/store';
import { layoutStore } from '@/stores/LayouStore';
import { toast } from 'vue-sonner';

const props = defineProps<{
  asigned?: { email?: string; image?: string } | null;
}>();

const store = useStore();
const useLayoutStore = layoutStore();
const open = ref(false);
const query = ref('');

const onSearch = async () => {
  const res = await store.usersWithAccess(query.value);
  store.usersInBoard = res.data?.usersWithAccess ?? res.data ?? [];
};

const assign = async (user: any) => {
  open.value = false;
  const payload = { asigned: user.email };
  await store.asignTaskToUser(payload);
  toast.success(`Assigned to ${user.email}`);
  setTimeout(() => { useLayoutStore.drawerOpen = false; }, 800);
};
</script>
