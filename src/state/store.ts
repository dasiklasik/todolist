import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";

const reducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type reducerType = ReturnType<typeof reducer>

export const store = createStore(reducer);

//@ts-ignore
window.store = store;