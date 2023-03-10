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
            <datalist id="cityname">
              <option
                v-for="(column, index) in store.selectedBoard?.column"
                :key="column._id"
                :value="column.name"
              />
            </datalist>
          </div>
          <div class="flex">
          <button class="bg-red-500 p-2 rounded m-4 hover:bg-red-400 focus:outline" @click="useLayoutStore.drawerOpen = false">Cancel</button>
          <button type="submit" class="bg-red-500 p-2 rounded m-4 hover:bg-red-400 focus:outline" @click="createTask">Create Task</button>
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
const title = ref("");
const description = ref("");
const column = ref("");

const createTask = () => {
  const payload = {
    title: title.value,
    description: description.value,
    status: {
      title: column.value,
      _id: store.selectedBoard?.column.filter((t) => t.name === column.value)[0]
        ._id,
    },
  };

  const res = store.createTask(payload);
};
</script>
