<template>
    <button class="active:scale-95 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-white dark:hover:text-slate-100 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-white dark:data-[state=open]:bg-slate-800 bg-slate-900 text-blue hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900 h-11 px-8">
<svg v-if="plus" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
</svg><slot>{{props.text}}</slot></button>
</template>
<script lang="ts" setup>
    const props = defineProps({
        text: {
            type:String
        },
        plus: {
            type: Boolean,
            default: false
        }
    })
</script>