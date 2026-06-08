<template>
  <div class="space-y-3">
    <div
      v-for="(c, index) in props.task.comments"
      :key="index"
      class="flex gap-3"
    >
      <!-- Avatar -->
      <div class="w-7 h-7 rounded-full bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-[9px] font-bold text-amber-400 shrink-0 mt-0.5">
        {{ c.commentBy?.[0]?.toUpperCase() ?? '?' }}
      </div>

      <!-- Bubble -->
      <div class="flex-1 min-w-0">
        <div class="flex items-baseline gap-2 mb-1">
          <span class="text-xs font-semibold text-[#8A7A66]">{{ c.commentBy }}</span>
        </div>
        <div class="bg-bg-base border border-white/[0.05] rounded-xl rounded-tl-sm px-3 py-2">
          <p class="text-xs text-[#8A7A66] leading-relaxed break-words">{{ c.comment }}</p>
        </div>
      </div>
    </div>

    <!-- No comments yet -->
    <div v-if="!props.task.comments?.length" class="text-center py-6">
      <p class="text-xs text-[#3D3425]">No comments yet</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['task']);
</script>
