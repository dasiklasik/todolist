import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {reducerType} from "../../app/bll/store";
import {AnyAction} from "redux";
import {addTaskThunk, changeTaskThunk, removeTaskThunk, TasksType} from "./bll/tasksReducer";
import {
    addTodolistThunk,
    changeFilter,
    changeTodolistTitleThunk,
    fetchTodolists,
    FilterValuesType,
    removeTodolistThunk,
    TodolistDomainType
} from "./bll/todolistsReducer";
import React, {useCallback, useEffect} from "react";
import {updateTaskType} from "../../api/todolistAPI";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";

export const TodolistsList = () => {

    let dispatch = useDispatch<ThunkDispatch<reducerType, void, AnyAction>>();

    const tasks = useSelector<reducerType, TasksType>(state => state.tasks)
    const todolists = useSelector<reducerType, Array<TodolistDomainType>>(state => state.todolists)


    useEffect(() => {
        dispatch(fetchTodolists())
    }, [])


    const deleteTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistThunk(todolistId))
    }, [dispatch])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskThunk(todolistId, taskId))
    }, [dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskThunk(todolistId, title))
    }, [dispatch])

    const changeStatus = useCallback((todolistID: string, taskId: string, task: updateTaskType) => {
        dispatch(changeTaskThunk(todolistID, taskId, task))
    }, [dispatch])


    const setFilter = useCallback((value: FilterValuesType, todolistID: string) => {
        dispatch(changeFilter(todolistID, value))
    }, [dispatch])

    const addNewTodolist = useCallback((title: string) => {
        dispatch(addTodolistThunk(title))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistID: string, taskId: string, task: updateTaskType) => {
        dispatch(changeTaskThunk(todolistID, taskId, task))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistID: string, title: string) => {
        dispatch(changeTodolistTitleThunk(todolistID, title))
    }, [dispatch])


    return (
        <>
            <Grid container style={{paddingTop: '20px'}}>
                <AddItemForm addItem={addNewTodolist}/>
            </Grid>
            <div className={'todolists'}>
                {todolists.map((m) => {
                    return (

                        <Paper style={{padding: "20px", marginBottom: '20px'}} key={m.id}>
                            <Todolist
                                key={m.id}
                                title={m.title}
                                todolistID={m.id}
                                tasks={tasks[m.id]}
                                removeTask={removeTask}
                                changeFilter={setFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={m.filter}
                                removeTodolist={deleteTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    )
                })}

            </div>
        </>
    )
}