<template>
  <div class="flex flex-col min-h-screen w-screen bg-white overflow-auto">
    
    <Header />
    <slot></slot>
    
  </div>
</template>
<script lang="ts" setup>
import Footer from "@/components/Layout/Footer.vue";
import Header from "@/components/Layout/Header.vue";



</script>
