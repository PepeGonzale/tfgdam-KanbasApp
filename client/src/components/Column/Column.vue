<template>
  
  <div class="flex items-center text-center overflow-hidden bg-gray-300 mx-auto md:w-auto rounded-md">
    <section
      data-dragscroll
      class="min-w-[260px] last:pr-6 box-content m-auto"
    >
      <div class="m-1 text-center">
        Tasks: {{ store.taskByColumn(column._id)?.length }}
      </div>
      <div>
        <Draggable
          class="draggable-list"
          tag="ul"
          :model-value="
            store.taskByColumn(column._id)
          "
          @change="handleDrag"
          group="my-group"
          item-key="_id"
        >
          <template #item="{ element }">
            <TaskVue class="bg-gray-500 m-2" :task="element" :column="column"/>
          </template>
        </Draggable>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from "@/stores/store";
import TaskVue from "../Task/Task.vue";
import Draggable from "vuedraggable";
import { toast, Toaster } from "vue-sonner";

const props = defineProps(["column"]);
const store = useStore();
const handleDrag = async (e:any) => {
  if (e?.added?.element) {
    const task = e?.added.element;
    
    const newStatus = store.column.find((c) => c._id === props.column._id);
    console.log(task, newStatus)
    await store.changeStatus(task, newStatus)
    .then(() => {
      toast.success("Task saved!")
    })
    .catch(() => {
      toast.error("Error saving task, try again")
    })
  }
};


</script>
<style scoped>
.drag-item {
 
  
}
</style>
