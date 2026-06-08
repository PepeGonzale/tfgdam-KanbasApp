<template>
  <div class="min-h-screen bg-bg-base">

    <!-- Hero header -->
    <div class="relative px-8 pt-10 pb-8 overflow-hidden">
      <div class="absolute -top-10 -left-10 w-72 h-72 bg-amber-500/[0.04] rounded-full blur-3xl pointer-events-none"></div>

      <div class="relative flex items-end justify-between flex-wrap gap-4">
        <div>
          <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5A4E42] mb-2">Workspace</p>
          <h1 class="text-3xl font-bold text-[#F5F0E8] tracking-tight">My Projects</h1>
          <p class="text-sm text-[#6A5C4E] mt-1">
            {{ store.boards.length }} active workspace{{ store.boards.length !== 1 ? 's' : '' }}
          </p>
        </div>

        <div class="flex items-center gap-2.5">
          <div class="flex bg-bg-surface border border-white/[0.06] rounded-lg p-0.5 text-xs font-medium">
            <button
              @click="hideStarred"
              class="px-3 py-1.5 rounded-md transition-colors"
              :class="!starred ? 'bg-amber-500/15 text-amber-400' : 'text-[#5A4E42] hover:text-[#8A7A66]'"
            >All</button>
            <button
              @click="showStarred"
              class="px-3 py-1.5 rounded-md transition-colors"
              :class="starred ? 'bg-amber-500/15 text-amber-400' : 'text-[#5A4E42] hover:text-[#8A7A66]'"
            >★ Starred</button>
          </div>

          <button
            class="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#0E0C0A] text-sm font-bold rounded-lg px-4 py-2 transition-all shadow-glow"
            @click="createBoard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Project
          </button>
        </div>
      </div>
    </div>

    <div class="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mx-8"></div>

    <!-- Board grid -->
    <div class="px-8 py-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <template v-for="project in store.boards" :key="project._id">
        <div
          v-show="!starred || project.starred"
          class="relative bg-bg-card border border-white/[0.06] rounded-2xl overflow-hidden
                 hover:-translate-y-0.5 hover:border-amber-500/25 hover:shadow-card-hover
                 transition-all duration-200 cursor-pointer group"
          @click="handleSelectedBoard(project)"
        >
          <!-- Top accent gradient bar -->
          <div class="h-[3px] bg-gradient-to-r from-amber-600/70 via-amber-400/40 to-transparent"></div>

          <div class="p-5">
            <!-- Row: avatar + star -->
            <div class="flex items-start justify-between mb-4">
              <div class="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-sm font-bold text-amber-400 shrink-0">
                {{ project.title?.charAt(0).toUpperCase() }}
              </div>
              <button
                class="text-[#3D3425] hover:text-amber-400 transition-colors p-0.5 -mr-1 -mt-1"
                @click.stop="handleStarred(project)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4" :class="project.starred ? 'fill-amber-400 text-amber-400' : 'fill-none'">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </button>
            </div>

            <h2 class="text-base font-semibold text-[#F5F0E8] group-hover:text-amber-300 transition-colors leading-snug">
              {{ project.title }}
            </h2>
            <p v-if="project.description" class="text-xs text-[#6A5C4E] mt-1.5 line-clamp-2 leading-relaxed">
              {{ project.description }}
            </p>

            <!-- Footer -->
            <div class="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.04]">
              <span v-if="project.createdAt" class="text-[10px] text-[#5A4E42] font-mono">
                {{ new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
              </span>
              <span class="text-[10px] font-medium text-[#5A4E42] group-hover:text-amber-500 transition-colors flex items-center gap-1">
                Open
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/helpers/axios';
import { layoutStore } from '@/stores/LayouStore';
import { useStore } from '@/stores/store';
import { defineEmits, ref } from 'vue';
import { toast } from 'vue-sonner';

const props = defineProps({
  boards: {
    type: Object,
    required: true,
  },
});

const starred = ref(false);
const emits = defineEmits(['selectedBoard']);
const store = useStore();
const useLayoutStore = layoutStore();

const handleSelectedBoard = (board: any) => {
  emits('selectedBoard', board);
};

const showStarred = () => { starred.value = true; };
const hideStarred = () => { starred.value = false; };

const handleStarred = async (project: any) => {
  try {
    await api.post(`/starred/${project._id}`, { starred: !project.starred }).then((data) => {
      project.starred = !!data.data.starred;
    });
    toast.success('Project starred successfully');
  } catch {
    toast.error('Could not update star');
  }
};

const createBoard = () => {
  useLayoutStore.modalContent = 'createBoard';
  useLayoutStore.drawerOpen = true;
};
</script>
