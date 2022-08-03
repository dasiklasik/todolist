import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../../features/TodolistsList/bll/tasksReducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";
import { todolistsReducer} from "../../features/TodolistsList/bll/todolistsReducer";

const reducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
})

export type reducerType = ReturnType<typeof reducer>

export const store = createStore(reducer, applyMiddleware(thunk));

//@ts-ignore
window.store = store;