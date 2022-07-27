import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolistAPI";
import {Dispatch} from "redux";

export let todolistID1 = v1();
export let todolistID2 = v1();


enum TODOLIST_TYPES {
    REMOVE_TODOLIST = 'REMOVE_TODOLIST',
    ADD_TODOLIST = 'ADD_TODOLIST',
    CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE',
    CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER',
    SET_TODOLISTS = 'SET_TODOLISTS',
}

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed";

export type changeFilterType = ReturnType<typeof changeFilter>
export type removeTodolistType = ReturnType<typeof removeTodolist>
export type addTodolistType = ReturnType<typeof addTodolist>
export type changeTodolistTitleType = ReturnType<typeof changeTodolistTitle>
export type setTodolistType = ReturnType<typeof setTodolists>

type actionType =
    changeFilterType
    | removeTodolistType
    | addTodolistType
    | changeTodolistTitleType | setTodolistType


const initialState: Array<TodolistDomainType> = []


export const todolistsReducer = (state = initialState, action: actionType): Array<TodolistDomainType> => {
    let copyState = [...state]
    switch (action.type) {
        case TODOLIST_TYPES.REMOVE_TODOLIST:
            return copyState.filter(t => t.id !== action.id)
        case TODOLIST_TYPES.ADD_TODOLIST:
            return [{...action.todolist, filter: 'all'}, ...copyState]
        case TODOLIST_TYPES.CHANGE_TODOLIST_TITLE:
            return copyState.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case TODOLIST_TYPES.CHANGE_TODOLIST_FILTER:
            return copyState.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        case TODOLIST_TYPES.SET_TODOLISTS:
            return action.todolists.map(tl => {
                return {...tl, filter: 'all'}
            })
        default:
            return state
    }
}

export const removeTodolist = (id: string) => {
    return {
        type: TODOLIST_TYPES.REMOVE_TODOLIST as const,
        id
    }
}

export const addTodolist = (todolist: TodolistType) => {
    return {
        type: TODOLIST_TYPES.ADD_TODOLIST as const,
        todolist,
    }
}

export const changeTodolistTitle = (id: string, title: string) => {
    return {
        type: TODOLIST_TYPES.CHANGE_TODOLIST_TITLE as const,
        id,
        title
    }
}

export const changeFilter = (id: string, filter: FilterValuesType) => {
    return {
        type: TODOLIST_TYPES.CHANGE_TODOLIST_FILTER as const,
        id,
        filter
    }
}

export const setTodolists = (todolists: Array<TodolistType>) => {
    return {
        type: TODOLIST_TYPES.SET_TODOLISTS as const,
        todolists,
    }
}

export const fetchTodolists = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolist()
        .then(response => {
            dispatch(setTodolists(response))
        })
}

export const removeTodolistThunk = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistId)
        .then(response => {
            if(response.resultCode === 0) {
                dispatch(removeTodolist(todolistId))
            }
        })
}

export const addTodolistThunk = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title)
        .then(response => {
            dispatch(addTodolist(response.data.item))
        })
}

export const changeTodolistTitleThunk = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolistTitle(todolistId, title)
        .then(response => {
            if(response.resultCode === 0) {
                dispatch(changeTodolistTitle(todolistId, title))
            }
        })
}
