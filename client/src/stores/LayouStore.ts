import { defineStore } from "pinia";
import axios from "axios"
import config from "@/config/config";

export const layoutStore = defineStore("layout", {
    state: () => ({
        open: false,
        modalContent: '',
        drawerOpen: false,
        sidebar:false
        
    }),
    actions: {
        openSidebar(state: any) {
            state.open = !state.open
        },
      
        
    }
})