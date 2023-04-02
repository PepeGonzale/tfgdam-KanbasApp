<template>
       <nav :class="{'flex': useLayoutStore.open, 'hidden': !useLayoutStore.open}"
                class="flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row bg-gray-200 rounded-lg">
                <div class="relative" x-data="{ open: false }">
                    <button @click="useLayoutStore.open = !useLayoutStore.open"
                        class="flex flex-row items-center space-x-2 w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent hover:bg-blue-200 md:w-auto md:inline md:mt-0 md:ml-4">
                        <span>{{useAuthStore.userData.username}}</span>
                        <svg fill="currentColor" viewBox="0 0 20 20" :class="{'rotate-180': useLayoutStore.open, 'rotate-0': !useLayoutStore.open}"
                            class="inline w-4 h-4 transition-transform duration-200 transform">
                            <path fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                    <div v-if="useLayoutStore.open" x-transition:enter="transition ease-out duration-100"
                        x-transition:enter-start="transform opacity-0 scale-95"
                        x-transition:enter-end="transform opacity-100 scale-100"
                        x-transition:leave="transition ease-in duration-75"
                        x-transition:leave-start="transform opacity-100 scale-100"
                        x-transition:leave-end="transform opacity-0 scale-95"
                        class="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48 transition-opacity duration-300"
                        
                        >
                        <div class="py-2 bg-white text-blue-800 text-sm rounded-sm border border-main-color shadow-sm ">
                            <a class="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                href="#" @click="router.push({path:'/profile'})">Settings</a>
                            <a class="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                href="#">Help</a>
                            <div class="border-b"></div>
                            <a class="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                href="#" @click="useAuthStore.logout">Logout</a>
                        </div>
                    </div>
                </div>
            </nav>
</template>
<script lang="ts" setup>
import { layoutStore } from '@/stores/LayouStore';
import { authStore } from '@/stores/auth/authStore';
import { useRouter } from 'vue-router';
const router = useRouter();
const useLayoutStore = layoutStore();
const useAuthStore = authStore();

</script>