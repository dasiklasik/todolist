import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
        <button onClick={()=>props.removeTodolist(props.todolistsID)}>X</button>
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
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}

