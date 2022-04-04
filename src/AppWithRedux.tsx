import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {Container, Grid, Paper, Toolbar} from '@material-ui/core';
import {IconButton} from "@material-ui/core";
import {AppBar} from "@material-ui/core";
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolistsReducer";
import {
    addTaskAC,
    addTasksArrayAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {reducerType} from "./state/store";


export type FilterValuesType = "all" | "active" | "completed";
export type todolistsType = { id: string, title: string, filter: FilterValuesType }

export type taskItemType = {
    id: string,
    title: string,
    isDone: boolean
}

export let todolistID1 = v1();
export let todolistID2 = v1();

export type TasksType = { [key: string]: Array<taskItemType> }

export  function AppWithRedux() {


 let dispatch = useDispatch();

    const tasks = useSelector<reducerType, TasksType>(state => state.tasks)
    const todolists = useSelector<reducerType, Array<todolistsType>>(state => state.todolists)


    const removeTodolist = (todolistsID: string) => {
        dispatch(removeTodolistAC(todolistsID))
    }

    function removeTask(todolistsID: string, id: string) {
        dispatch(removeTaskAC(todolistsID, id))
    }

    function addTask(todolistsID: string, title: string) {
        dispatch(addTaskAC(todolistsID, title))
    }

    function changeStatus(todolistsID: string, taskId: string, isDone: boolean) {
        dispatch(changeTaskStatusAC(todolistsID, taskId, isDone))
    }


    function changeFilter(value: FilterValuesType, todolistsID: string) {
        dispatch(changeFilterAC(todolistsID, value))
    }

    const addTodolist = (title: string) => {
        let newID = v1();
        dispatch(addTodolistAC(newID, title))
        dispatch(addTasksArrayAC(newID))
    }

    const changeTaskTitle = (todolistID: string, value: string, taskId: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskId, value))
    }

    const changeTodolistTitle = (todolistID: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistID, title))
    }

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
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <div className={'todolists'}>
                    {todolists.map((m) => {
                        let tasksForTodolist = tasks[m.id];
                        if (m.filter === "active") {
                            tasksForTodolist = tasks[m.id].filter(t => t.isDone === false);
                        }
                        if (m.filter === "completed") {
                            tasksForTodolist = tasks[m.id].filter(t => t.isDone === true);
                        }
                        return (
                            <Grid container>
                                <Paper style={{padding: "20px",}}>
                                    <Todolist
                                        key={m.id}
                                        title={m.title}
                                        todolistsID={m.id}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={m.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
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

