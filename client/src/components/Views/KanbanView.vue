<template>
     <div class="flex mt-4 justify-between items-center w-full px-3 py-2 bg-gray-300" >
                <div>
                  <span class="drag-handle text-left cursor-move">⠏ </span>

                </div>
                <h3 class="text-md font-semibold">
                  {{ props.column.name.toUpperCase() }}
                  <span>({{ store.taskByColumn(props.column._id)?.length }})</span>
                </h3>
                <button
                  class="hover:bg-gray-300 w-auto p-2 rounded-md grid place-content-center"
                  @click="editColumn(props.column)"
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
                      d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                    />
                  </svg>
                </button>
              </div>
              <div class="px-3 pb-3 flex flex-col overflow-hidden bg-gray-100" >
                <div class="flex-1 overflow-y-auto">
                  <Column :column="props.column" />
                </div>
                <CreateTask :column="props.column"/>
              </div>
</template>
<script lang="ts" setup>
import { useStore } from '@/stores/store';
import Column from "@/components/Column/Column.vue";
import CreateTask from "@/components/Modals/CreateTask.vue";

const store = useStore();

const props = defineProps({
    column: {
        type: Object,
        required: true
    }
})
</script>