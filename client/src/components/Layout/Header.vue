<template>
 <header class="shrink-0 flex justify-between bg-white px-6 py-5 border-b-2 shadow-md">
      <a class="text-2xl font-black tracking-tight" href="">kanboard</a>
      
      <input type="file" @change="uploadImage"/>
      <button @click="uploadImage">Upload Image</button>
      <nav class="flex items-center gap-6">
        <a class="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 hover:cursor-pointer"
        @click="router.push({path:'/boards'})"
          >My boards</a
        >
     
        <Dropdown/>
        
      </nav>
     
    </header>
</template>
<script lang="ts" setup>
import { layoutStore } from "@/stores/LayouStore";
import { useStore } from "@/stores/store";
import PrimaryButton from "../buttons/PrimaryButton.vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { authStore } from "@/stores/auth/authStore";
import Dropdown from "../buttons/Dropdown.vue";
import { ref } from "vue";
const useLayoutStore = layoutStore();
const store = useStore();
const useAuthStore = authStore()
const router = useRouter()
const uploadImage = async (e: any) => {
  const file = e.target.files[0];
  const bucket = "tfg-kanban-app"
  const formData = new FormData();
  formData.append("image", file);
   const res = await axios.post(`http://localhost:3000/api/auth/user/image/${bucket}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }}).then(res => {
      console.log(res)
      useAuthStore.imageUrl = res.data.Location
    })
}

</script>
