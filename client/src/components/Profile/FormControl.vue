<template>
  <form @submit.prevent="submit" class="bg-bg-card border border-white/[0.06] rounded-2xl overflow-hidden">
    <slot></slot>
  </form>
</template>

<script lang="ts" setup>
const emits = defineEmits(['submit']);
const submit = (e: Event) => emits('submit', e);
</script>
