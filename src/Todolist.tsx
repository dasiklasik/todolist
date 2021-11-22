import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import Button from '@material-ui/core/Button';
import {Delete, DeleteForeverTwoTone} from "@material-ui/icons";
import { IconButton } from '@material-ui/core';


type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistsID:string,taskId: string) => void
    changeFilter: (value: FilterValuesType,todolistsID:string) => void
    addTask: (todolistsID:string,title: string) => void
    changeTaskStatus: (todolistsID:string,taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todolistsID:string
    removeTodolist:(todolistsID: string)=>void
    changeTaskTitle: (todolistID: string, value: string, taskId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(props.todolistsID, title);
    }

    const onAllClickHandler = () => props.changeFilter("all", props.todolistsID);
    const onActiveClickHandler = () => props.changeFilter("active",props.todolistsID);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todolistsID);

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.todolistsID, title)
    }

    const removeTodolist = ()=>props.removeTodolist(props.todolistsID)

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <IconButton aria-label="delete" size={'small'} onClick={removeTodolist}>
                <Delete />
            </IconButton>

        </h3>

        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistsID,t.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistsID,t.id, e.currentTarget.checked);
                    }

                    const onChangeTitleHandler = (value: string) => {
                        props.changeTaskTitle(props.todolistsID, value, t.id);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeStatusHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton aria-label="delete" size={'small'} onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                        {/*<Button  color={'secondary'} size={'small'} endIcon={<DeleteForeverTwoTone />}></Button>*/}
                    </li>
                })
            }
        </ul>
        <div>
            <Button  variant={props.filter === 'all' ? 'outlined' : "text"}
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
}

