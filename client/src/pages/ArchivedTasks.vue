<template>
<Default>
    <h1>archived tasks</h1>
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
onMounted(async () => {
console.log(store.selectedBoard)
const res = await api.get(`/board/archived/${store.selectedBoard?._id}`)
console.log(res)
    
})

</script>