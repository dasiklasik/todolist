import React, {useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import './App.css'
import {Task} from "./Task";
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistsID: string, taskId: string) => void
    changeFilter: (value: FilterValuesType, todolistsID: string) => void
    addTask: (todolistsID: string, title: string) => void
    changeTaskStatus: (todolistsID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todolistsID: string
    removeTodolist: (todolistsID: string) => void
    changeTaskTitle: (todolistID: string, value: string, taskId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log('Todolist' + props.todolistsID)
    const addTask = useCallback((title: string) => {
        props.addTask(props.todolistsID, title);
    }, [props.addTask, props.todolistsID])

    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.todolistsID)
        , [props.todolistsID, props.changeFilter])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.todolistsID)
        , [props.todolistsID, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.todolistsID)
        , [props.todolistsID, props.changeFilter])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolistsID, title)
    }, [props.changeTodolistTitle, props.todolistsID])

    const removeTodolist = () => props.removeTodolist(props.todolistsID)

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
                        todolistsID={props.todolistsID}
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

