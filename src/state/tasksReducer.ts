
import {v1} from "uuid";
import { TasksType } from "../AppWithReducers";
import {todolistsReducer} from "./todolistsReducer";

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type addTasksArrayACType = ReturnType<typeof addTasksArrayAC>

type actionType = removeTaskACType | addTaskACType | changeTaskStatusACType |
    changeTaskTitleACType | addTasksArrayACType

export const tasksReducer = (state: TasksType, action: actionType): TasksType => {
    let copyState = {...state}
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...copyState, [action.todolistsId]:
                    copyState[action.todolistsId].filter(t => t.id !== action.taskId)
            }
        }
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {...copyState, [action.todolistId]: [newTask,...copyState[action.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {...copyState, [action.todolistId]:
                    copyState[action.todolistId].map(t => t.id === action.taskId ? {...t, isDone: action.status} : t)}

        }
        case 'CHANGE-TASK-TITLE': {
            return {...copyState, [action.todolistId]: copyState[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)}
        }
        case 'ADD-TASKS-ARRAY': {
            return {...copyState, [action.todolistId]: []}
        }
        default: {
            return copyState
        }
    }
}

export const removeTaskAC = (todolistsId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK' as const,
        todolistsId,
        taskId
    }
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK' as const,
        todolistId,
        title
    }
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, status: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS' as const,
        todolistId,
        taskId,
        status
    }
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE' as const,
        todolistId,
        taskId,
        title
    }
}

export const addTasksArrayAC = (todolistId: string) => {
    return {
        type: 'ADD-TASKS-ARRAY' as const,
        todolistId
    }
}