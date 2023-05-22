<template>
  <svg :class="`h-[${size}px] w-[${size}px]`" viewBox="0 0 20 20" fill="currentColor">
    <path :d="props.icon" />
  </svg>
    
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps({
    icon: {
        type: String,
        default: null
    },
    size: {
        type: String,
        default: "16"
    }
})
</script>