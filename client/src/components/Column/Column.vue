<template>
  <div class="flex items-center text-center overflow-hidden bg-gray-300 rounded-md">
    <section
      data-dragscroll
      class="min-w-[260px] last:pr-6 box-content"
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
            <TaskVue class="drag-item" :task="element"/>
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

const props = defineProps(["column"]);
const store = useStore();
const handleDrag = async (e:any) => {
  if (e?.added?.element) {
    const task = e?.added.element;
    
    const newStatus = store.column.find((c) => c._id === props.column._id);
    console.log(task, newStatus)
    await store.changeStatus(task, newStatus)
  }
};


</script>
<style scoped>
.drag-item {
  background: #01BAEF;
  margin: 10px;
  
}
</style>
