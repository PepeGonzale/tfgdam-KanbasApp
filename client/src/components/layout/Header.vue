<template>
<Sidebar/>  
</template>
<script lang="ts" setup>
import { layoutStore } from "@/stores/LayouStore";
import Sidebar from "./Sidebar.vue"
const useLayoutStore = layoutStore()


</script>