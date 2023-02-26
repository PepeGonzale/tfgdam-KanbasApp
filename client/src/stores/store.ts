import { defineStore } from "pinia";

export const useStore = defineStore("store", {
    state: () => ({
   
    }),
    actions: {
        createBoard(payload:{name: string, description: string}) {
            console.log(payload.name, payload.description)
        }
    }
})