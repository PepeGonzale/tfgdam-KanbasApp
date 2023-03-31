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
                    <img :src="useAuthStore.imageUrl" class="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800" alt="Avatar"/>
                </div>
            </div>
            <div class="flex items-center justify-center">
                <div class="space-y-3 text-center md:text-left lg:mx-12">
                    <div class="flex justify-center md:block">

                    </div>
                    <h1 class="text-2xl">Hola</h1>
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
                        <label>
                            <a></a>
                            <input type="file"/>
                        </label>
                    </div>
                </div>
            </div>
            <div class="mb-6 last:mb-0">
                <label class="block font-bold mb-2">Name</label>
                <div>
                    <div class="relative">
                        <input type="text" class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white  pl-10"/>
                        <span class="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400">
                            <!-- SVG -->
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
import {ref} from "vue"
import VueClickAway from "vue3-click-away";
import { useRouter} from "vue-router";
import Header from "@/components/Layout/Header.vue";
import { authStore } from "@/stores/auth/authStore";
const useAuthStore = authStore()

const onClickAway = (open: boolean) => {
    open = false
    console.log(open);
    return open
}

</script>