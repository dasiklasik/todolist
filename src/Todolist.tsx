import React, {ChangeEvent, KeyboardEvent, useState, Dispatch, SetStateAction} from 'react';
import {TaskType} from "./App";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (filterValue: FilterValuesType) => void
    addTask: (value: string) => void
    filter: FilterValuesType
    changeTaskStatus: (id: string, newStatus: boolean) => void
}

const TodoList = (props: TodoListPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<boolean>(false)

    const changeCheckbox = (e: ChangeEvent<HTMLInputElement>, task: string) => {props.changeTaskStatus(task, e.currentTarget.checked)}

    const liJSXElement = props.tasks.map(task => {
        const removeTask = () => {props.removeTask(task.id)}
        return (
            <li key={task.id} className={task.isDone ? 'completed-task' : ''}>
                <input type="checkbox" checked={task.isDone} onChange={(e) => changeCheckbox(e, task.id)}/> <span>{task.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    } )

    const addTask = () => {
        const trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle) {
            setError(false)
            props.addTask(trimmedTitle.trim())
        } else {
            setError(true)
        }
        setNewTaskTitle('')
    }

    const addNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTaskTitle(e.currentTarget.value)
    }

    const addKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter')  {
            const trimmedTitle = newTaskTitle.trim()
            if (trimmedTitle) {
                setError(false)
                props.addTask(trimmedTitle.trim())
            } else {
                setError(true)
            }
            setNewTaskTitle('')
        }
    }

    const filterAll = () => props.changeFilter('all')
    const filterActive = () => props.changeFilter('active')
    const filterCompleted = () => props.changeFilter('completed')

    const ActiveFilterButton =  props.filter === 'active' ? 'active-filter' : 'disabled-filter'
    const CompletedFilterButton =  props.filter === 'completed' ? 'active-filter' : 'disabled-filter'
    const AllFilterButton =  props.filter === 'all' ? 'active-filter' : 'disabled-filter'

    const choose = error ? 'error' : ''

    return(
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={addNewTaskTitle}
                       onKeyPress={addKeyPress}
                       className={choose}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {liJSXElement}
            </ul>
            <div>
                <button className={AllFilterButton} onClick={filterAll}>All</button>
                <button className={ActiveFilterButton} onClick={filterActive}>Active</button>
                <button className={CompletedFilterButton} onClick={filterCompleted}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;