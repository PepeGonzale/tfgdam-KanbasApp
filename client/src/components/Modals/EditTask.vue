<template>
  <div
    class="bg-white fixed top-24 rounded-md right-0 bottom-0 w-2/3 overflow-hidden"
  >
    <div class="flex-justify-end transition-transform duration-300">
      <div>
    <div
      class="p-1.5 rounded-full cursor-pointer"
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
    <div class="px-3 py-2 md:px-12 text-sm md:text-base">
      <form autocomplete="off" @submit.prevent="createTask" >
        <h4 class="text-lg sm:text-2xl text-gray-800">Add a New Task</h4>

     <h1>Created By: {{store.selectedTask.createdBy.username}}</h1>


        <div class="mt-6 sm:mt-12">
          <div class="justify-between">
            <label class="block text-gray-500">Title: </label>
            <input
              type="text"
              
              v-model="title"
              class="bg-transparent border-b border-gray-400 w-3/4 text-lg md:text-2xl outline-none"
            />
            
          </div>
          <div class="sm:flex my-8">
            <!-- // priority select -->
            <div>
              <label class="text-gray-500 block sm:inline"
                >Priority:
              </label>
              <input
                v-model="priority"
                type="text"
                name="priority"
                list="prioritys"
                class="mt-2 shadow appearance-none border rounded py-1 px-1 text-black"
                autocomplete="off"
              />
              <datalist id="prioritys" placeholder="">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </datalist>
            </div>
            <div class="mt-8 sm:mt-0 sm:ml-12">
              <label class="text-gray-500 block sm:inline"
                >Select a column:
              </label>
              <!-- // column options -->
              <input
                v-model="column"
                type="text"
                name="city"
                list="column"
                class="mt-2 shadow appearance-none border rounded py-1 px-1 text-black hover:cursor-pointer"
                autocomplete="off"
              />
              <datalist id="column" class="mr-1 py-1 px-1 border-r-1">
                <option
                  class="hover:cursor-pointer"
                  v-for="(column, index) in store.selectedBoard?.column"
                  :key="column._id"
                  :value="column.name"
                />
              </datalist>
            </div>
          </div>
        </div>
        <div class="flex justify-between">
       



<!-- <div class="relative max-w-sm">
<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
<svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
</div>
<input v-model="dueDate" @change="(e) => date(e)" type="datetime-local" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date">
</div> -->



          <DropdownSearch/>
        </div>
        <div class="my-8">
          <label class="block text-gray-500">Description: (Optional)</label>
          <textarea
            class="border border-gray-300 w-full px-4 py-3 outline-none h-32"

            v-model="description"
          ></textarea>
        </div>
        <div class="my-4 items-center">
          Comments:
          <button
            class="text-blue-600 underline"
            @click.prevent="leaveComment"
          >
            Leave a comment
          </button>
          <div v-if="useLayoutStore.commentInput">
            <input
              v-model="commentt"
              type="text"
              class="mt-2 shadow appearance-none border rounded py-1 px-1 text-black"
            />
            <div class="error"></div>
            <button
              @click="commentUpload"
              class="bg-blue-600 rounded-lg hover:bg-blue-300 shadow-md p-2 w-24 mx-2"
            >
              Reply
            </button>
          </div>
        </div>
        <button class="bg-purple-500 text-white px-2 py-1 rounded-sm">
          Add Tasks
        </button>
      </form>
    </div>
  </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from "@/stores/store";
import { layoutStore } from "@/stores/LayouStore";
import { Toaster, toast } from "vue-sonner";


import { ref, onMounted } from "vue";
import { authStore } from "@/stores/auth/authStore";
import DropdownSearch from "../General/DropdownSearch.vue";

const useLayoutStore = layoutStore();
const store = useStore();
const auth = authStore();

var error = "";
const commentt = ref(store.taskDefault.comments.title);
const priority = ref(store.taskDefault.priority);
const title = ref(store.taskDefault.title);
const description = ref(store.taskDefault.description);
const asigned = ref(store.taskDefault.asigned?.email);

const column = ref(store.taskDefault.status.name);
const dueDate = ref("");
const isDateAfterNow = ref(false);
onMounted(async () => {
  await store.asignedTo();
});
// Checkear si la fecha elegida es correcta
const date = (e) => {
  const selectedDateObject = new Date(e.target.value);
  const now = new Date();
  console.log(selectedDateObject.getTime());

  if (selectedDateObject.getTime() > now.getTime()) {
    console.log("Date is after now");
  } else {
    console.log(console.log("Date is before now"));
  }
};
const createTask = () => {
  const payload = {
    task: {
      title: title.value,
      description: description.value,
      status: {
        name: column.value,
        _id: store.selectedBoard?.column.filter(
          (t) => t._id === store.taskDefault.status._id
        )[0]._id,
      },
    },
  };
  const res = store.editTask(payload).then((data) => {
    toast.success("Task updated");

    setTimeout(() => {
      useLayoutStore.drawerOpen = false;
    }, 1000);
  });
};
const leaveComment = () => {
  useLayoutStore.commentInput = !useLayoutStore.commentInput;
};


const handleAsignedTo = async (user) => {
  console.log(user);
};
const commentUpload = async () => {
  const payload = {
    comment: commentt.value,
  };
  const commentError = document.querySelector(".error");
  const response = await store.updateComment(payload);
  if (response.data.error && commentError) {
    useLayoutStore.toast = true;
    error = response.data.error;
    commentError.innerHTML = error;
    setTimeout(() => {
      useLayoutStore.toast = false;
    }, 2000);
  }
};
</script>
<style>

</style>