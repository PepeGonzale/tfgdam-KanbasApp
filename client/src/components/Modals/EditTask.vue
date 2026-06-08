<template>
  <div class="bg-bg-surface border-l border-white/[0.06] fixed top-14 right-0 bottom-0 w-full md:w-[480px] flex flex-col shadow-modal z-50">

    <!-- Amber top accent -->
    <div class="h-px bg-gradient-to-r from-amber-500/40 via-amber-400/20 to-transparent shrink-0"></div>

    <!-- Panel header -->
    <div class="flex items-center justify-between px-6 py-4 border-b border-white/[0.05] shrink-0">
      <div>
        <h2 class="text-sm font-semibold text-[#F5F0E8]">Task details</h2>
        <p class="text-[10px] text-[#5A4E42] mt-0.5">
          Created by <span class="text-[#8A7A66]">{{ store.selectedTask.createdBy?.username }}</span>
        </p>
      </div>
      <button
        class="w-7 h-7 flex items-center justify-center rounded-lg text-[#5A4E42] hover:text-[#F5F0E8] hover:bg-white/[0.06] transition-colors"
        @click="useLayoutStore.drawerOpen = false"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Scrollable form area -->
    <div class="flex-1 overflow-y-auto px-6 py-5">
      <form id="edit-task-form" autocomplete="off" @submit.prevent="createTask" class="space-y-5">

        <!-- Title -->
        <div>
          <label class="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A4E42] mb-2">Title</label>
          <input
            type="text"
            v-model="title"
            class="w-full bg-bg-card border border-white/[0.07] rounded-xl px-4 py-2.5
                   text-[#F5F0E8] placeholder-[#3D3425]
                   focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/10 focus:outline-none
                   text-sm transition-all"
            placeholder="Task title"
          />
        </div>

        <!-- Priority -->
        <div>
          <label class="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A4E42] mb-2">Priority</label>
          <div class="flex gap-2">
            <button
              v-for="level in ['Low', 'Medium', 'High']"
              :key="level"
              type="button"
              @click="priority = level"
              class="flex-1 py-2 rounded-lg text-xs font-semibold transition-all border"
              :class="{
                'bg-sky-500/15 text-sky-400 border-sky-500/30':     level === 'Low'    && priority === level,
                'bg-amber-500/15 text-amber-400 border-amber-500/30': level === 'Medium' && priority === level,
                'bg-red-500/15 text-red-400 border-red-500/30':       level === 'High'   && priority === level,
                'bg-bg-card text-[#5A4E42] border-white/[0.06] hover:border-white/[0.12] hover:text-[#8A7A66]': priority !== level,
              }"
            >{{ level }}</button>
          </div>
        </div>

        <!-- Column -->
        <div>
          <label class="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A4E42] mb-2">Column</label>
          <input
            v-model="column"
            type="text"
            list="column-list"
            autocomplete="off"
            class="w-full bg-bg-card border border-white/[0.07] rounded-xl px-4 py-2.5
                   text-[#F5F0E8] placeholder-[#3D3425]
                   focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/10 focus:outline-none
                   text-sm transition-all"
          />
          <datalist id="column-list">
            <option v-for="col in store.selectedBoard?.column" :key="col._id" :value="col.name" />
          </datalist>
        </div>

        <!-- Assignee -->
        <div>
          <label class="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A4E42] mb-2">Assignee</label>
          <DropdownSearch />
        </div>

        <!-- Divider -->
        <div class="h-px bg-white/[0.04]"></div>

        <!-- Description -->
        <div>
          <label class="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A4E42] mb-2">
            Description
            <span class="normal-case font-normal text-[#3D3425] ml-1">optional</span>
          </label>
          <textarea
            v-model="description"
            rows="4"
            class="w-full bg-bg-card border border-white/[0.07] rounded-xl px-4 py-3
                   text-[#F5F0E8] placeholder-[#3D3425]
                   focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/10 focus:outline-none
                   text-sm transition-all resize-none"
            placeholder="Add a description..."
          ></textarea>
        </div>

        <!-- Divider -->
        <div class="h-px bg-white/[0.04]"></div>

        <!-- Comments -->
        <div>
          <label class="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A4E42] mb-3">Comments</label>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 text-xs font-medium text-amber-500 hover:text-amber-400 transition-colors"
            @click="leaveComment"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Leave a comment
          </button>
          <div v-if="useLayoutStore.commentInput" class="mt-3 flex gap-2">
            <input
              v-model="commentt"
              type="text"
              class="flex-1 bg-bg-card border border-white/[0.07] rounded-xl px-4 py-2
                     text-[#F5F0E8] placeholder-[#3D3425]
                     focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/10 focus:outline-none
                     text-sm transition-all"
              placeholder="Write a comment..."
            />
            <button
              type="button"
              @click="commentUpload"
              class="bg-amber-500 hover:bg-amber-400 text-[#0E0C0A] text-xs font-bold rounded-xl px-4 py-2 transition-all shrink-0"
            >Send</button>
          </div>
          <div class="error text-xs text-red-400 mt-1.5"></div>
        </div>

      </form>
    </div>

    <!-- Sticky save footer -->
    <div class="shrink-0 px-6 py-4 border-t border-white/[0.05] bg-bg-surface">
      <button
        type="submit"
        form="edit-task-form"
        class="w-full bg-amber-500 hover:bg-amber-400 text-[#0E0C0A] font-bold rounded-xl py-3 text-sm transition-all"
        style="box-shadow: 0 0 20px rgba(245,158,11,0.18);"
      >
        Save Changes
      </button>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/stores/store';
import { layoutStore } from '@/stores/LayouStore';
import { toast } from 'vue-sonner';
import { ref, onMounted } from 'vue';
import DropdownSearch from '../General/DropdownSearch.vue';

const useLayoutStore = layoutStore();
const store = useStore();

var error = '';
const commentt = ref(store.taskDefault.comments.title);
const priority = ref(store.taskDefault.priority);
const title = ref(store.taskDefault.title);
const description = ref(store.taskDefault.description);
const column = ref(store.taskDefault.status.name);
const dueDate = ref('');

onMounted(async () => {
  await store.asignedTo();
});

const createTask = () => {
  const payload = {
    task: {
      title: title.value,
      description: description.value,
      status: {
        name: column.value,
        _id: store.selectedBoard?.column.filter(
          (t) => t.name === column.value
        )[0]?._id ?? store.taskDefault.status._id,
      },
    },
  };
  store.editTask(payload).then(() => {
    toast.success('Task updated');
    setTimeout(() => {
      useLayoutStore.drawerOpen = false;
    }, 1000);
  });
};

const leaveComment = () => {
  useLayoutStore.commentInput = !useLayoutStore.commentInput;
};

const commentUpload = async () => {
  const payload = { comment: commentt.value };
  const commentError = document.querySelector('.error');
  const response = await store.updateComment(payload);
  if (response.data.error && commentError) {
    useLayoutStore.toast = true;
    error = response.data.error;
    commentError.innerHTML = error;
    setTimeout(() => {
      useLayoutStore.toast = false;
    }, 2000);
  }
};
</script>
