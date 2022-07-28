import React, {useReducer} from 'react';
import '../app/App.css';
import {Todolist} from '../features/TodolistsList/Todolist/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Container, Grid, IconButton, Paper, Toolbar } from '@mui/material';
import {
    addTodolist,
    changeFilter,
    changeTodolistTitle,
    removeTodolist,
    todolistsReducer
} from "../features/TodolistsList/bll/todolistsReducer";
import {
    removeTask,
    tasksReducer
} from "../features/TodolistsList/bll/tasksReducer";
import {TaskPriorities, TaskStatuses, updateTaskType} from "../api/todolistAPI";


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
        {
            id: todolistID1,
            title: 'What to learn',
            filter: 'all',
            addedDate: '',
            order: 0,
        },
        {
            id: todolistID2,
            title: 'What to buy',
            filter: 'all',
            addedDate: '',
            order: 0,
        },
    ])

    let [tasks, tasksDispatch] = useReducer(tasksReducer, {
        [todolistID1]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                order: 0,
                todoListId: todolistID1,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed, order: 0, todoListId: todolistID1, description: '',
                priority: TaskPriorities.Low, startDate: '', deadline: '', addedDate: '',
            },
            {
                id: v1(), title: "ReactJS", status: TaskStatuses.New, order: 0, todoListId: todolistID1, description: '',
                priority: TaskPriorities.Low, startDate: '', deadline: '', addedDate: '',
            },
            {
                id: v1(), title: "Rest API", status: TaskStatuses.New, order: 0, todoListId: todolistID1, description: '',
                priority: TaskPriorities.Low, startDate: '', deadline: '', addedDate: '',
            },
            {
                id: v1(), title: "GraphQL", status: TaskStatuses.New, order: 0, todoListId: todolistID1, description: '',
                priority: TaskPriorities.Low, startDate: '', deadline: '', addedDate: '',
            },
        ],
        [todolistID2]: [
            {
                id: v1(),
                title: "HTML&CSS2",
                status: TaskStatuses.Completed,
                order: 0,
                todoListId: todolistID1,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: v1(), title: "JS2", status: TaskStatuses.Completed, order: 0, todoListId: todolistID1, description: '',
                priority: TaskPriorities.Low, startDate: '', deadline: '', addedDate: '',
            },
            {
                id: v1(), title: "ReactJS2", status: TaskStatuses.New, order: 0, todoListId: todolistID1, description: '',
                priority: TaskPriorities.Low, startDate: '', deadline: '', addedDate: '',
            },
            {
                id: v1(), title: "Rest API2", status: TaskStatuses.New, order: 0, todoListId: todolistID1, description: '',
                priority: TaskPriorities.Low, startDate: '', deadline: '', addedDate: '',
            },
            {
                id: v1(), title: "GraphQL2", status: TaskStatuses.New, order: 0, todoListId: todolistID1, description: '',
                priority: TaskPriorities.Low, startDate: '', deadline: '', addedDate: '',
            },
        ]
    })


    const removeTodolistInner = (todolistsID: string) => {
        todolistsDispatch(removeTodolist(todolistsID))
    }

    function deleteTask(todolistsID: string, id: string) {
        tasksDispatch(removeTask(todolistsID, id))
    }

    function addTask(todolistsID: string, title: string) {
        // tasksDispatch(addTaskAC(todolistsID, title))
    }

    // function changeStatus(todolistsID: string, taskId: string, status: TaskStatuses) {
    //    tasksDispatch(changeTaskStatusAC(todolistsID, taskId, status))
    // }
    function changeStatus(todolistsID: string, taskId: string, task: updateTaskType) {

    }

    function changeFilterInner(value: FilterValuesType, todolistsID: string) {
        todolistsDispatch(changeFilter(todolistsID, value))
    }

    const addTodolistInner = (title: string) => {
        let newID = v1();
        // todolistsDispatch(addTodolist(newID, title))
        // tasksDispatch(addTasksArrayAC(newID))
    }

    const changeTaskTitle = (todolistID: string, taskId: string, task: updateTaskType) => {
        // tasksDispatch(changeTaskTitleAC(todolistID, taskId, value))
    }

    const changeTodolistTitleInner = (todolistID: string, title: string) => {
        todolistsDispatch(changeTodolistTitle(todolistID, title))
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
                    <AddItemForm addItem={addTodolistInner}/>
                </Grid>
                <div className={'todolists'}>
                    {todolists.map((m) => {
                        let tasksForTodolist = tasks[m.id];
                        if (m.filter === "active") {
                            tasksForTodolist = tasks[m.id].filter(t => t.status === TaskStatuses.New);
                        }
                        if (m.filter === "completed") {
                            tasksForTodolist = tasks[m.id].filter(t => t.status === TaskStatuses.Completed);
                        }
                        return (
                            <Grid container>
                                <Paper style={{padding: "20px",}} key={m.id}>
                                    <Todolist
                                        key={m.id}
                                        title={m.title}
                                        todolistID={m.id}
                                        tasks={tasksForTodolist}
                                        removeTask={deleteTask}
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

