<template>
  <div class="w-full overflow-auto">
    <table class="w-full text-sm border-collapse">
      <thead>
        <tr class="border-b border-white/[0.05]">
          <th class="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A4E42] w-10">#</th>
          <th class="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A4E42]">Title</th>
          <th class="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A4E42]">Priority</th>
          <th class="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A4E42]">Status</th>
          <th class="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A4E42]">Assignee</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/[0.03]">
        <tr
          v-for="(task, index) in store.selectedBoard?.tasks"
          :key="task._id"
          class="group hover:bg-amber-500/[0.03] transition-colors cursor-pointer"
        >
          <td class="px-4 py-3.5 text-[10px] text-[#5A4E42] font-mono">{{ index + 1 }}</td>
          <td class="px-4 py-3.5">
            <span class="text-sm font-medium text-[#F5F0E8] group-hover:text-amber-300 transition-colors">
              {{ task.title }}
            </span>
          </td>
          <td class="px-4 py-3.5">
            <span
              v-if="task.priority"
              class="inline-flex items-center gap-1.5 text-[10px] font-medium"
              :class="{
                'text-red-400':   task.priority === 'High',
                'text-amber-400': task.priority === 'Medium',
                'text-sky-400':   task.priority === 'Low',
              }"
            >
              <span
                class="w-1.5 h-1.5 rounded-full shrink-0"
                :class="{
                  'bg-red-400':   task.priority === 'High',
                  'bg-amber-400': task.priority === 'Medium',
                  'bg-sky-400':   task.priority === 'Low',
                }"
              ></span>
              {{ task.priority }}
            </span>
            <span v-else class="text-[10px] text-[#3D3425]">—</span>
          </td>
          <td class="px-4 py-3.5">
            <span class="inline-flex items-center gap-1.5 text-xs text-[#8A7A66]">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-500/50 shrink-0"></span>
              {{ task.status?.name }}
            </span>
          </td>
          <td class="px-4 py-3.5">
            <div v-if="task.asignedTo" class="flex items-center gap-2">
              <img
                v-if="task.asignedTo.image"
                :src="task.asignedTo.image"
                class="w-5 h-5 rounded-full object-cover ring-1 ring-white/10 shrink-0"
              />
              <div
                v-else
                class="w-5 h-5 rounded-full bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-[8px] font-bold text-amber-400 shrink-0"
              >
                {{ task.asignedTo.email?.[0]?.toUpperCase() }}
              </div>
              <span class="text-xs text-[#6A5C4E] truncate max-w-[140px]">{{ task.asignedTo.email }}</span>
            </div>
            <span v-else class="text-[10px] text-[#3D3425]">Unassigned</span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Empty state -->
    <div v-if="!store.selectedBoard?.tasks?.length" class="text-center py-20">
      <div class="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center mx-auto mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#5A4E42]" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
        </svg>
      </div>
      <p class="text-sm text-[#5A4E42]">No tasks yet</p>
      <p class="text-xs text-[#3D3425] mt-1">Create your first task from the board view</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/stores/store';
const store = useStore();
</script>
