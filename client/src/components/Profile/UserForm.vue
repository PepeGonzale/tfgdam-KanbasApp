<template>
 <FormControl @submit.prevent = "sendData">
    <div class="flex-1 p-6">
        <slot></slot>
        </div>
        <FormFooter />
 </FormControl>
</template>

<script lang="ts" setup>

import { reactive, defineEmits } from 'vue';
import ProfileInputVue from './ProfileInput.vue';
import FormControl from './FormControl.vue';
import FormFooter from './FormFooter.vue';


const emits = defineEmits(['submit'])

const sendData = (e) => {
    emits('submit', e)
}
</script>