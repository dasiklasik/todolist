import axios from "axios";

//api
const settings = {
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {'API-KEY': '2fb059af-d1d5-4375-a272-54a52b66ff13'}
}

const instance = axios.create(settings)

export const todolistAPI = {
    getTodolist: () => {
        return instance.get<Array<TodolistType>>(`todo-lists`)
            .then(response => response.data)
    },
    createTodolist: (title: string) => {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
            .then(response => response.data)
    },
    deleteTodolist: (todolistId: string) => {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
            .then(response => response.data)
    },
    updateTodolistTitle: (todolistId: string, title: string) => {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
            .then(response => response.data)
    },
    getTasks: (todolistId: string, pageSize = 10, pageNumber = 1) => {
        return instance.get<getTasksType>(`/todo-lists/${todolistId}/tasks?count=${pageSize}&page=${pageNumber}`)
            .then(response => response.data)
    },
    createTask: (todolistId: string, taskTitle: string) => {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`,
            {todolistId, title: taskTitle})
            .then(response => response.data)
    },
    deleteTask: (todolistId: string, taskId: string) => {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
            .then(response => response.data)
    },
    updateTask: (todolistId: string, taskId: string, task: updateTaskType) => {
        return instance.put<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, task)
            .then(response => {
                return response.data
            })
            .catch(error => error)
    },
}


//types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}


export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export type TaskType = {
    id: string
    todoListId: string
    order: number
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    addedDate: string
}

type getTasksType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

export type updateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
