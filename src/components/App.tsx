import React, {useState} from 'react';
import '../App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "../AddItemForm";

import MenuIcon from '@mui/icons-material/Menu';
import {AppBar, Container, Grid, IconButton, Paper, Toolbar} from '@mui/material';
import {TaskPriorities, TaskStatuses} from "../api/todolistAPI";
import {FilterValuesType, TodolistDomainType} from "../state/todolistsReducer";
import {TasksType} from '../state/tasksReducer';


function App() {


    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
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

    let [tasks, setTasks] = useState<TasksType>({
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
    });

    const removeTodolist = (todolistsID: string) => {
        let currentTodolist = todolists.filter(f => f.id !== todolistsID);
        if (currentTodolist) {
            setTodolists(currentTodolist)
        }
    }

    function removeTask(todolistsID: string, id: string) {

        setTasks({...tasks, [todolistsID]: tasks[todolistsID].filter(t => t.id != id)})
    }

    function addTask(todolistsID: string, title: string) {
        setTasks({
            ...tasks, [todolistsID]: [...tasks[todolistsID],
                {id: v1(), title: title, status: TaskStatuses.New, order: 0, todoListId: todolistID1, description: '',
                    priority: TaskPriorities.Low, startDate: '', deadline: '', addedDate: '',}]
        })
    }

    function changeStatus(todolistsID: string, taskId: string, status: TaskStatuses) {
        setTasks({...tasks, [todolistsID]: tasks[todolistsID].map(t => t.id === taskId ? {...t, status} : t)})
    }


    function changeFilter(value: FilterValuesType, todolistsID: string) {
        setTodolists(todolists.map(tl => tl.id === todolistsID ? {...tl, filter: value} : tl))
    }

    const addTodolist = (title: string) => {
        let newID = v1();
        setTodolists([...todolists, {id: newID, title, filter: 'all', addedDate: '', order: 0}])
        setTasks({...tasks, [newID]: []})
    }

    const changeTaskTitle = (todolistID: string, value: string, taskId: string) => {
        setTasks({
            ...tasks, [todolistID]:
                tasks[todolistID].map(t => t.id === taskId ? {...t, title: value} : t)
        })
    }

    const changeTodolistTitle = (todolistID: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, title} : tl))
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
                            tasksForTodolist = tasks[m.id].filter(t => t.status === TaskStatuses.New);
                        }
                        if (m.filter === "completed") {
                            tasksForTodolist = tasks[m.id].filter(t => t.status=== TaskStatuses.Completed);
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

export default App;
