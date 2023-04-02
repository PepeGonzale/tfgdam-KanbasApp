<template>
<Header/>
<section class="p-6 xl:max-w-6xl xl:mx-auto">
<section class="mb-6 flex items-center justify-between">
<div class="flex items-center justify-start">
    <span class="inline-flex justify-center items-center w-12 h-12 rounded-full bg-white text-black mr-3">
        <h1 class="text-3xl leading-tight">Profile</h1>

    </span>

</div>
<a class="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded-full border-gray-800 dark:border-white ring-gray-300 dark:ring-gray-400 bg-gray-800 text-white dark:bg-white dark:text-black hover:bg-gray-700 hover:dark:bg-slate-100 text-sm px-3 py-1">Es un link a github</a>

</section>
<div class="rounded-2xl flex-col dark:bg-slate-900/70 bg-white flex mb-6">
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
    <form class="rounded-2xl flex-col dark:bg-slate-900/70 bg-white flex">
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
                <div>
                    <div class="relative">
                        <input type="text" class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white  pl-10"/>
                        <span class="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline-block w-8 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>

                        </span>
                    </div>
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
    <form class="rounded-2xl flex-col dark:bg-slate-900/70 bg-white flex">

    </form>
</div>
</section>

</template>
<script lang="ts" setup>
import {onMounted, ref} from "vue"
import VueClickAway from "vue3-click-away";
import { useRouter} from "vue-router";
import Header from "@/components/Layout/Header.vue";
import { authStore } from "@/stores/auth/authStore";
import axios from "axios";
import { useStore } from "@/stores/store";
const useAuthStore = authStore()
const store = useStore()
onMounted(async () => {
    store.fetchBoards();
    const email = useAuthStore.user.email
    const res = await axios.get(`http://localhost:3000/api/auth/find/user/${email}`)
    .then(res => {
        console.log(res)
        useAuthStore.userData.imageUrl = res.data.image
        useAuthStore.userData.email = res.data.email
        useAuthStore.userData.username = res.data.username
        useAuthStore.userData._id = res.data._id
        
    })
})
const getImage = async () => {
   
}
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
      
      useAuthStore.userData.imageUrl = res.data.image
    })
}
</script>