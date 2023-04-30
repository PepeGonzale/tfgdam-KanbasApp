<template>
     <header class="bg-gray-300 text-black flex px-6 py-3 border-b-2 items-center justify-between shadow-lg">
        <!-- Left -->
      <div class="flex my-4">
        <a class="text-2xl font-black tracking-tight m-auto" href="/boards">kanboard</a>
        <a @click="useLayoutStore.sidebar = !useLayoutStore.sidebar" class="hover:cursor-pointer m-auto hidden md:block">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="m-auto mx-6 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </a>
        <div class="relative md:inline-block hidden"  ref="dropdown" @mouseover="drop" @mouseout="useLayoutStore.projectDropdown = false">
            <button  type="button" class="inline-flex items-center justify-center w-full px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="options-menu" aria-expanded="true" aria-haspopup="true">
              Projects
            </button>
          
            <div class="absolute right-0 w-56 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg divide-y divide-gray-100 z-10" :class="useLayoutStore.projectDropdown ? 'block' : 'hidden'">
              <div class="py-1 border-b-2" >
                <div class="py-1" v-for="project in store.boards.slice(0,4)" @click="handleSelectedBoard(project)">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" >{{project.title}}</a>
              </div>
              </div>
              <div class="py-1">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="router.push({path: '/boards'})">See all projects</a>
              </div>
              <div class="py-1">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Add new project</a>
              </div>
            </div>
          </div> 
             
      </div>
      <div @click="router.push({path: '/boards'})">My boards</div>
      <!-- Right avatar -->

      <div class="block relative bg-blue-500 p-3 border-l-2 z-10 rounded-md" @mouseover="() => useLayoutStore.profileDropdown = true" @mouseout="() => useLayoutStore.profileDropdown = !useLayoutStore.profileDropdown" >
      <div class="relative m-auto inline-block text-left">
        <div class="">
          <button type="button" class="flex items-center text-sm rounded-full " id="user-menu" aria-expanded="false" aria-haspopup="true" >
            <span class="sr-only">Open user menu</span>
            <img class="rounded-full w-10 object-cover" :src="useAuthStore.userData.imageUrl" alt="">
            <span class="ml-3 font-medium text-white text-sm truncate">{{ useAuthStore.userData.username }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-2 w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              
          </button>

        </div>
      
<div :class="useLayoutStore.profileDropdown ? 'block' : 'hidden'" class="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
 <div class="flex p-3 border-l-2 rounded-md">
  <div class="w-32 h-32 mx-auto flex-shrink-0 rounded-full">
    <img class="w-full h-full object-cover" :src="useAuthStore.userData.imageUrl" alt="">
  </div>
  <div class="flex-1 ml-3">
    <div class="text-gray font-medium truncate">{{ useAuthStore.userData.username }}</div>
    <div class="text-gray-400 text-xs">{{ useAuthStore.userData.email }}</div>
    <div class="mt-2">
      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" @click="router.push({path: '/profile'})">Edit Profile</a>
    </div>
  </div>
</div>

  <div class="py-1 " role="none">
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Option 1</a>
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Option 2</a>
    <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:cursor-pointer" @click="logout" role="menuitem">Logout</a>
  </div>
</div>
</div>
      
      </div>
      </header>
</template>
<script lang="ts" setup>
import { layoutStore } from "@/stores/LayouStore";
import { useStore } from "@/stores/store";
import { useRouter } from "vue-router";
import { authStore } from "@/stores/auth/authStore";
import { ref } from "vue";
import { Toaster, toast } from "vue-sonner";
const useLayoutStore = layoutStore();
const store = useStore();
const useAuthStore = authStore();
const router = useRouter();
const dropdown = ref(null)
const drop = () => {
  useLayoutStore.projectDropdown = true
  console.log(useLayoutStore.projectDropdown)
};
const handleSelectedBoard = (project: any) => {
  store.selectBoard(project);
  router.push({path: "/"})
}
const logout = () => {
  
    toast.error('Logout Successfull');
 
  setTimeout(() => {
   useAuthStore.logout();
}, 1000)
  
  
}
</script>
