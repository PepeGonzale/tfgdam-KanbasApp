<template>
  <div class="flex mt-2 bg-white">  
  <div class="flex-row border-r-2 w-full">  
      <label class="items-center m-6 px-12 pt-4">Add a User to Your project</label>
    <div class="flex justify-between items-center">

    <input
              v-model="userSelect"
              @input="search"
              type="text"
              class="m-12 flex-1 shadow appearance-none border rounded py-1 px-1 text-black"
            />
            <div class="fixed top-36 ml-12 mt-3 text-red-500">
              <ul class="user">
                <li v-for="user in auth.allUsers" class="cursor-pointer lista" @click="handleUserSelect(user._id)">{{ user.email }}</li>
              </ul>
            </div>
    <div class="items-center">
<select id="countries" v-model="role" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
  <option selected>Choose a role</option>
  <option value="Admin">Admin</option>
  <option value="Write">Write</option>
  <option value="Read">Read</option>

</select>
</div>
<div class="items-center">
<button class="mx-12 bg-red-500 rounded-lg shadow-lg p-2 w-24" @click="asignUser">Save</button>
</div>
      </div>
    </div>

      

  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { authStore } from "@/stores/auth/authStore";
import { useStore } from "@/stores/store";
import { layoutStore } from "@/stores/LayouStore";
const store = useStore();
const useLayoutStore = layoutStore();
const auth = authStore();
const userSelect = ref(auth.selectedUser);
const role = ref("");
const search = async () => {
  const payload = {
    email: userSelect.value,
  };
  auth.listUsers(userSelect.value);
};
const handleUserSelect = async (user: string) => {
  if (store.selectedBoard !== undefined) {
    store.addUser.user = user;
    store.addUser.board = store.selectedBoard._id;
    
  }
  
  
};
const asignUser = async () => {
  store.addUser.role = role.value;
const res = await store.asignUserToBoard(store.addUser);
  
  useLayoutStore.drawerOpen = false;
}
</script>
<style>
.user{
    position: absolute;
    max-height: 220px;
    z-index: 200;
    overflow: hidden auto;
    margin: 0px 0px 0px 22px;
    padding: 8px 0px 8px 4px;
    list-style: none;
    background-color: rgb(22, 27, 34);
    border-radius: 12px;
    box-shadow: rgb(1 4 9) 0px 8px 24px;
    width: 400px;
    
}
  
  .lista{

    word-wrap: break-word;
position: relative;
    background-color: rgb(22, 27, 34);
    line-height: 1.5;
    padding: 6px 8px;
    margin: 0px 8px;
    font-size: 14px;
    border-radius: 6px;
    color: rgb(201, 209, 217);
    cursor: pointer;
    height: 32px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>
