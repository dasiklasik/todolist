import React, {useCallback, useEffect} from 'react';
import '../App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "../AddItemForm";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Container, Grid, IconButton, Paper, Toolbar } from '@mui/material';
import {
    addTodolist,
    changeFilter,
    changeTodolistTitle, fetchTodolists,
    FilterValuesType,
    removeTodolist, TodolistDomainType,
} from "../state/todolistsReducer";
import {
    addTaskAC,
    addTasksArrayAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksType,
} from "../state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {reducerType} from "../state/store";
import {TaskStatuses, todolistAPI, TodolistType} from "../api/todolistAPI";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";


export function AppWithRedux() {


    let dispatch = useDispatch<ThunkDispatch<reducerType, void, AnyAction>>();

    const tasks = useSelector<reducerType, TasksType>(state => state.tasks)
    const todolists = useSelector<reducerType, Array<TodolistDomainType>>(state => state.todolists)


    useEffect(() => {
        dispatch(fetchTodolists())
    }, [])


    const removeTodolistInner = useCallback((todolistID: string) => {
        dispatch(removeTodolist(todolistID))
    }, [dispatch])

    const removeTask = useCallback((todolistID: string, id: string) => {
        dispatch(removeTaskAC(todolistID, id))
    }, [dispatch])

    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title))
    }, [dispatch])

    const changeStatus = useCallback((todolistID: string, taskId: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusAC(todolistID, taskId, status))
    }, [dispatch])


    const setFilter = useCallback((value: FilterValuesType, todolistID: string) => {
            dispatch(changeFilter(todolistID, value))
        }, [dispatch])

    const addNewTodolist = useCallback((title: string) => {
        let newID = v1();
        dispatch(addTodolist(newID, title))
        dispatch(addTasksArrayAC(newID))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistID: string, value: string, taskId: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskId, value))
    }, [dispatch])

    const changeOldTodolistTitle = useCallback((todolistID: string, title: string) => {
        dispatch(changeTodolistTitle(todolistID, title))
    }, [dispatch])



    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container fixed>
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
                                    removeTodolist={removeTodolistInner}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeOldTodolistTitle}
                                />
                            </Paper>
                        )
                    })}

                </div>
            </Container>
        </div>
    );
}

