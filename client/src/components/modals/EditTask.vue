<template>
  
  <div class="modal bg-slate-900 text-white pl-8 rounded-lg">
    <!-- The button to open modal -->
    <label for="my-modal" class="ml-auto pt-3">open modal</label>

    <!-- Put this part before </body> tag -->

    <div class="modal">
      <div class="modal-box">
        <div class="modal-action items-center">
          <div class="m-4 items-center">
            <label class="block text-sm font-medium">Name</label>
            <input
              type="text"
              v-model="title"
              class="mt-2 shadow appearance-none border rounded py-1 px-1 text-black"
            />
          </div>
          <div class="m-4 items-center">
            <label class="block text-sm font-medium">Description</label>
            <input
              v-model="description"
              type="text"
              class="mt-2 shadow appearance-none border rounded py-1 px-1 text-black"
            />
          </div>
          <div class="m-4 items-center">
            <label class="block text-sm font-medium m-auto">Which column? </label>

            <input
              v-model="column"
              type="text"
              name="city"
              list="cityname"
              class="mt-2 shadow appearance-none border rounded py-1 px-1 text-black"
              autocomplete="off"
            />
            <datalist id="cityname" >
              <option
                v-for="(column, index) in store.selectedBoard?.column"
                :key="column._id"
                :value="column.name"
              />
            </datalist>
          </div>
          <div class="m-4 items-center">
            Comments: <button class="text-blue-600 underline" @click="leaveComment">Leave a comment</button>
            <div v-if="useLayoutStore.commentInput">
              <input
              v-model="commentt"
              type="text"
              class="mt-2 shadow appearance-none border rounded py-1 px-1 text-black"
              
            />
            <button @click="commentUpload" class="bg-blue-600">Reply</button>
            </div>
          </div>
          <div class="flex">
          <button class="bg-red-500 p-2 rounded m-4 hover:bg-red-400 focus:outline" @click="useLayoutStore.drawerOpen = false">Cancel</button>
          <button type="submit" class="bg-red-500 p-2 rounded m-4 hover:bg-red-400 focus:outline" @click="editTask">Edit Task</button>
      </div>
        </div>
      </div>
    </div>
  </div>
  
  </template>
  <script lang="ts" setup>
  import { useStore } from "@/stores/store";
  import { layoutStore } from "@/stores/LayouStore";
  import { ref } from "vue";
  const useLayoutStore = layoutStore();
  const store = useStore();
  const title = ref(store.taskDefault.title);
  const description = ref(store.taskDefault.description);
  const column = ref(store.taskDefault.status.name);
  const commentt = ref(store.taskDefault.comments.title)
  const editTask = async () => {
    const payload = {
      task: {
    title: title.value,
    description: description.value,
    status: {
      name: column.value,
      _id: store.selectedBoard?.column.filter((t) => t._id === store.taskDefault.status._id)[0]._id,
    },
  }
  };
    const res = await store.editTask(payload);
    const deleteData = res.data.tasks.filter((t: any) => t._id === store.selectedTaskId)
  useLayoutStore.drawerOpen = false
  console.log(commentt.value)

  };
  const leaveComment = () => {
    useLayoutStore.commentInput = !useLayoutStore.commentInput;
    
  }
  const commentUpload = async () => {
    console.log(commentt.value)
    const payload= {
      comment: commentt.value
    }
    await store.updateComment(payload)
  }
  </script>
  