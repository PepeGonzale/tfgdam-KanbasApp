<template>
<Header/>
<section class="p-6 xl:max-w-6xl xl:mx-auto">
<section class="mb-6 flex items-center justify-between">
<div class="flex items-center justify-start">
    <span class="inline-flex justify-center items-center w-12 h-12 rounded-full bg-white text-black mr-3">
        <h1 class="text-3xl leading-tight">Profile</h1>

    </span>

</div>
<a href="https://github.com/PepeGonzale/tfgdam-KanbasApp" target="_blank" class="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded-full border-gray-800 dark:border-white ring-gray-300 dark:ring-gray-400 bg-gray-800 text-white dark:bg-white dark:text-black hover:bg-gray-700 hover:dark:bg-slate-100 text-sm px-3 py-1">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
    </a>

</section>
<div class="rounded-2xl flex-col bg-gray-200 flex mb-6">
    <div class="flex-1 p-6">
        <div class="justify-around lg:justify-center items-center block md:flex">
            <!-- Avatar -->
            <div class="flex items-center justify-center mb-6 md:mb-0">
                <div class="lg:mx-12">
                    <img :src="useAuthStore.userData.imageUrl" class="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800" alt="Avatar"/>
                </div>
            </div>
            <div class="flex items-center justify-center">
                <div class="space-y-3 text-center md:text-left lg:mx-12">
                    <div class="flex justify-center md:block text-xl">
                        {{ useAuthStore.userData.username }}
                    </div>
                    <h1 class="text-2xl">Projects: {{ store.boards.length }}</h1>
                    <p></p>
                    <div class="flex justify-center md:block">
                        <div class="inline-flex items-center capitalize leading-none text-sm border rounded-full py-1.5 px-4 bg-blue-500 border-blue-500 text-white">
                            Verified
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <form class="rounded-2xl flex-col bg-gray-200 flex">
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
                            <input type="file" @change="uploadImage" class="absolute top-0 left-0 w-full h-full opacity-0 outline-none cursor-pointer -z-1"/>
                        </label>
                    </div>
                </div>
            </div>
            <div class="mb-6 last:mb-0">
    <label class="block font-bold mb-2">Name</label>
    <div class="relative">
        <input type="text" class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white pl-10"/>
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="16" height="16" stroke-width="1.5" stroke="currentColor" class="inline-block">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
        </span>
    </div>
    <div class="text-xs text-gray-500 dark:text-slate-400 mt-1">Required your name</div>
</div>

            <div class="mb-6 last:mb-0">
                <label class="block font-bold mb-2">E-mail</label>
                <div>
                    <div class="relative">
                        <input type="text" class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white  pl-10"/>
                        <span class="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400">
                            <!-- SVG -->
                        </span>
                    </div>
                </div>
                <div class="text-xs text-gray-500 dark:text-slate-400 mt-1">Required your email</div>
            </div>
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
    <form class="rounded-2xl flex-col bg-gray-200   flex">

    </form>
</div>
</section>

</template>
<script lang="ts" setup>
import {onMounted} from "vue"
import Header from "@/components/Layout/Header.vue";
import { authStore } from "@/stores/auth/authStore";
import axios from "axios";
import { useStore } from "@/stores/store";
const useAuthStore = authStore()
const store = useStore()
onMounted(async () => {
    store.fetchBoards();
    useAuthStore.userInfo
});
const uploadImage = async (e: any) => {
  const file = e.target.files[0];
  const bucket = "tfg-kanban-app"
  const formData = new FormData();
  formData.append("image", file);
  formData.append("id", useAuthStore.userData._id)
   const res = await axios.post(`http://localhost:3000/api/auth/user/image/${bucket}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }}).then(res => {
      console.log(res)
      useAuthStore.userData.imageUrl = res.data.image
    })
}
</script>