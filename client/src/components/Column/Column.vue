<template>
  <div class="w-full">
    <Draggable
      class="min-h-[40px] flex flex-col gap-2 p-2"
      tag="ul"
      :model-value="store.searchedTasks ? store.searchedTask(column._id) : store.taskByColumn(column._id)"
      @change="handleDrag"
      group="my-group"
      item-key="_id"
    >
      <template #item="{ element }">
        <TaskVue :task="element" :column="column" />
      </template>
    </Draggable>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/stores/store";
import TaskVue from "../Task/Task.vue";
import Draggable from "vuedraggable";
import { toast } from "vue-sonner";

const props = defineProps(["column"]);
const store = useStore();

const handleDrag = async (e: any) => {
  if (e?.added?.element) {
    const task = e.added.element;
    const newStatus = store.column.find((c) => c._id === props.column._id);
    await store.changeStatus(task, newStatus)
      .then(() => toast.success("Task saved!"))
      .catch(() => toast.error("Error saving task, try again"));
  }
};
</script>
