import {v1} from "uuid";
import {FilterValuesType, todolistsType} from "../App";

export type changeFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type removeTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type addTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

export type changeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

type actionType =
    changeFilterActionType
    | removeTodolistActionType
    | addTodolistActionType
    | changeTodolistTitleActionType


export const removeTodolistActionCreator = (id: string): removeTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST' as const,
        id
    }
}

export const addTodolistActionCreator = (title: string): addTodolistActionType => {
    return {
        type: 'ADD-TODOLIST' as const,
        title
    }
}

export const changeTodolistTitleActionCreator = (id: string, title: string): changeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id,
        title
    }
}

export const changeFilterActionCreator = (id: string, filter: FilterValuesType): changeFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id,
        filter
    }
}

export const todolistsReducer = (state: Array<todolistsType>, action: actionType): Array<todolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(t => t.id !== action.id)]
        case 'ADD-TODOLIST':
            let newId = v1()
            return [...state, {id: newId, title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        default:
            return {...state}
    }
}