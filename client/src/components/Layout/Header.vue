<template>
     <header class="bg-gray-300 text-black flex px-6 py-3 border-b-2 items-center justify-between shadow-lg">
        <!-- Left -->
      <div class="flex my-4">
        <a class="text-2xl font-black tracking-tight m-auto" href="/boards">kanboard</a>
       
        <div class="relative mx-4 md:inline-block hidden" ref="dropdown" @mouseover="drop" @mouseout="useLayoutStore.projectDropdown = false">
            <button  type="button" class="inline-flex items-center justify-center w-full px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="options-menu" aria-expanded="true" aria-haspopup="true">
              Projects
            </button>
          
            <div class="absolute right-0 w-56 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg divide-y divide-gray-100 z-10" :class="useLayoutStore.projectDropdown ? 'block' : 'hidden'">
              <div class="py-1 border-b-2" >
                <div class="py-1" v-for="project in store.boards.slice(0,4)" @click="handleSelectedBoard(project)">
                <a :href="`/board/${project._id}`" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" >{{project.title}}</a>
              </div>
              </div>
              <div class="py-1">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="router.push({path: '/'})">See all projects</a>
              </div>
              <div class="py-1">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Add new project</a>
              </div>
            </div>
          </div> 
             
      </div>
      <div v-if="router.currentRoute.value.path = '/' || '/boards'" class="md:hidden mr-12 cursor-pointer" @click="router.push({path: '/profile'})">Profile</div>
      <div v-else>Boards</div>
      <div @click="router.push({path: '/'})" class="hidden md:block cursor-pointer">My boards</div>
      <!-- Right avatar -->

      <div class="relative md:inline-block hidden" @mouseover="() => useLayoutStore.profileDropdown = true" @mouseout="() => useLayoutStore.profileDropdown = !useLayoutStore.profileDropdown" >
     
       
          <button type="button" class="flex items-center bg-blue-primary text-sm rounded-lg px-4 py-3" id="user-menu" aria-expanded="false" aria-haspopup="true" >
            <img class="rounded-full w-10 object-cover" :src="useAuthStore.userData.imageUrl" alt="">
            <span class="ml-3 font-medium text-white text-sm truncate">{{ useAuthStore.userData.username }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-2 w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              
          </button>

     
      
<div :class="useLayoutStore.profileDropdown ? 'block' : 'hidden'"  class="absolute right-0 w-80 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg divide-y divide-gray-100 z-10">
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
      
     
      </header>
</template>
<script lang="ts" setup>
import { layoutStore } from "@/stores/LayouStore";
import { useStore } from "@/stores/store";
import { useRouter } from "vue-router";
import { authStore } from "@/stores/auth/authStore";
import { ref } from "vue";
import {  toast } from "vue-sonner";
const useLayoutStore = layoutStore();
const store = useStore();
const useAuthStore = authStore();
const router = useRouter();
const dropdown = ref(null)
console.log(router.currentRoute.value)
const drop = () => {
  useLayoutStore.projectDropdown = true
  
};
const handleSelectedBoard = (project: any) => {

  store.selectBoard(project);
  const toastPromise = toast.promise(() => new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
    setTimeout(() => {
      router.push({path: "/board/" + project._id})
    }, 500)
  }), {
  loading: 'Loading',
  success: (data: any) => 'Success' ,
  error: (data: any) => 'Error'
    
})
}
const logout = () => {
  
    toast.error('Logout Successfull');
 
  setTimeout(() => {
   useAuthStore.logout();
}, 1000)
  
  
}
</script>
