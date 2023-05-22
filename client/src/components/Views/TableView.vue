<template>
    
<div class="md:m-2 items-center md:items-start h-auto md:bg-none flex space-y-4 flex-col w-full rounded-md overflow-auto">
    <table class="w-full text-sm text-left  text-gray-500 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
                <th scope="col" class="px-6 py-3">
                    
                </th>
                <th scope="col" class="px-6 py-3">
                    Title
                </th>
                <th scope="col" class="px-6 py-3">
                    Assignees
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
               
            </tr>
        </thead>
        <tbody >
            <tr class="bg-white border-b " :key="tasks._id" v-for="(tasks, index) in store.selectedBoard?.tasks">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {{ index }}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {{tasks.title}}
                </th>
                <td class="px-6 py-4">
                    {{tasks.asignedTo?.email}}
                </td>
                <td class="px-6 py-4">
                    {{tasks.status.name}}
                </td>
                
            </tr>
            
        </tbody>
    </table>
</div>

</template>
<script lang="ts" setup>
import { useStore } from '@/stores/store';

const store = useStore()
</script>