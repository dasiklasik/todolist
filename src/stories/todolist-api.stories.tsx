import React, {useEffect, useState} from 'react'
import {taskType, todolistAPI} from "../api/todolistAPI";

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
    useEffect(() => {
        todolistAPI.createTodolist('New Todolist')
            .then(response => setState(response))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '487204aa-051e-4f65-b571-c3fffb9cc2d6'
        todolistAPI.deleteTodolist(todolistId)
            .then(response => setState(response))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'd9eb49db-d843-4d1c-ae0a-492406f23b82'
        todolistAPI.updateTodolistTitle(todolistId, 'Pet\' projects list')
            .then(response => setState(response))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '1920a14b-af6b-431c-9ae2-706c609885e7'
        todolistAPI.getTasks(todolistId)
            .then(response => setState(response))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '1920a14b-af6b-431c-9ae2-706c609885e7'
        todolistAPI.createTask(todolistId, 'React')
            .then(response => setState(response))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '1920a14b-af6b-431c-9ae2-706c609885e7'
        const taskId = 'b3c2d859-45ee-4c65-980b-3dfeb11971cc'
        todolistAPI.deleteTask(todolistId, taskId)
            .then(response => setState(response))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

// export const UpdateTask = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todolistId = '1920a14b-af6b-431c-9ae2-706c609885e7'
//         const taskId = 'b3c2d859-45ee-4c65-980b-3dfeb11971cc'
//         const task: taskType = {
//             priority: 0,
//             order: 0,
//             description: "",
//             status: 0,
//             todoListId: "",
//             addedDate: undefined,
//             completed: false,
//             deadline: undefined,
//             id: "",
//             startDate: undefined,
//             title: "",
//         }
//         todolistAPI.deleteTask(todolistId, taskId)
//             .then(response => setState(response))
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }

