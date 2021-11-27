import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {Container, Grid, Paper, Toolbar} from '@material-ui/core';
import {IconButton} from "@material-ui/core";
import {Menu} from "@material-ui/core";
import {AppBar} from "@material-ui/core";
import MenuIcon from '@mui/icons-material/Menu';
// import {MenuIcon}  from "@material-ui/core"
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';


export type FilterValuesType = "all" | "active" | "completed";
type todolistsType = { id: string, title: string, filter: FilterValuesType }

type TasksType = { [key: string]: Array<{ id: string, title: string, isDone: boolean }> }

function App() {


    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
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
    });

    const removeTodolist = (todolistsID: string) => {
        let currentTodolist = todolists.filter(f => f.id !== todolistsID);
        if (currentTodolist) {
            setTodolists(currentTodolist)
        }
        console.log(todolistsID)
    }

    function removeTask(todolistsID: string, id: string) {

        setTasks({...tasks, [todolistsID]: tasks[todolistsID].filter(t => t.id != id)})
    }

    function addTask(todolistsID: string, title: string) {

        let task = {id: v1(), title: title, isDone: false};

        setTasks({...tasks, [todolistsID]: [...tasks[todolistsID], task]})
    }

    function changeStatus(todolistsID: string, taskId: string, isDone: boolean) {


        setTasks({...tasks, [todolistsID]: tasks[todolistsID].map(t => t.id === taskId ? {...t, isDone} : t)})
    }


    function changeFilter(value: FilterValuesType, todolistsID: string) {
        let currentTodolist = todolists.find(f => f.id === todolistsID);
        if (currentTodolist) {
            currentTodolist.filter = value;
            setTodolists([...todolists])
        }

    }

    const addTodolist = (title: string) => {

        let newID = v1();
        setTodolists([...todolists, {id: newID, title, filter: 'all'}])
        setTasks({...tasks, [newID]: []})
    }

    const changeTaskTitle = (todolistID: string, value: string, taskId: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, title: value} : t)})
    }

    const changeTodolistTitle = (todolistID: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, title} : tl))
    }

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        {/*<Menu open={false} />*/}
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ paddingTop: '20px'}}>
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

export default App;
