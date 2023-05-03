import { defineStore } from "pinia";
export const layoutStore = defineStore("layout", {
    state: () => ({
        open: false,
        toast:false,
        modalContent: '',
        drawerOpen: false,
        sidebar:false,
        columnData: {
            _id: '',
            name: '',
            color: '',
        },
        commentInput: false,
        role: false,
        projectDropdown: false,
        profileDropdown: false,
        
    }),
    actions: {
        openSidebar(state: any) {
            state.open = !state.open
        },
      
        
    }
})