<template>
  <div class="mt-3 items-center">
    <div @focusout="showInput = false">
    <input
      v-model="body"
      
      @keypress.enter="handleTask(props.column)"
      :class="showInput ? 'block' : 'hidden'"
      v-if="props.column === store.selectedColumn"
      placeholder="Title task"
      class="flex items-center p-2 text-sm font-medium text-gray-600 bg-gray-100 gover:text-black hover:bg-gray-300 rounded-md w-full"
    />
    <button @click="handleTask(props.column)" class="flex items-center p-2 text-sm font-medium text-gray-600 bg-gray-100 gover:text-black hover:bg-gray-300 rounded-md w-full" v-if="showInput">
        Add Task
    </button>
  </div>
    <button
      class="flex items-center p-2 text-sm font-medium text-gray-600 bg-gray-100 gover:text-black hover:bg-gray-300 rounded-md w-full md:w-full"
      @click="startEdit(props.column)"
      v-if="!showInput"
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
          d="M12 6v12m6-6H6"
        />
      </svg>

      <span>Add Card</span>
    </button>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from "@/stores/store";
import { layoutStore } from "@/stores/LayouStore";
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";
import { toast } from "vue-sonner";
const store = useStore();

const showInput = ref(false);
const body = ref("");

const props = defineProps(["column"]);
const emits = defineEmits(["createTask"]);
type Column = {name: string, _id: string, color: string}

const handleTask = async (column: Column) => {
  
  try {
    const payload = {
      title: body.value,
      status: {
        name: column.name,
        _id: store.selectedBoard?.column.filter(
          (t) => t.name === column.name
        )[0]._id,
      },
    };
    const res = await store.createTask(payload);
  } catch (err) {
    return;
  } finally {
    toast.success("Task created successfully");
    body.value = "";
    showInput.value = false;
  }
};
const startEdit = (column) => {
  store.selectedColumn = column;
  showInput.value = true;
};
</script>
