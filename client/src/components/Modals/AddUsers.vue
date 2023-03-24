<template>
      <div class="z-20 bg-white rounded-lg">
  <div class="flex-justify-end">
    <!-- The button to open modal -->
    <label for="my-modal" class="ml-auto pt-3">open modal</label>

    <!-- Put this part before </body> tag -->

    <div class="modal">
      <div class="modal-box">
        <div class="modal-action items-center">
     <div class="m-4 items-center">
            <label class="block text-sm font-medium m-auto">Which column? </label>

            <input
              v-model="userSelect"
              @input="search"
              type="text"
              class="mt-2 shadow appearance-none border rounded py-1 px-1 text-black"
            />
            <div class="absolute text-red-500 h-128">
              <ul v-for="user in auth.allUsers" class="bg-blue-500">
                <li class="cursor-pointer" @click="handleUserSelect(user)">{{ user.email }}</li>
              </ul>
            </div>
          </div>
          </div>
          </div>
          </div>
          </div>
          </div>
</template>
<script lang="ts" setup>
import {ref} from "vue"
import { authStore } from "@/stores/auth/authStore";
import { layoutStore } from "@/stores/LayouStore";
const useLayoutStore = layoutStore()
const auth = authStore()
const userSelect = ref(auth.selectedUser)
const search = async () => {
  const payload = {
    email: userSelect.value
  }
  auth.listUsers(userSelect.value)
}
const handleUserSelect = (user) => {
  console.log(user.email)
  useLayoutStore.drawerOpen = false
}
 </script>