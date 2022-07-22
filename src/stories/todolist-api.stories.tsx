import React, {ChangeEvent, useEffect, useReducer, useState} from 'react'
import {TaskStatuses, TaskType, todolistAPI, updateTaskType} from "../api/todolistAPI";
import {action} from "@storybook/addon-actions";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then(response => setState(response))

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistTitle, setTodolistTitle] = useState('')

    const createTodolistHandler = () => {
        todolistAPI.createTodolist(todolistTitle)
            .then(response => setState(response))
    }

    const changeTodolistTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistTitle(e.currentTarget.value)
    }

    return <div>

        <input placeholder={'Todolist title'} value={todolistTitle} onChange={changeTodolistTitle}/>
        <button onClick={createTodolistHandler}>Create todolist</button>

        {JSON.stringify(state)}

    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')

    const deleteTodolistHandler = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then(response => setState(response))
    }


    const changeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    return <div>
        <input placeholder={'Todolist id'} value={todolistId} onChange={changeTodolistId}/>
        <button onClick={deleteTodolistHandler}>Delete todolist</button>

        {JSON.stringify(state)}

    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [todolistTitle, setTodolistTitle] = useState('')


    const updateTodolistTitleHandler = () => {
        todolistAPI.updateTodolistTitle(todolistId, todolistTitle)
            .then(response => setState(response))
    }

    const changeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const changeTodolistTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistTitle(e.currentTarget.value)
    }

    return <div>
        <input placeholder={'Todolist id'} value={todolistId} onChange={changeTodolistId}/>
        <input placeholder={'Todolist title'} value={todolistTitle} onChange={changeTodolistTitle}/>
        <button onClick={updateTodolistTitleHandler}>Update todolist's title</button>
        <br/>
        <br/>
        {JSON.stringify(state)}

    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')


    const getTaskHandler = () => {
        todolistAPI.getTasks(todolistId)
            .then(response => setState(response))
    }

    const changeTodolistIdValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    return (
        <div>
            <input placeholder={'Todolist Id'} value={todolistId} onChange={changeTodolistIdValue}/>
            <button onClick={getTaskHandler}>Get tasks</button>

            <br/>
            <br/>

            {JSON.stringify(state)}
        </div>
    )
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskTitle, setTaskTitle] = useState('')


    const createTaskHandler = () => {
        todolistAPI.createTask(todolistId, taskTitle)
            .then(response => setState(response))
    }

    const changeTodolistIdValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const changeTasksTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    return <div>
        <input placeholder={'Todolist Id'} value={todolistId} onChange={changeTodolistIdValue}/>
        <input placeholder={'Task title'} value={taskTitle} onChange={changeTasksTitle}/>
        <button onClick={createTaskHandler}>Create task</button>
        <br/>
        <br/>
        {JSON.stringify(state)}
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')

    const deleteTaskHandler = () => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then(response => setState(response))
    }

    const changeTodolistIdValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const changeTaskIdValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    return <div>
        <input placeholder={'Todolist Id'} value={todolistId} onChange={changeTodolistIdValue}/>
        <input placeholder={'Task Id'} value={taskId} onChange={changeTaskIdValue}/>
        <button onClick={deleteTaskHandler}>Delete task</button>

        <br/>
        <br/>
        {JSON.stringify(state)}

    </div>
}


type taskState = {
    todolistId: string
    taskId: string
    title: string
    desc: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const UpdateTask = ( ) => {
        const [state, setState] = useState<any>(null)


    useEffect(() => {
        const todolistId = '1920a14b-af6b-431c-9ae2-706c609885e7'
        const task: updateTaskType ={
            title: "My edited task",
            status: TaskStatuses.New,
            deadline: "",
            startDate: "",
            priority: 0,
            description: "",
        }
        const taskId = 'ab4f7663-cbe6-4345-a694-6c882fb2d228'
        todolistAPI.updateTask(todolistId, taskId, task)
            .then((data) => {
                console.log(data )
                setState(data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

