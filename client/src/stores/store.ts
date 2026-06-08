import { api } from "@/helpers/axios";
import { defineStore } from "pinia";
import type { Store, Task, Status, AddUsers, Board, Column, Subtask } from "@/types/types";

export const useStore = defineStore("store", {
  state: (): Store => ({
    boards: [],
    selectedTaskId: '',
    selectedTask: {},
    selectedColumn: {},
    dialogContent: '',
    usersInBoard: [],
    dialogOpen: false,
    addUser: { user: '', board: '', role: '' },
    taskDefault: {
      title: '',
      description: '',
      status: { _id: '', color: '', name: '' },
      asigned: {},
      priority: '',
      comments: { _id: '', title: '' },
    },
    draftTask: {
      _id: '',
      title: '',
      description: '',
      status: { title: '', color: '', _id: '' },
      subtasks: [],
    },
    draftColumn: { _id: '', name: '', color: '' },
    searchingTasks: false,
    searchedTasks: [],
    drawerOpen: false,
    newTask: { title: '', description: '', status: '', subtasks: [] },
    selectedBoard: undefined,
    archivedTask: [],
  }),

  getters: {
    taskByColumn: (state) => (column: string) =>
      state.selectedBoard?.tasks.filter((task) => task.status._id === column),
    columnByColumn: (state) => (column: string) =>
      state.selectedBoard?.column.filter((c) => c._id === column),
    searchedTask: (state) => (column: string) =>
      state.searchedTasks.filter((t) => t.status._id === column),
    column: (state) =>
      state.selectedBoard?.column.map((c) => ({
        ...c,
        name: c.name[0].toUpperCase().concat(c.name.slice(1)),
      })) || [],
  },

  actions: {
    async createBoard(payload: { title: string; description: string }) {
      const postBoard = await api.post(`/`, payload);
      await this.fetchBoards();
      return postBoard;
    },

    async getBoard(id: string) {
      const getBoard = await api.get(`/board/${id}`);
      this.selectedBoard = getBoard.data;
    },

    async asignTaskToUser(payload: { asginedTo: string }) {
      const asign = await api.post(`/board/${this.selectedBoard?._id}/task/${this.selectedTaskId}`, payload);
      if (asign.data.tasks !== undefined && this.selectedBoard?.tasks !== undefined) {
        this.selectedBoard.tasks = asign.data.tasks;
      }
      return asign;
    },

    async changeStatus(task: Task, status: Status) {
      const prevStatus = task.status;
      task.status = status;
      try {
        await api.post(`/task/update/${task._id}`, { task });
      } catch {
        task.status = prevStatus;
      }
    },

    async fetchBoards() {
      const getBoards = await api.get(`/boards`);
      this.boards = getBoards.data;
    },

    async usersWithAccess(email: string) {
      const res = await api.get(`/access/user/${this.selectedBoard?._id}?email=${email}`);
      return res;
    },

    async createColumn(payload: { name: string; color: string }) {
      const newColumn = await api.post(`/column/${this.selectedBoard?._id}`, payload);
      if (newColumn.data.column && this.selectedBoard?.column !== undefined) {
        this.selectedBoard.column = newColumn.data.column;
      }
      return newColumn;
    },

    async createTask(payload: { title: string }) {
      const newTask = await api.post(`/task/${this.selectedBoard?._id}`, payload);
      if (newTask.data.tasks && this.selectedBoard?.tasks !== undefined) {
        this.selectedBoard.tasks = newTask.data.tasks;
      }
      return this.selectedBoard?.tasks;
    },

    async editTask(payload: { task: { title: string; description: string; status: { name: string; _id: any }; comments?: { comment: string } } }) {
      const editTask = await api.post(`/task/update/${this.selectedTaskId}`, payload);
      if (editTask.data.tasks && this.selectedBoard?.tasks !== undefined) {
        this.selectedBoard.tasks = editTask.data.tasks;
      }
      return editTask;
    },

    async taskInfo() {
      const response = await api.get(`/task/${this.selectedTaskId}/board/${this.selectedBoard?._id}`);
      if (response.data && this.selectedBoard?.tasks !== undefined) {
        this.selectedTask = response.data;
      }
      return response;
    },

    async asignUserToBoard(payload: AddUsers) {
      const response = await api.post(`/board/${payload.board}/user/${payload.user}`, { role: payload.role });
      return response;
    },

    async asignedTo() {
      const listAccessUsers = await api.get(`/access/user/${this.selectedBoard?._id}`);
      this.usersInBoard = listAccessUsers.data.usersWithAccess ?? [];
      return listAccessUsers;
    },

    async updateComment(payload: { comment: string }) {
      const response = await api.post(`/task/update/comment/${this.selectedTaskId}`, payload);
      if (response.data && this.selectedTask) {
        this.selectedTask = response.data;
      }
      return response;
    },

    async deleteTask() {
      const deleteTask = await api.post(`/task/delete/${this.selectedTaskId}`, null);
      if (deleteTask.data.tasks && this.selectedBoard?.tasks !== undefined) {
        this.selectedBoard.tasks = deleteTask.data.tasks;
      }
      return deleteTask;
    },

    async deleteArchiveTask() {
      const data = await api.post(`/board/${this.selectedBoard?._id}/delete/archived/${this.selectedTaskId}`);
      if (data.data.archivedTasks && this.selectedBoard?.tasks !== undefined) {
        this.archivedTask = data.data.archivedTasks;
      }
    },

    async editColumn(column: any) {
      const editColumn = await api.post(`/board/${this.selectedBoard?._id}/column/${column._id}/edit`, column);
      if (editColumn.data.column && this.selectedBoard?.column !== undefined) {
        this.selectedBoard.column = editColumn.data.column;
      }
    },

    async deleteColumn(columnId: string) {
      const response = await api.post(`/board/${this.selectedBoard?._id}/column/${columnId}`, null);
      if (response.data.column && this.selectedBoard?.column !== undefined) {
        this.selectedBoard.column = response.data.column;
      }
    },

    async selectBoard(board: Board) {
      this.selectedBoard = board;
      this.newTask = { title: '', description: '', status: '', subtasks: [] };
      this.draftTask = { _id: '', title: '', description: '', status: { title: '', color: '', _id: '' }, subtasks: [] };
    },

    async archiveTask(taskId: string) {
      const data = await api.post(`/board/${this.selectedBoard?._id}/archived/${taskId}`);
      if (data.data.tasks && this.selectedBoard?.tasks !== undefined) {
        this.selectedBoard.tasks = data.data.tasks;
      }
    },

    loadDraftColumn(column: Column) {
      this.draftColumn = { _id: column._id, name: column.name, color: column.color };
    },

    loadDraftTask(task: Task) {
      this.draftTask = { _id: task._id, title: task.title, description: task.description, status: task.status, subtasks: task.subtasks };
    },
  },
});
