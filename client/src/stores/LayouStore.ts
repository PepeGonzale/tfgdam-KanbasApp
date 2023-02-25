import { defineStore } from "pinia";

export const layoutStore = defineStore("layout", {
    state: () => ({
        open: false
    }),
    actions: {
        openSidebar(state: any) {
            state.open = !state.open
            console.log(state.open)
        }
    }
})