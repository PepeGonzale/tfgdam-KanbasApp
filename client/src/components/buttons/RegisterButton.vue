<template>
  <button
    class="w-full active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none text-white focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800 bg-slate-900 hover:bg-slate-700 dark:bg-slate-50 py-2 px-5"
  >   
  <!-- Default icon -->
  <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>
<!-- Loading Icon -->
<svg v-if="loading" :width="size" :height="size" class="mr-2" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="a" x1="8.042%" y1="0%" x2="65.682%" y2="23.865%">
        <stop :stop-color="color" stop-opacity="0" offset="0%" />
        <stop :stop-color="color" stop-opacity=".631" offset="63.146%" />
        <stop :stop-color="color" offset="100%" />
      </linearGradient>
    </defs>
    <g fill="none" fill-rule="evenodd">
      <g transform="translate(1 1)">
        <path id="Oval-2" d="M36 18c0-9.94-8.06-18-18-18" stroke="url(#a)" :stroke-width="stroke">
          <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" :dur="speed" repeatCount="indefinite" />
        </path>
        <circle fill="#fff" cx="36" cy="18" r="1">
          <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" :dur="speed" repeatCount="indefinite" />
        </circle>
      </g>
    </g>
  </svg>
    <slot>{{text}}</slot>
  </button>
</template>
<script lang="ts" setup>
const props = defineProps({
    text: {
        type:String
    },
    loading: {
      type: Boolean
    },
    size: { default: '20', type: String || Number },
  color: { default: '#4B5563', type: String },
  speed: { default: '300ms', type: String },
  stroke: { default: '1.5', type: String || Number },
})

</script>
