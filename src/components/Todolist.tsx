import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../AddItemForm";
import {EditableSpan} from "./EditableSpan";
import '../App.css'
import {Task} from "./Task";
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {TaskStatuses, TaskType, todolistAPI} from "../api/todolistAPI";
import {FilterValuesType} from '../state/todolistsReducer';
import {useDispatch} from "react-redux";
import {fetchTasks} from "../state/tasksReducer";
import {reducerType} from "../state/store";
import {AnyAction} from "redux";
import {ThunkDispatch} from "redux-thunk";


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistsID: string, taskId: string) => void
    changeFilter: (value: FilterValuesType, todolistsID: string) => void
    addTask: (todolistsID: string, title: string) => void
    changeTaskStatus: (todolistsID: string, taskId: string, status: TaskStatuses) => void
    filter: FilterValuesType
    todolistID: string
    removeTodolist: (todolistsID: string) => void
    changeTaskTitle: (todolistID: string, value: string, taskId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = React.memo((props: PropsType) => {

    const dispatch = useDispatch<ThunkDispatch<reducerType, void, AnyAction>>()

    useEffect(() => {
        dispatch(fetchTasks(props.todolistID))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(props.todolistID, title);
    }, [props.addTask, props.todolistID])

    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.todolistID)
        , [props.todolistID, props.changeFilter])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.todolistID)
        , [props.todolistID, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.todolistID)
        , [props.todolistID, props.changeFilter])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolistID, title)
    }, [props.changeTodolistTitle, props.todolistID])

    const removeTodolist = () => props.removeTodolist(props.todolistID)

    return <div className={'todolist'}>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <IconButton aria-label="delete" size={'small'} onClick={removeTodolist}>
                <Delete/>
            </IconButton>

        </h3>

        <AddItemForm addItem={addTask}/>
        <ul>
            {

                tasksForTodolist.map(t => <Task
                        task={t}
                        todolistID={props.todolistID}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                    />
                )
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : "text"}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : "text"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})

