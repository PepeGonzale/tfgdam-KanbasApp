<template>
    <div class="modal bg-slate-900 text-white pl-8 rounded-lg">
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
            <div v-for="user in auth.allUsers" class="absolute text-red-500">
              {{ user.email }}
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

const auth = authStore()
const userSelect = ref(auth.selectedUser)
const search = async () => {
  const payload = {
    email: userSelect.value
  }
  auth.listUsers(userSelect.value)
}
 </script>