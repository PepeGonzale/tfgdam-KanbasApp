<template>
  <div class="bg-gray-200 rounded-md shadow max-h-screen">
    <div
      class="p-1.5 rounded-full cursor-pointer bg-white"
      @click="useLayoutStore.drawerOpen = false"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
    <div class="flex justify-between">
      <input
        v-model="userSelect"
        @input="search"
        type="text"
        class="flex-1 shadow appearance-none border rounded py-1 px-1 text-black"
      />
      <select
        id="countries"
        v-model="role"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
      >
        <option selected>Choose a role</option>
        <option value="Admin">Admin</option>
        <option value="Write">Write</option>
        <option value="Read">Read</option>
      </select>

      <div
        
        class="flex mt-2 transform px-2 max-w-md sm:px-0"
      >
        <div
          class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
        >
          <div class="relative flex-1 grid gap-1 p-1">
            <a
              v-for="user in auth.allUsers.splice(0,1)"
              class="cursor-pointer lista"
              @click="handleUserSelect(user._id)"
              :key="user._id"
            >
              {{ user.email }}
            </a>
            <p
              v-if="!auth.allUsers < 0"
              class="px-3 py-2 text-sm text-gray-700"
            >
              No se encontraron resultados.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="error"></div>
    <button
      class="flex-1 bg-red-500 rounded-lg shadow-lg p-2 w-full"
      @click="asignUser"
    >
      Save
    </button>
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
const searchTerm = ref("");
const role = ref("");
const search = async () => {
  const payload = {
    email: userSelect.value,
  };
  auth.listUsers(userSelect.value);
};
const handleUserSelect = async (user: string) => {
  console.log(user);
  if (store.selectedBoard !== undefined) {
    store.addUser.user = user;
    store.addUser.board = store.selectedBoard._id;
  }
  userSelect.value = user.email;
};
const asignUser = async () => {
  store.addUser.role = role.value;
  const res = await store
    .asignUserToBoard(store.addUser)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  useLayoutStore.drawerOpen = false;
 
};
</script>
<style>
.user {
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

.lista {
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
