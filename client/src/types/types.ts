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
  
  export type Column = { 
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
    selectedColumn: Column;
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