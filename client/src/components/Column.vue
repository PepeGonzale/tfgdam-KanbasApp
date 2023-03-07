<template>
<div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
<div v-for="column in store.selectedBoard?.column" :key="column._id" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ column.name }}</div>
<div class="font-normal text-gray-700 dark:text-gray-400" v-for="task in store.selectedBoard?.tasks" :key="task._id">{{ task.title }}</div>
</div> 

    
</template>
<script lang="ts" setup>
import { useStore } from '@/stores/store';

const store = useStore()
</script>