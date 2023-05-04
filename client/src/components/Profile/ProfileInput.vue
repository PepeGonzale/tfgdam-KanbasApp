<template>
    <div class="mb-6 last:mb-0">
               <label class="block font-bold mb-2">{{props.label}}</label>
               <div>
<div class="relative">
                       <input :type="props.type" :placeholder="props.placeholder" v-model="computedValue" class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white  pl-10"/>
                       <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                           <slot></slot>

                       </span>
                   </div>
               </div>
               <div class="text-xs text-gray-500 dark:text-slate-400 mt-1">Required your {{ props.label }}</div>
           </div>
</template>
<script lang="ts" setup>
import { defineProps, computed, defineEmits, ref } from 'vue';

const props = defineProps({
   type: {
       type: String,
       default: "text"
   },
   placeholder: {
       type: String,
   },
   icon:  {
       type: String,
       default: null
   },
   label: {
       type: String,
       default: null
   },
   name: {
       type: String,
       default: null
   },
   modelValue: {
       type: [String, Number, Boolean, Array, Object],
       default: ""
   }

})
const emits = defineEmits(['update:modelValue'])
const computedValue = computed({
    get:() => props.modelValue,
    set: (value) => {
        emits('update:modelValue', value)
    } 
})
</script>

