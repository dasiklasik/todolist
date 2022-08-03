import {TaskType, todolistAPI, updateTaskType} from "../../../api/todolistAPI";
import {Dispatch} from "redux";
import {addTodolistType, removeTodolistType, setTodolistsType, TODOLIST_TYPES} from "./todolistsReducer";
import {setAppError, setAppErrorType, setAppStatus, setAppStatusType} from "../../../app/bll/app-reducer";


enum TASKS_TYPES {
    REMOVE_TASK = 'REMOVE_TASK',
    ADD_TASK = 'ADD_TASK',
    SET_TASKS = 'SET_TASKS',
    CHANGE_TASK = 'CHANGE_TASK',
}

const initialState: TasksType = {}

export const tasksReducer = (state = initialState, action: actionType): TasksType => {
    switch (action.type) {
        case TASKS_TYPES.REMOVE_TASK:
            return {
                ...state, [action.todolistId]:
                    state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case TASKS_TYPES.ADD_TASK:
            return {...state, [action.task.todoListId]: [...state[action.task.todoListId], action.task]}
        case TODOLIST_TYPES.SET_TODOLISTS: {
            let copyState = {...state}
            action.todolists.forEach((tl) => copyState[tl.id] = [])
            return copyState;
        }
        case TASKS_TYPES.SET_TASKS:
            return {...state, [action.todolistId]: action.tasks}
        case TODOLIST_TYPES.ADD_TODOLIST:
            return {...state, [action.todolist.id]: []}
        case TASKS_TYPES.CHANGE_TASK:
            return {
                ...state, [action.task.todoListId]:
                    state[action.task.todoListId].map(t => t.id === action.task.id ? action.task : t)
            }
        case TODOLIST_TYPES.REMOVE_TODOLIST: {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state
    }
}


//actions
export const removeTask = (todolistId: string, taskId: string) =>
    ({type: TASKS_TYPES.REMOVE_TASK, todolistId, taskId} as const)
export const addTask = (task: TaskType) =>
    ({type: TASKS_TYPES.ADD_TASK, task} as const)
export const setTasks = (tasks: TaskType[], todolistId: string) =>
    ({type: TASKS_TYPES.SET_TASKS, tasks, todolistId} as const)
export const changeTask = (task: TaskType) =>
    ({type: TASKS_TYPES.CHANGE_TASK, task} as const)


//thunks
export const fetchTasks = (todolistId: string) => (dispatch: Dispatch<actionType>) => {
    dispatch(setAppStatus('loading'))
    todolistAPI.getTasks(todolistId)
        .then(response => {
            dispatch(setTasks(response.items, todolistId))
            dispatch(setAppStatus('succeeded'))
        })
}
export const removeTaskThunk = (todolistId: string, taskId: string) => (dispatch: Dispatch<actionType>) => {
    todolistAPI.deleteTask(todolistId, taskId)
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(removeTask(todolistId, taskId))
            }
        })
}
export const addTaskThunk = (todolistId: string, title: string) => (dispatch: Dispatch<actionType | setAppErrorType>) => {
    dispatch(setAppStatus('loading'))
    todolistAPI.createTask(todolistId, title)
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(addTask(response.data.item))
                dispatch(setAppStatus('succeeded'))
            } else {
                dispatch(setAppStatus('failed'))
                if (response.messages.length) {
                    dispatch(setAppError(response.messages[0]))
                } else {
                    dispatch(setAppError('Some error occurred'))
                }
            }
        })
}
export const changeTaskThunk = (todolistId: string, taskId: string, task: updateTaskType) =>
    (dispatch: Dispatch<actionType>) => {
        todolistAPI.updateTask(todolistId, taskId, task)
            .then(response => {
                dispatch(changeTask(response.data.item))
            })
    }

//types
type actionType =
    | ReturnType<typeof removeTask>
    | ReturnType<typeof addTask>
    | ReturnType<typeof setTasks>
    | ReturnType<typeof changeTask>
    | setTodolistsType
    | addTodolistType
    | removeTodolistType
    | setAppStatusType


export type TasksType = { [key: string]: Array<TaskType> }
