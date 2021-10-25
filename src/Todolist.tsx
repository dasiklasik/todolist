import React, {ChangeEvent, KeyboardEvent, useState, Dispatch, SetStateAction} from 'react';
import {TaskType} from "./App";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (filterValue: FilterValuesType) => void
    addTask: (value: string) => void
}

const TodoList = (props: TodoListPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('');

    const liJSXElement = props.tasks.map(task => {
        const removeTask = () => {props.removeTask(task.id)}
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    } )

    const addTask = () => {
        if (newTaskTitle) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    const addNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const addKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter')  {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    const filterAll = () => props.changeFilter('all')
    const filterActive = () => props.changeFilter('active')
    const filterCompleted = () => props.changeFilter('completed')



    return(
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={addNewTaskTitle}
                       onKeyPress={addKeyPress}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {liJSXElement}
            </ul>
            <div>
                <button onClick={filterAll}>All</button>
                <button onClick={filterActive}>Active</button>
                <button onClick={filterCompleted}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;