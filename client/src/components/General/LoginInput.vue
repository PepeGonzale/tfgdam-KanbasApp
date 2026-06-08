<template>
  <input
    :type="props.type"
    :placeholder="props.text"
    @input="(e) => handleData((e.target as HTMLInputElement).value)"
    class="w-full bg-bg-surface border border-white/[0.08] rounded-xl px-4 py-3
           text-[#F5F0E8] placeholder-[#5A4E42]
           focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/10 focus:outline-none
           text-sm transition-all"
  />
</template>

<script lang="ts" setup>
const props = defineProps({
  text: { type: String },
  type: { type: String },
});

const emits = defineEmits(['value']);
const handleData = (e: string) => emits('value', e);
</script>
