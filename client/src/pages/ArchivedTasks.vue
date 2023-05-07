<template>
<Default>
    <h1 v-for="t in store.archiveTask">{{t.title}}</h1>
</Default>
</template>

<script setup lang="ts">
import { api } from '@/helpers/axios';
import Default from '@/layouts/Default.vue';
import { useStore } from '@/stores/store';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const store = useStore()
const router = useRouter()
let tasks  = []
onMounted(async () => {
await store.getBoard(router.currentRoute.value.params.id)
const res = await api.get(`/board/archived/${store.selectedBoard?._id}`).then((res) => {
    store.archiveTask = res.data
    
})
})


</script>