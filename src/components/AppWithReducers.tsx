import React, {useReducer, useState} from 'react';
import '../App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "../AddItemForm";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Container, Grid, IconButton, Paper, Toolbar } from '@mui/material';
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "../state/todolistsReducer";
import {
    addTaskAC,
    addTasksArrayAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "../state/tasksReducer";


export type FilterValuesType = "all" | "active" | "completed";
export type todolistsType = { id: string, title: string, filter: FilterValuesType }

export type taskItemType = {
    id: string,
    title: string,
    isDone: boolean
}

export type TasksType = { [key: string]: Array<taskItemType> }

export  function AppWithReducers() {


    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, todolistsDispatch] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, tasksDispatch] = useReducer(tasksReducer, {
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
    })


    const removeTodolist = (todolistsID: string) => {
        todolistsDispatch(removeTodolistAC(todolistsID))
    }

    function removeTask(todolistsID: string, id: string) {
        tasksDispatch(removeTaskAC(todolistsID, id))
    }

    function addTask(todolistsID: string, title: string) {
        tasksDispatch(addTaskAC(todolistsID, title))
    }

    function changeStatus(todolistsID: string, taskId: string, isDone: boolean) {
       tasksDispatch(changeTaskStatusAC(todolistsID, taskId, isDone))
    }


    function changeFilter(value: FilterValuesType, todolistsID: string) {
        todolistsDispatch(changeFilterAC(todolistsID, value))
    }

    const addTodolist = (title: string) => {
        let newID = v1();
        todolistsDispatch(addTodolistAC(newID, title))
        tasksDispatch(addTasksArrayAC(newID))
    }

    const changeTaskTitle = (todolistID: string, value: string, taskId: string) => {
        tasksDispatch(changeTaskTitleAC(todolistID, taskId, value))
    }

    const changeTodolistTitle = (todolistID: string, title: string) => {
        todolistsDispatch(changeTodolistTitleAC(todolistID, title))
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

