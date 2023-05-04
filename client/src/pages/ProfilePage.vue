<template>
<Default>
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
    <UserForm @uploadImage = "uploadImage" @submit="updateUser">
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
                            <input type="file" @change="(e) => uploadImage(e.target.files[0])" class="absolute top-0 left-0 w-full h-full opacity-0 outline-none cursor-pointer -z-1"/>
                        </label>
                    </div>
                </div>
            </div>

           
 <ProfileInput label="Name" v-model="userCredentials.username">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="16" height="16" stroke-width="1.5" stroke="currentColor" class="inline-block">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
 </ProfileInput>

            <ProfileInput label="E-mail" v-model="userCredentials.email">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline-block">
  <path stroke-linecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
</svg>
            </ProfileInput>
    </UserForm>
    <UserForm @submit="handlePassword">
        <div class="flex-1 p-6">
            <ProfileInput type="password" label="Current Password" v-model="credentials.curr_password">
                <svg viewBox="0 0 24 24" width="16" height="16" class="inline-block"><path fill="currentColor" d="M21 13H14.4L19.1 17.7L17.7 19.1L13 14.4V21H11V14.3L6.3 19L4.9 17.6L9.4 13H3V11H9.6L4.9 6.3L6.3 4.9L11 9.6V3H13V9.4L17.6 4.8L19 6.3L14.3 11H21V13Z"></path></svg>
            </ProfileInput>
            <ProfileInput type="password" label="New Password" v-model="credentials.new_password">
                <svg viewBox="0 0 24 24" width="16" height="16" class="inline-block"><path fill="currentColor" d="M17,7H22V17H17V19A1,1 0 0,0 18,20H20V22H17.5C16.95,22 16,21.55 16,21C16,21.55 15.05,22 14.5,22H12V20H14A1,1 0 0,0 15,19V5A1,1 0 0,0 14,4H12V2H14.5C15.05,2 16,2.45 16,3C16,2.45 16.95,2 17.5,2H20V4H18A1,1 0 0,0 17,5V7M2,7H13V9H4V15H13V17H2V7M20,15V9H17V15H20M8.5,12A1.5,1.5 0 0,0 7,10.5A1.5,1.5 0 0,0 5.5,12A1.5,1.5 0 0,0 7,13.5A1.5,1.5 0 0,0 8.5,12M13,10.89C12.39,10.33 11.44,10.38 10.88,11C10.32,11.6 10.37,12.55 11,13.11C11.55,13.63 12.43,13.63 13,13.11V10.89Z"></path></svg>
            </ProfileInput>
            <ProfileInput type="password" label="Confirm Password" v-model="credentials.confirm_password">
                <svg viewBox="0 0 24 24" width="16" height="16" class="inline-block"><path fill="currentColor" d="M17,7H22V17H17V19A1,1 0 0,0 18,20H20V22H17.5C16.95,22 16,21.55 16,21C16,21.55 15.05,22 14.5,22H12V20H14A1,1 0 0,0 15,19V5A1,1 0 0,0 14,4H12V2H14.5C15.05,2 16,2.45 16,3C16,2.45 16.95,2 17.5,2H20V4H18A1,1 0 0,0 17,5V7M2,7H13V9H4V15H13V17H2V7M20,15V9H17V15H20M8.5,12A1.5,1.5 0 0,0 7,10.5A1.5,1.5 0 0,0 5.5,12A1.5,1.5 0 0,0 7,13.5A1.5,1.5 0 0,0 8.5,12M13,10.89C12.39,10.33 11.44,10.38 10.88,11C10.32,11.6 10.37,12.55 11,13.11C11.55,13.63 12.43,13.63 13,13.11V10.89Z"></path></svg>
            </ProfileInput>
        </div>
            
    </UserForm>
</div>
</section>
</Default>
</template>
<script lang="ts" setup>
import {onMounted, reactive} from "vue"
import { authStore } from "@/stores/auth/authStore";
import UserForm from "@/components/Profile/UserForm.vue";
import axios from "axios";
import { useStore } from "@/stores/store";
import { toast } from "vue-sonner";
import Default from "@/layouts/Default.vue";
import FormControl from "@/components/Profile/FormControl.vue";
import FormFooter from "@/components/Profile/FormFooter.vue"
import ProfileInput from "@/components/Profile/ProfileInput.vue";
const useAuthStore = authStore();
const store = useStore();
const credentials = reactive({
    curr_password: '',
    new_password: '',
    confirm_password: ''
})
var userCredentials = reactive({
    email: "",
    username: ""
});
onMounted(async () => {
    store.fetchBoards();
    useAuthStore.userInfo
});
const handlePassword = () => {
    console.log(credentials)
}
const uploadImage = async (file: any) => {
    console.log(file)
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
};
const updateUser = async () => {
    const data = {
        email: userCredentials.email,
        username: userCredentials.username
    }
    const token = JSON.parse(localStorage.getItem('user') || "error");
    const res = await axios.post(`http://localhost:3000/api/auth/update`, data, {headers: {
            Authorization: 'Bearer ' + token.token //the token is a variable which holds the token
          }})
    .then(res => {
        toast.success(`Username and email updated`)

    })
}
</script>