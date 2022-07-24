import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, TaskType, TodolistType} from "../api/todolistAPI";
import {setTodolistType} from "./todolistsReducer";

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type addTasksArrayACType = ReturnType<typeof addTasksArrayAC>
type setTasks = ReturnType<typeof setTasks>

type actionType = removeTaskACType | addTaskACType | changeTaskStatusACType |
    changeTaskTitleACType | addTasksArrayACType | setTodolistType | setTasks


export type TasksType = {[key: string]: Array<TaskType>}

const initialState: TasksType = {}

export const tasksReducer = (state = initialState, action: actionType): TasksType => {
    let copyState = {...state}
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...copyState, [action.payload.todolistId]:
                    copyState[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case "ADD-TASK": {
            let newTask:TaskType = {id: v1(), title: action.payload.title, status: TaskStatuses.New, order: 0,
                todoListId: action.payload.todolistId, description: '',
                priority: TaskPriorities.Low, startDate: '', deadline: '', addedDate: '',}
            return {...copyState, [action.payload.todolistId]: [newTask, ...copyState[action.payload.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS': {

            return {
                ...copyState, [action.payload.todolistId]:
                    copyState[action.payload.todolistId].map(t => t.id === action.payload.taskId
                        ? {...t, status: action.payload.status} : t)
            }

        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...copyState, [action.payload.todolistId]: copyState[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t)
            }
        }
        case 'ADD-TASKS-ARRAY': {
            return {...copyState, [action.payload.todolistId]: []}
        }
        case 'SET_TODOLISTS': {

            action.todolists.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState;
        }
        case 'SET-TASKS': {
            return state
        }
        default: {
            return state
        }
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK' as const,
        payload: {
            todolistId,
            taskId,
        },
    }
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK' as const,
        payload: {
            todolistId,
            title,
        },
    }
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE-TASK-STATUS' as const,
        payload: {
            todolistId,
            taskId,
            status,
        },
    }
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE' as const,
        payload: {
            todolistId,
            taskId,
            title,
        },
    }
}

export const addTasksArrayAC = (todolistId: string) => {
    return {
        type: 'ADD-TASKS-ARRAY' as const,
        payload: {
            todolistId,
        },
    }
}

export const setTasks = (tasks: TaskType) => {
    return {
        type: 'SET-TASKS' as const,
        tasks,
    }
}
