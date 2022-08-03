import {todolistAPI, TodolistType} from "../../../api/todolistAPI";
import {Dispatch} from "redux";
import {requestStatusType, setAppError, setAppErrorType, setAppStatus, setAppStatusType} from "../../../app/bll/app-reducer";


export enum TODOLIST_TYPES {
    REMOVE_TODOLIST = 'REMOVE_TODOLIST',
    ADD_TODOLIST = 'ADD_TODOLIST',
    CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE',
    CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER',
    SET_TODOLISTS = 'SET_TODOLISTS',
    SET_ENTITY_STATUS = 'SET_ENTITY_STATUS',
}


const initialState: Array<TodolistDomainType> = []


export const todolistsReducer = (state = initialState, action: actionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case TODOLIST_TYPES.REMOVE_TODOLIST:
            return state.filter(t => t.id !== action.id)
        case TODOLIST_TYPES.ADD_TODOLIST:
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case TODOLIST_TYPES.CHANGE_TODOLIST_TITLE:
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case TODOLIST_TYPES.CHANGE_TODOLIST_FILTER:
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        case TODOLIST_TYPES.SET_TODOLISTS:
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case TODOLIST_TYPES.SET_ENTITY_STATUS:
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        default:
            return state
    }
}


//actions
export const removeTodolist = (id: string) =>
    ({type: TODOLIST_TYPES.REMOVE_TODOLIST, id} as const)
export const addTodolist = (todolist: TodolistType) =>
    ({type: TODOLIST_TYPES.ADD_TODOLIST, todolist} as const)
export const changeTodolistTitle = (id: string, title: string) =>
    ({type: TODOLIST_TYPES.CHANGE_TODOLIST_TITLE, id, title} as const)
export const changeFilter = (id: string, filter: FilterValuesType) =>
    ({type: TODOLIST_TYPES.CHANGE_TODOLIST_FILTER, id, filter} as const)
export const setTodolists = (todolists: Array<TodolistType>) =>
    ({type: TODOLIST_TYPES.SET_TODOLISTS, todolists} as const)
export const changeTodolistEntityStatus = (id: string, status: requestStatusType) =>
    ({type: TODOLIST_TYPES.SET_ENTITY_STATUS, id, status} as const)

//thunks
export const fetchTodolists = () => (dispatch: Dispatch<actionType>) => {
    dispatch(setAppStatus('loading'))
    todolistAPI.getTodolist()
        .then(response => {
            dispatch(setTodolists(response))
            dispatch(setAppStatus('succeeded'))
        })
}
export const removeTodolistThunk = (todolistId: string) => (dispatch: Dispatch<actionType>) => {
    dispatch(setAppStatus('loading'))
    dispatch(changeTodolistEntityStatus(todolistId, 'loading'))
    todolistAPI.deleteTodolist(todolistId)
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(removeTodolist(todolistId))
                dispatch(setAppStatus('succeeded'))
            }
        })
}
export const addTodolistThunk = (title: string) => (dispatch: Dispatch<actionType | setAppErrorType>) => {
    dispatch(setAppStatus('loading'))
    todolistAPI.createTodolist(title)
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(addTodolist(response.data.item))
                dispatch(setAppStatus('succeeded'))
            } else {
                if (response.resultCode === 1) {
                    dispatch(setAppError(response.messages[0]))
                } else {
                    dispatch(setAppError('Some error occurred'))
                }
                dispatch(setAppStatus('failed'))
            }
        })
}
export const changeTodolistTitleThunk = (todolistId: string, title: string) => (dispatch: Dispatch<actionType>) => {
    todolistAPI.updateTodolistTitle(todolistId, title)
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(changeTodolistTitle(todolistId, title))
            }
        })
}


//types
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: requestStatusType
}

export type FilterValuesType = "all" | "active" | "completed";

export type setTodolistsType = ReturnType<typeof setTodolists>
export type addTodolistType = ReturnType<typeof addTodolist>
export type removeTodolistType = ReturnType<typeof removeTodolist>

type actionType =
    | ReturnType<typeof changeTodolistTitle>
    | ReturnType<typeof changeFilter>
    | ReturnType<typeof changeTodolistEntityStatus>
    | setTodolistsType
    | addTodolistType
    | removeTodolistType
    | setAppStatusType
