import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import '../../../app/App.css'
import {Task} from "./Task/Task";
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {TaskStatuses, TaskType, todolistAPI, updateTaskType} from "../../../api/todolistAPI";
import {FilterValuesType, TodolistDomainType} from '../bll/todolistsReducer';
import {useDispatch} from "react-redux";
import {fetchTasks} from "../bll/tasksReducer";
import {reducerType} from "../../../app/bll/store";
import {AnyAction} from "redux";
import {ThunkDispatch} from "redux-thunk";


type PropsType = {
    todolistData: TodolistDomainType
    tasks: Array<TaskType>
    removeTask: (todolistsID: string, taskId: string) => void
    changeFilter: (value: FilterValuesType, todolistsID: string) => void
    addTask: (todolistsID: string, title: string) => void
    changeTaskStatus: (todolistsID: string, taskId: string, task: updateTaskType) => void
    removeTodolist: (todolistsID: string) => void
    changeTaskTitle: (todolistID: string, taskId: string, task: updateTaskType) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = React.memo((props: PropsType) => {

    const dispatch = useDispatch<ThunkDispatch<reducerType, void, AnyAction>>()

    useEffect(() => {
        dispatch(fetchTasks(props.todolistData.id))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(props.todolistData.id, title);
    }, [props.addTask, props.todolistData.id])

    let tasksForTodolist = props.tasks

    if (props.todolistData.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todolistData.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.todolistData.id)
        , [props.todolistData.id, props.changeFilter])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.todolistData.id)
        , [props.todolistData.id, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.todolistData.id)
        , [props.todolistData.id, props.changeFilter])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolistData.id, title)
    }, [props.changeTodolistTitle, props.todolistData.id])

    const removeTodolist = () => props.removeTodolist(props.todolistData.id)

    const disabledItem = props.todolistData.entityStatus === 'loading'

    return <div className={'todolist'}>
        <h3><EditableSpan title={props.todolistData.title} onChange={changeTodolistTitle}/>
            <IconButton disabled={disabledItem} aria-label="delete" size={'small'} onClick={removeTodolist}>
                <Delete/>
            </IconButton>

        </h3>

        <AddItemForm disabled={disabledItem} addItem={addTask}/>
        <ul>
            {

                tasksForTodolist.map(t => <Task
                        task={t}
                        todolistID={props.todolistData.id}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                    />
                )
            }
        </ul>
        <div>
            <Button disabled={disabledItem} variant={props.todolistData.filter === 'all' ? 'outlined' : "text"}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button disabled={disabledItem} variant={props.todolistData.filter === 'active' ? 'outlined' : "text"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button disabled={disabledItem} variant={props.todolistData.filter === 'completed' ? 'outlined' : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})

