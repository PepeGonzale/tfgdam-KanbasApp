<template>
    <form @submit.prevent="sendData" class="rounded-2xl flex-col bg-gray-200 flex">
        <div class="flex-1 p-6">
            <div class="mb-6 last:mb-0">
                <label class="block font-bold mb-2">Avatar</label>
                <div>
                    <div class="flex items-stretch justify-start relative">
                        <label class="inline-flex">
                            <a class="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded border-blue-600 dark:border-blue-500 ring-blue-300 dark:ring-blue-700 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-700 hover:dark:bg-blue-600 hover:dark:border-blue-600 py-2 px-3">
                                <span class="inline-flex justify-center items-center w-6 h-6"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
</svg>
</span>
                                <span class="px-2">Upload</span>
                            </a>
                            <input type="file" @change="(e) => handleImage(e)" class="absolute top-0 left-0 w-full h-full opacity-0 outline-none cursor-pointer -z-1"/>
                        </label>
                    </div>
                </div>
            </div>
 <ProfileInputVue label="Name" v-model="credentials.username">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="16" height="16" stroke-width="1.5" stroke="currentColor" class="inline-block">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
 </ProfileInputVue>

            <ProfileInputVue label="E-mail" v-model="credentials.email">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline-block">
  <path stroke-linecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
</svg>
            </ProfileInputVue>
        </div>
        <footer class="p-6">
            <div class="flex items-center justify-start flex-wrap -mb-3">
                <button type="submit" class="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded border-blue-600 dark:border-blue-500 ring-blue-300 dark:ring-blue-700 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-700 hover:dark:bg-blue-600 hover:dark:border-blue-600 py-2 px-3 mr-3 last:mr-0 mb-3">
                    <span class="px-2">Submit</span>
                </button>
                <button class="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded border-blue-600 dark:border-blue-500 ring-blue-300 dark:ring-blue-700 text-blue-600 dark:text-blue-500 hover:bg-blue-600 hover:text-white hover:dark:text-white hover:dark:border-blue-600 py-2 px-3 mr-3 last:mr-0 mb-3">
                    <span class="px-2">Options</span>
                </button>
            </div>
        </footer>
    </form>
</template>

<script lang="ts" setup>

import { reactive, defineEmits } from 'vue';
import ProfileInputVue from './ProfileInput.vue';
var credentials = reactive({
    email: "",
    username: ""
});

const emits = defineEmits(['uploadImage', 'userData'])
const handleImage = (e: any) => {
    emits("uploadImage",e.target.files[0])
};
const sendData = () => {
     emits('userData', {email: credentials.email, username: credentials.username}) 
    credentials.email = ""
    credentials.username = "" 
}
</script>