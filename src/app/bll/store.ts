import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "../../features/TodolistsList/bll/todolistsReducer";
import {tasksReducer} from "../../features/TodolistsList/bll/tasksReducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type reducerType = ReturnType<typeof reducer>

export const store = createStore(reducer, applyMiddleware(thunk));

//@ts-ignore
window.store = store;