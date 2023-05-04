<template>
  
  <div class="flex items-center text-center overflow-hidden mx-auto md:w-auto rounded-md bg-gray-100">
    <section
      data-dragscroll
      class="min-w-[260px] md:min-w-[320px] md:m-auto"
    >
      <!-- <div class="m-1 text-center">
        Tasks: 
      </div> -->
      <div>
        <Draggable
          class="draggable-list m-auto md:h-[50vh]"
          tag="ul"
          :model-value="store.searchedTasks"
          v-if="store.searchedTasks "
          @change="handleDrag"
          group="my-group"
          item-key="_id"
        >
          <template #item="{ element }">
            <TaskVue class="m-2" :task="element" :column="column"/>
          </template>
        </Draggable>
        <Draggable
        v-else
          class="draggable-list m-auto md:h-[50vh]"
          tag="ul"
          :model-value="
            store.taskByColumn(column._id)
          "
          @change="handleDrag"
          group="my-group"
          item-key="_id"
        >
          <template #item="{ element }">
            <TaskVue class="m-2" :task="element" :column="column"/>
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
.draggable-list {
  
  color: #fff;
  border: 1px solid;
 
  overflow: auto;
}

</style>
