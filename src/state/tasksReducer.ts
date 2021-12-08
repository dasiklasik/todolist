import {TasksType} from "../App";
import {v1} from "uuid";

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

type actionType = removeTaskACType | addTaskACType | changeTaskStatusACType | changeTaskTitleACType

export const tasksReducer = (state: TasksType, action: actionType) => {
    let copyState = {...state}
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...copyState, [action.todolistsId]:
                    copyState[action.todolistsId].filter(t => t.id !== action.taskId)
            }
        }
        case "ADD-TASK": {
            let newTask = {d: v1(), title: action.title, isDone: false}
            return {...copyState, [action.todolistId]: {...copyState[action.todolistId], newTask}}
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...copyState, [action.todolistId]: copyState[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, isDone: action.status} : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {...copyState, [action.todolistId]: copyState[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)}
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

export const changeTaskStatusAC = (todolistId: string, taskId: string, status: string) => {
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