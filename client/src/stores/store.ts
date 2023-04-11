import { api } from "@/helpers/axios";
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
    asignedTo: string,
    createdBy:{};
    readonly createdAt: string;
    readonly updatedAt: string;
  }
  
  export interface Column {
    readonly _id: string;
    name: string;
    color: string;
  }
  export interface AddUsers {
    user: string,
    board: string,
    role:string
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
    selectedTask: Task;
    dialogOpen: boolean;
    selectedTaskId:string;
    usersInBoard: [];
    addUser: {
      user: string,
      board: string,
      role: string
    },
    taskDefault: {
      title: string,
      description:string,
      status: {
        _id: '',
        color:'',
        name: ''
      },
      asigned: '',
      priority: '',
      comments: {
        title: '',
        _id:''
      }
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
        selectedTask: {},
        dialogContent: '',
        usersInBoard: [],
        dialogOpen: false,
        addUser: {
          user: '',
          board: '',
          role: ''
        },
        taskDefault: {
          title: '',
          description:'' ,
          status: {
            _id: '',
            color:'',
            name: ''
          },
          asigned: '',
          priority: '',
          comments:  {
            _id: '',
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
          return state.selectedBoard?.tasks.filter((task) => task.status._id === column);
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
           
            const postBoard = await api.post(`/`, payload)
            this.boards.push(postBoard.data)
            return postBoard
        },
        async asignTaskToUser(payload: {asginedTo: string}) {
          const asign = await api.post(`/board/${this.selectedBoard?._id}/task/${this.selectedTaskId}`, payload)
          console.log(asign)
           if (asign.data.tasks!== undefined && this.selectedBoard?.tasks !== undefined) {
          this.selectedBoard.tasks = asign.data.tasks
          console.log('entro')
          } 
          return asign
        },
        async changeStatus(task: Task, status: Status) {
          const prevStatus = task.status;
          task.status = status;
          try {
            
            const token = JSON.parse(localStorage.getItem('user') || "error");

            console.log(task)
            const data = await axios.post(`http://localhost:3000/api/boards/task/update/${task._id}`, { task },{headers: {
              Authorization: 'Bearer ' + token.token //the token is a variable which holds the token
            }});
            
            /* this.success('Task saved successfully'); */
            console.log(data)
          } catch (error) {
            
            task.status = prevStatus;
          } 
        },
        async fetchBoards() {
            const token = JSON.parse(localStorage.getItem('user') || "error");
            
            const getBoards = await axios.get(`http://localhost:3000/api/boards/boards`, {headers: {
                Authorization: 'Bearer ' + token.token //the token is a variable which holds the token
              }})
              
              console.log('get boards', getBoards)
              this.boards = getBoards.data
              
            
        },
        async createColumn(payload: {name: string, color:string}) {
          const token = JSON.parse(localStorage.getItem('user') || "error");
          
         const newColumn = await axios.post(`http://localhost:3000/api/boards/column/${this.selectedBoard?._id}`, payload, {headers: {
          Authorization: 'Bearer ' + token.token //the token is a variable which holds the token
          
        }})
        return newColumn
        
        },
        async createTask(payload: {title: string, description: string, status: {name: string, _id: any}, priority: string}) {
          const token = JSON.parse(localStorage.getItem('user') || "error");
          
          const newTask = await axios.post(`http://localhost:3000/api/boards/task/${this.selectedBoard?._id}`, payload, {headers: {
           Authorization: 'Bearer ' + token.token //the token is a variable which holds the token
         }})
         
         if(newTask.data.tasks && this.selectedBoard?.tasks !== undefined) {
          this.selectedBoard.tasks = newTask.data.tasks 
          
          } 
          console.log()
         return this.selectedBoard?.tasks
        },
        async editTask(payload: {task: {title:string,description:string, status: {name:string, _id:any},  comments?: {comment: string}}}){
          
          const token = JSON.parse(localStorage.getItem('user') || "error");
        
          const editTask = await axios.post(`http://localhost:3000/api/boards/task/update/${this.selectedTaskId}`, payload, {headers: {
            Authorization: 'Bearer ' + token.token //the token is a variable which holds the token
          }})
          if(editTask.data.tasks && this.selectedBoard?.tasks !== undefined) {
          this.selectedBoard.tasks = editTask.data.tasks 
          }
          
          
          return editTask
        },
        async taskInfo(){
          const response = await api.get(`/task/${this.selectedTaskId}/board/${this.selectedBoard?._id}`)
          console.log(response.data)
          if(response.data && this.selectedBoard?.tasks !== undefined) {
            this.selectedTask = response.data 
            } 
            
          return response
        },
        async asignUserToBoard(payload: AddUsers) {
          console.log(payload.role)
          const response = await api.post(`/board/${payload.board}/user/${payload.user}`, {payload: payload.role});
          console.log(response);
          
          return response;
        },
        async asignedTo(){
          const listAccessUsers =await api.get(`/access/user/${this.selectedBoard?._id}`);
          this.usersInBoard = listAccessUsers.data.usersWithAccess
          return listAccessUsers
        },  
        async updateComment(payload: {comment: string}) {
          const updateComment = api.post(`/task/update/comment/${this.selectedTaskId}`, payload);

          return updateComment
        },
        async deleteTask() {
          const token = JSON.parse(localStorage.getItem('user') || "error");
        
          const deleteTask = await axios.post(`http://localhost:3000/api/boards/task/delete/${this.selectedTaskId}`,null, {headers: {
            Authorization: 'Bearer ' + token.token //the token is a variable which holds the token
          }})
          
          if(deleteTask.data.tasks && this.selectedBoard?.tasks !== undefined) {
            this.selectedBoard.tasks = deleteTask.data.tasks 
            }
          return deleteTask
        },
        async deleteColumn (columnId: string) {
          const token = JSON.parse(localStorage.getItem('user') || "error");

          const response = await axios.post(`http://localhost:3000/api/boards/board/${this.selectedBoard?._id}/column/${columnId}`, null, {headers: {
            Authorization: 'Bearer ' + token.token
          }})
          if (response.data.column && this.selectedBoard?.column !== undefined) {
            this.selectedBoard.column = response.data.column
            
          }
          
          
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
          loadDraftColumn(column: Column) {
            this.draftColumn = {
              _id: column._id,
              name: column.name,
              color: column.color
            }
          },
          loadDraftTask(task: Task) {
            this.draftTask = {
              _id: task._id,
              title: task.title,
              description: task.description,
              status: task.status,
              subtasks: task.subtasks,
            };
            
          }
    }
})