import React, {useCallback} from 'react';
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
} from "./state/todolistsReducer";
import {
    addTaskAC,
    addTasksArrayAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
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


export type TasksType = { [key: string]: Array<taskItemType> }

export function AppWithRedux() {


    let dispatch = useDispatch();

    const tasks = useSelector<reducerType, TasksType>(state => state.tasks)
    const todolists = useSelector<reducerType, Array<todolistsType>>(state => state.todolists)


    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }, [dispatch])

    const removeTask = useCallback((todolistID: string, id: string) => {
        dispatch(removeTaskAC(todolistID, id))
    }, [dispatch])

    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title))
    }, [dispatch])

    const changeStatus = useCallback((todolistID: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskId, isDone))
    }, [dispatch])


    const changeFilter = useCallback((value: FilterValuesType, todolistID: string) => {
            dispatch(changeFilterAC(todolistID, value))
        }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        let newID = v1();
        dispatch(addTodolistAC(newID, title))
        dispatch(addTasksArrayAC(newID))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistID: string, value: string, taskId: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskId, value))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistID: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistID, title))
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
                    <AddItemForm addItem={addTodolist}/>
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

