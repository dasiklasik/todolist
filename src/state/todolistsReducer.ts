import {v1} from "uuid";
import {FilterValuesType, todolistsType} from "../App";

export type changeFilterACType = ReturnType<typeof changeFilterAC>

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>

export type addTodolistACType = ReturnType<typeof addTodolistAC>

export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

type actionType =
    changeFilterACType
    | removeTodolistACType
    | addTodolistACType
    | changeTodolistTitleACType




export const todolistsReducer = (state: Array<todolistsType>, action: actionType): Array<todolistsType> => {
    let copyState = [...state]
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return copyState.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            let newId = v1()
            return [...copyState, {id: newId, title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return copyState.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case 'CHANGE-TODOLIST-FILTER':
            return copyState.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        default:
            return copyState
    }
}

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST' as const,
        id
    }
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST' as const,
        title
    }
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id,
        title
    }
}

export const changeFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id,
        filter
    }
}