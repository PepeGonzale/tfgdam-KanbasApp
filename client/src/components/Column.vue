<template>
  <div class="flex gap-6 border text-center bg-gray-100 max-h-full overflow-hidden w-auto">
    <section
      data-dragscroll
      class="min-w-[250px] last:pr-6 box-content items-center w-80"
    >
      <div class="flex items-center gap-3 pb-6">
        
      </div>
      <div>
        <Draggable
          class="draggable-list"
          tag="ul"
          :model-value="
            store.selectedBoard?.tasks.filter(
              (t) => t.status._id === column._id
            )
          "
          @change="handleDrag"
          group="my-group"
          item-key="_id"
        >
          <template #item="{ element }">
            <TaskVue class="drag-item" :task="element" />
          </template>
        </Draggable>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from "@/stores/store";
import TaskVue from "./Task.vue";
import Draggable from "vuedraggable";

const props = defineProps(["column"]);

const handleDrag = (e:any) => {
  if (e?.added?.element) {
    const task = e?.added.element;
    const newStatus = store.column.find((c) => c._id === props.column._id);
    
    store.changeStatus(task, newStatus)
  }
};

const store = useStore();
</script>
<style scoped>
.drag-item {
  background: paleturquoise;
  margin: 10px 0;
}
</style>
