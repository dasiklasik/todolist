import {v1} from "uuid";
import {TodolistType} from "../api/todolistAPI";

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

export type setTodolistType = ReturnType<typeof setTodolist>

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
            return [...copyState, {
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0,
            }]
        case TODOLIST_TYPES.CHANGE_TODOLIST_TITLE:
            return copyState.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case TODOLIST_TYPES.CHANGE_TODOLIST_FILTER:
            return copyState.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        case TODOLIST_TYPES.SET_TODOLISTS:
            // let newTodolists: Array<TodolistDomainType> = action.todolists.map(t => {...t, filter: 'all'})
            // return [... copyState, [...]]
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

export const addTodolist = (todolistId: string, title: string) => {
    return {
        type: TODOLIST_TYPES.ADD_TODOLIST as const,
        title,
        todolistId
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

export const setTodolist = (todolists: Array<TodolistType>) => {
    return {
        type: TODOLIST_TYPES.SET_TODOLISTS as const,
        todolists,
    }
}