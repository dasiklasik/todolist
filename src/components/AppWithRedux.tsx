import React, {useCallback} from 'react';
import '../App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "../AddItemForm";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Container, Grid, IconButton, Paper, Toolbar } from '@mui/material';
import {
    addTodolist,
    changeFilter,
    changeTodolistTitle,
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
import {TaskStatuses} from "../api/todolistAPI";







export function AppWithRedux() {


    let dispatch = useDispatch();

    const tasks = useSelector<reducerType, TasksType>(state => state.tasks)
    const todolists = useSelector<reducerType, Array<TodolistDomainType>>(state => state.todolists)


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
        debugger
        dispatch(changeTaskStatusAC(todolistID, taskId, status))
    }, [dispatch])


    const changeFilterInner = useCallback((value: FilterValuesType, todolistID: string) => {
            dispatch(changeFilter(todolistID, value))
        }, [dispatch])

    const addTodolistInner = useCallback((title: string) => {
        let newID = v1();
        dispatch(addTodolist(newID, title))
        dispatch(addTasksArrayAC(newID))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistID: string, value: string, taskId: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskId, value))
    }, [dispatch])

    const changeTodolistTitleInner = useCallback((todolistID: string, title: string) => {
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
                    <AddItemForm addItem={addTodolistInner}/>
                </Grid>
                <div className={'todolists'}>
                    {todolists.map((m) => {
                        return (
                            <Grid container>
                                <Paper style={{padding: "20px",}}>
                                    <Todolist
                                        key={m.id}
                                        title={m.title}
                                        todolistsID={m.id}
                                        tasks={tasks[m.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilterInner}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={m.filter}
                                        removeTodolist={removeTodolistInner}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitleInner}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}

                </div>
            </Container>
        </div>
    );
}

