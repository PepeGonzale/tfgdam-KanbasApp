<template>
  
  <div class="z-20 bg-white rounded-lg">
    <div class="flex-justify-end">
      <div>
        <div
          class="p-1.5 hover:bg-red-200 rounded-full text-red-900"
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
          <form autocomplete="off" @submit.prevent="createTask">
            <h4 class="text-lg sm:text-2xl text-gray-800">Add a New Task</h4>
            <div class="mt-6 sm:mt-12">
              <div>
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
              <div>
                <label class="text-gray-500 block sm:inline"> Due date:</label>
              </div>
              <div>
                <label class="text-gray-500 block sm:inline">
                  Asgined to:</label
                >
              </div>
            </div>
            <div class="my-8">
              <label class="block text-gray-500">Description: (Optional)</label>
              <textarea
                class="border border-gray-300 w-full px-4 py-3 outline-none h-32"
                @input="check"
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
              Add Task
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
import Toast from "../buttons/Toast.vue"
import ErrorToast from "../buttons/ErrorToast.vue";
import { ref } from "vue";
import { use } from "chai";
const useLayoutStore = layoutStore();
const store = useStore();
var error = ""
const commentt = ref(store.taskDefault.comments.title);
const priority = ref(store.taskDefault.priority);
const title = ref(store.taskDefault.title);
const description = ref(store.taskDefault.description);
const column = ref(store.taskDefault.status.name);
const check = () => {
  console.log(description.value, column.value);
  console.log(store.taskDefault.status);
};
const createTask = () => {
  const payload = {
    title: title.value,
    description: description.value,
    status: {
      name: column.value,
      _id: store.selectedBoard?.column.filter(
        (t) => t._id === store.taskDefault.status._id
      )[0]._id,
    },
  };
  const res = store.createTask(payload);
};
const leaveComment = () => {
  useLayoutStore.commentInput = !useLayoutStore.commentInput;
};
const commentUpload = async () => {
  const payload = {
    comment: commentt.value,
  };
  const commentError = document.querySelector('.error')
  const response = await store.updateComment(payload);
  if (response.data.error && commentError) {
    useLayoutStore.toast = true
    error = response.data.error
    commentError.innerHTML = error
    setTimeout(() => {
      useLayoutStore.toast = false
    }, 2000)
  }
};
</script>
