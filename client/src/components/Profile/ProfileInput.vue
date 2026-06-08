<template>
  <div class="mb-5 last:mb-0">
    <label class="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A4E42] mb-2">{{ props.label }}</label>
    <div class="relative">
      <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-[#5A4E42]">
        <slot></slot>
      </span>
      <input
        :type="props.type"
        :placeholder="props.placeholder || props.label"
        v-model="computedValue"
        class="w-full bg-bg-surface border border-white/[0.08] rounded-xl pl-9 pr-4 py-3
               text-[#F5F0E8] placeholder-[#3D3425]
               focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/10 focus:outline-none
               text-sm transition-all"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  type:        { type: String, default: 'text' },
  placeholder: { type: String },
  label:       { type: String, default: null },
  modelValue:  { type: [String, Number, Boolean, Array, Object], default: '' },
});

const emits = defineEmits(['update:modelValue']);
const computedValue = computed({
  get:  () => props.modelValue,
  set: (v) => emits('update:modelValue', v),
});
</script>
