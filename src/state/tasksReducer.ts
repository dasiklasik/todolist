
import {v1} from "uuid";
import { TasksType } from "../components/AppWithReducers";
import {todolistID1, todolistID2} from "./todolistsReducer";

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type addTasksArrayACType = ReturnType<typeof addTasksArrayAC>

type actionType = removeTaskACType | addTaskACType | changeTaskStatusACType |
    changeTaskTitleACType | addTasksArrayACType

const initialState: TasksType = {
    [todolistID1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: "HTML&CSS2", isDone: true},
        {id: v1(), title: "JS2", isDone: true},
        {id: v1(), title: "ReactJS2", isDone: false},
        {id: v1(), title: "Rest API2", isDone: false},
        {id: v1(), title: "GraphQL2", isDone: false},
    ]
}

export const tasksReducer = (state = initialState, action: actionType): TasksType => {
    let copyState = {...state}
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...copyState, [action.payload.todolistId]:
                    copyState[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...copyState, [action.payload.todolistId]: [newTask,...copyState[action.payload.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {...copyState, [action.payload.todolistId]:
                    copyState[action.payload.todolistId].map(t => t.id === action.payload.taskId
                        ? {...t, isDone: action.payload.status} : t)}

        }
        case 'CHANGE-TASK-TITLE': {
            return {...copyState, [action.payload.todolistId]: copyState[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t)}
        }
        case 'ADD-TASKS-ARRAY': {
            return {...copyState, [action.payload.todolistId]: []}
        }
        default: {
            return state
        }
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK' as const,
        payload: {
            todolistId,
            taskId,
        },
    }
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK' as const,
        payload: {
            todolistId,
            title,
        },
    }
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, status: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS' as const,
        payload: {
            todolistId,
            taskId,
            status,
        },
    }
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE' as const,
        payload: {
            todolistId,
            taskId,
            title,
        },
    }
}

export const addTasksArrayAC = (todolistId: string) => {
    return {
        type: 'ADD-TASKS-ARRAY' as const,
        payload: {
            todolistId,
        },
    }
}