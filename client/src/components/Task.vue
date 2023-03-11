<template>
  <li
    class="group relative bg-white p-3 shadow m-auto rounded-md border-b border-gray-300 hover:bg-gray-50"
  >
    <a href="" class="text-sm">{{ props.task.title }}</a>
    <button
      class="absolute top-1 right-1 w-8 h-8 mt-2 bg-gray-50 place-content-center hidden group-hover:grid rounded-md text-gray-600 hover:text-black hover:bg-gray-200"
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
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
    </button>
  </li>
</template>
<script lang="ts" setup>

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

</script>
