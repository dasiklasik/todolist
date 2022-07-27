import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, TodolistType, updateTaskType} from "../api/todolistAPI";
import {addTodolistType, setTodolistType} from "./todolistsReducer";
import {Dispatch} from "redux";

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type setTasks = ReturnType<typeof setTasks>
type changeTaskType = ReturnType<typeof changeTask>

type actionType = removeTaskACType | addTaskACType | setTodolistType | setTasks | addTodolistType | changeTaskType


export type TasksType = {[key: string]: Array<TaskType>}

const initialState: TasksType = {}

export const tasksReducer = (state = initialState, action: actionType): TasksType => {
    let copyState = {...state}
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {
                ...copyState, [action.payload.todolistId]:
                    copyState[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case "ADD_TASK": {
            return {...copyState, [action.task.todoListId]: [...copyState[action.task.todoListId], action.task]}
        }
        case 'SET_TODOLISTS': {

            action.todolists.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState;
        }
        case 'SET_TASKS': {
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        case 'ADD_TODOLIST': {
            return {...copyState, [action.todolist.id]: []}
        }
        case 'CHANGE_TASK': {
            return {...copyState, [action.task.todoListId]:
                    copyState[action.task.todoListId].map(t => t.id === action.task.id ? action.task : t)}
        }
        default: {
            return state
        }
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE_TASK' as const,
        payload: {
            todolistId,
            taskId,
        },
    }
}

export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD_TASK' as const,
        task,
    }
}

export const setTasks = (tasks: TaskType[], todolistId: string) => {
    return {
        type: 'SET_TASKS' as const,
        tasks,
        todolistId,
    }
}

export const changeTask = (task: TaskType) => {
    return {
        type: 'CHANGE_TASK' as const,
        task,
    }
}

export const fetchTasks = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId)
        .then(response => dispatch(setTasks(response.items, todolistId)))
}

export const removeTaskThunk = (todolistId: string, taskId: string) =>  (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistId, taskId)
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(removeTaskAC(todolistId, taskId))
            }
        })
}

export const addTaskThunk = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todolistId, title)
        .then(response => {
            if(response.resultCode === 0) {
                dispatch(addTaskAC(response.data.item))
            }
        })
}

export const changeTaskThunk = (todolistId: string, taskId: string, task: updateTaskType) => (dispatch: Dispatch) => {
    todolistAPI.updateTask(todolistId, taskId, task)
        .then(response => {
            dispatch(changeTask(response.data.item))
        })
}
