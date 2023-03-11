<template>
<Header/>
<div class="flex items-center max-w-max max-w-full">
<BoardView :boards="store.boards"/>
</div>
</template>
<script lang="ts" setup>
import Header from '@/components/layout/Header.vue';
import BoardView from '@/components/views/BoardView.vue';
import { useStore } from '@/stores/store';
import { onMounted } from 'vue';
const store = useStore()

onMounted(() => {
  store.fetchBoards();
});
</script>