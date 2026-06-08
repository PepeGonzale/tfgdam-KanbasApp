<template>
  <li
    class="group relative w-full bg-bg-card border border-white/[0.06] rounded-xl p-4 transition-all duration-200
           hover:border-amber-500/20 hover:bg-bg-elevated hover:shadow-card-hover hover:cursor-pointer"
  >
    <!-- Options trigger -->
    <div class="absolute right-2 top-2">
      <div
        @click.stop="optionsTask = !optionsTask"
        class="relative hidden md:inline-block"
        ref="dropdownRef"
      >
        <button
          class="hover:bg-white/[0.08] p-1 rounded-md grid place-content-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3.5 h-3.5 text-[#8A7A66]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </button>
        <div
          class="absolute right-0 mt-1 w-36 origin-top-right bg-bg-elevated border border-white/[0.08] rounded-lg shadow-modal z-20"
          :class="optionsTask ? 'block' : 'hidden'"
        >
          <div class="p-1">
            <button @click="handleArchive(props.task._id)" class="w-full text-left px-2.5 py-1.5 text-xs text-[#F5F0E8] hover:bg-amber-500/10 hover:text-amber-400 rounded-md transition-colors">Archive</button>
            <button @click="deleteTask(props.task._id)" class="w-full text-left px-2.5 py-1.5 text-xs text-[#F5F0E8] hover:bg-red-500/10 hover:text-red-400 rounded-md transition-colors">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Task content -->
    <div @click="editTask(props.task._id, props.task)">
      <span class="text-[10px] text-[#5A4E42] font-mono mb-1.5 block">#{{ props.task.taskNum }}</span>

      <p class="text-sm font-medium text-[#F5F0E8] leading-snug mb-4 pr-5">{{ props.task.title }}</p>

      <!-- Bottom row -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <!-- Priority -->
          <span
            v-if="props.task.priority"
            class="inline-flex items-center gap-1 text-[10px] font-medium"
            :class="{
              'text-red-400':  props.task.priority === 'High',
              'text-amber-400': props.task.priority === 'Medium',
              'text-sky-400':   props.task.priority === 'Low',
            }"
          >
            <span
              class="w-1.5 h-1.5 rounded-full shrink-0"
              :class="{
                'bg-red-400':   props.task.priority === 'High',
                'bg-amber-400': props.task.priority === 'Medium',
                'bg-sky-400':   props.task.priority === 'Low',
              }"
            ></span>
            {{ props.task.priority }}
          </span>

          <!-- Subtasks count -->
          <span
            v-if="props.task.subtasks?.length"
            class="inline-flex items-center gap-1 text-[10px] text-[#5A4E42]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {{ props.task.subtasks.length }}
          </span>
        </div>

        <!-- Assignee -->
        <img
          v-if="props.task.asignedTo?.image"
          :src="props.task.asignedTo.image"
          class="w-5 h-5 rounded-full object-cover ring-1 ring-white/10"
        />
        <div
          v-else-if="props.task.asignedTo?.name"
          class="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[8px] font-bold text-amber-400 uppercase ring-1 ring-amber-500/20"
        >
          {{ props.task.asignedTo.name?.charAt(0) }}
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { layoutStore } from '@/stores/LayouStore';
import { useStore } from '@/stores/store';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const useLayoutStore = layoutStore();
const store = useStore();
const props = defineProps(['task']);
const optionsTask = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (!dropdownRef.value?.contains(event.target as Node)) {
    optionsTask.value = false;
  }
};

onMounted(() => document.addEventListener('click', handleClickOutside));
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside));

const deleteTask = async (id: string) => {
  store.selectedTaskId = id;
  await store.deleteTask();
};

const handleArchive = async (taskId: string) => {
  await store.archiveTask(taskId);
};

const editTask = async (id: string, task: any) => {
  store.selectedTaskId = id;
  const res = await store.taskInfo();
  store.taskDefault = {
    title: res.data.title,
    description: res.data.description,
    status: res.data.status,
    comments: res.data.comments,
    priority: res.data.priority,
    asigned: res.data.createdBy,
  };
  useLayoutStore.drawerOpen = true;
  useLayoutStore.modalContent = 'editTask';
};
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
