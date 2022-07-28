import {todolistAPI, TodolistType} from "../../../api/todolistAPI";
import {Dispatch} from "redux";


export enum TODOLIST_TYPES {
    REMOVE_TODOLIST = 'REMOVE_TODOLIST',
    ADD_TODOLIST = 'ADD_TODOLIST',
    CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE',
    CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER',
    SET_TODOLISTS = 'SET_TODOLISTS',
}


const initialState: Array<TodolistDomainType> = []


export const todolistsReducer = (state = initialState, action: actionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case TODOLIST_TYPES.REMOVE_TODOLIST:
            return state.filter(t => t.id !== action.id)
        case TODOLIST_TYPES.ADD_TODOLIST:
            return [{...action.todolist, filter: 'all'}, ...state]
        case TODOLIST_TYPES.CHANGE_TODOLIST_TITLE:
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case TODOLIST_TYPES.CHANGE_TODOLIST_FILTER:
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        case TODOLIST_TYPES.SET_TODOLISTS:
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
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

//thunks
export const fetchTodolists = () => (dispatch: Dispatch<actionType>) => {
    todolistAPI.getTodolist()
        .then(response => {
            dispatch(setTodolists(response))
        })
}
export const removeTodolistThunk = (todolistId: string) => (dispatch: Dispatch<actionType>) => {
    todolistAPI.deleteTodolist(todolistId)
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(removeTodolist(todolistId))
            }
        })
}
export const addTodolistThunk = (title: string) => (dispatch: Dispatch<actionType>) => {
    todolistAPI.createTodolist(title)
        .then(response => {
            dispatch(addTodolist(response.data.item))
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
}

export type FilterValuesType = "all" | "active" | "completed";

export type setTodolistsType = ReturnType<typeof setTodolists>
export type addTodolistType = ReturnType<typeof addTodolist>
export type removeTodolistType = ReturnType<typeof removeTodolist>

type actionType =
    | ReturnType<typeof changeTodolistTitle>
    | ReturnType<typeof changeFilter>
    | setTodolistsType
    | addTodolistType
    | removeTodolistType
