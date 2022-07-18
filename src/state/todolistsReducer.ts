import {FilterValuesType, todolistsType} from "../components/App";
import {v1} from "uuid";
export let todolistID1 = v1();
export let todolistID2 = v1();

export type changeFilterACType = ReturnType<typeof changeFilterAC>

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>

export type addTodolistACType = ReturnType<typeof addTodolistAC>

export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

type actionType =
    changeFilterACType
    | removeTodolistACType
    | addTodolistACType
    | changeTodolistTitleACType


const initialState: Array<todolistsType> = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]



export const todolistsReducer = (state = initialState, action: actionType): Array<todolistsType> => {
    let copyState = [...state]
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return copyState.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [...copyState, {id: action.todolistId, title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return copyState.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case 'CHANGE-TODOLIST-FILTER':
            return copyState.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        default:
            return state
    }
}

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST' as const,
        id
    }
}

export const addTodolistAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TODOLIST' as const,
        title,
        todolistId
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