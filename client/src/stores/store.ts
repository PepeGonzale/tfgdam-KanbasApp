import axios from "axios";
import { defineStore } from "pinia";
export interface Status {
    title: string;
    color: string;
    _id: string;
  }
  
  export interface Subtask {
    readonly _id: string;
    title: string;
    completed: boolean;
    readonly createdAt: string;
    readonly updatedAt: string;
  }
  
  export interface Task {
    readonly _id: string;
    title: string;
    description?: string;
    status: Status;
    subtasks: [];
    readonly createdAt: string;
    readonly updatedAt: string;
  }
  
  export interface Column {
    readonly _id: string;
    name: string;
    color: string;
  }
  
  export interface Board {
    readonly _id: string;
    title: string;
    description?: string;
    readonly createdBy: string;
    column: {
      name: string;
      color?: string;
      readonly _id: string;
    }[];
    tasks: Task[];
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly __v: number;
  }
  
  export interface Store {
    
    boards: Board[];
    dialogContent: string;
    dialogOpen: boolean;
    selectedTaskId:string;
    taskDefault: {
      title: string,
      description:string,
      status: Status
    }
    draftTask: {
      _id: string;
      title: string;
      description?: string;
      status: Status;
      subtasks: string[];
    };
    draftColumn: {
      _id: string;
      name: string;
      color: string;
    };
    drawerOpen: boolean;
    newTask: {
      title: string;
      description?: string;
      status: string;
      subtasks: string[];
    };
    selectedBoard?: Board;
  }
    
export const useStore = defineStore("store", {
    state: ():Store => ({
        boards: [],
        selectedTaskId: '',
        dialogContent: '',
        dialogOpen: false,
        taskDefault: {
          title: '',
          description:'' ,
          status: {
            _id: '',
            color:'',
            title: ''
          } 
        },
        draftTask: {
          _id: '',
          title: '',
          description: '',
          status: {
            title: '',
            color: '',
            _id: '',
          },
          subtasks: [],
        },
        draftColumn: {
          _id: '',
          name: '',
          color: '',
        },
        drawerOpen: false,
        newTask: { title: '', description: '', status: '', subtasks: [] },
        selectedBoard: undefined,
      }),  
      getters: {
        taskByColumn: (state) => (column: string) => {
          state.selectedBoard?.tasks.filter((t) => t.status._id === column)
        },
        column: (state) =>
        state.selectedBoard?.column.map((c) => {
          return {
            ...c,
            name: c.name[0].toUpperCase().concat(c.name.slice(1)),
          };
        }) || [],
      },
    actions: {
        async createBoard(payload:{title: string, description: string}) {
            const token = JSON.parse(localStorage.getItem('user') || "error");
           
            const postBoard = await axios.post(`http://localhost:3000/api/boards/`, payload, {headers: {
                Authorization: 'Bearer ' + token.token //the token is a variable which holds the token
              }})
              console.log(postBoard.data);
            this.boards.push(postBoard.data)
            return postBoard
        },
        async fetchBoards() {
            const token = JSON.parse(localStorage.getItem('user') || "error");
            console.log(token);
            
            const getBoards = await axios.get(`http://localhost:3000/api/boards/boards`, {headers: {
                Authorization: 'Bearer ' + token.token //the token is a variable which holds the token
              }})
              
              
              this.boards = getBoards.data
              console.log(this.boards);
              
            
        },
        async createColumn(payload: {name: string, color:string}) {
          const token = JSON.parse(localStorage.getItem('user') || "error");
         const newColumn = await axios.post(`http://localhost:3000/api/boards/column/${this.selectedBoard?._id}`, payload, {headers: {
          Authorization: 'Bearer ' + token.token //the token is a variable which holds the token
          
        }})
        return newColumn
        
        },
        async createTask(payload: {title: string, description: string, status: {title: string, _id: any}}) {
          const token = JSON.parse(localStorage.getItem('user') || "error");
          
          const newTask = await axios.post(`http://localhost:3000/api/boards/task/${this.selectedBoard?._id}`, payload, {headers: {
           Authorization: 'Bearer ' + token.token //the token is a variable which holds the token
         }})
         if(newTask.data.tasks && this.selectedBoard?.tasks !== undefined) {
          this.selectedBoard.tasks = newTask.data.tasks 
          } 
        console.log(this.selectedBoard?.tasks)
         return newTask
        },
        async editTask(payload: {title:string,description:string, status: {title:string, _id:any}}){
          
          const token = JSON.parse(localStorage.getItem('user') || "error");
        
          const editTask = await axios.post(`http://localhost:3000/api/boards/task/update/${this.selectedTaskId}`, payload, {headers: {
            Authorization: 'Bearer ' + token.token //the token is a variable which holds the token
          }})
          if(editTask.data.tasks && this.selectedBoard?.tasks !== undefined) {
          this.selectedBoard.tasks = editTask.data.tasks 
          }
          console.log(this.selectedBoard?.tasks);
          
          
          return editTask
        },
        selectBoard(board: Board) {
            this.newTask = {
              title: '',
              description: '',
              status: '',
              subtasks: [],
            };
            this.draftTask = {
              _id: '',
              title: '',
              description: '',
              status: {
                title: '',
                color: '',
                _id: '',
              },
              subtasks: [],
            };
            this.selectedBoard = board;
          },
          loadDraftTask(task: Task) {
            this.draftTask = {
              _id: task._id,
              title: task.title,
              description: task.description,
              status: task.status,
              subtasks: task.subtasks,
            };
            console
          }
    }
})