import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API'
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {'API-KEY': '2fb059af-d1d5-4375-a272-54a52b66ff13'}
})

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        instance.get(`todo-lists`)
            .then(response => {
                setState(response.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        instance.post('todo-lists', {title: 'New todolist'})
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        instance.delete(`todo-lists/487204aa-051e-4f65-b571-c3fffb9cc2d6`, )
            .then(response => setState(response.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        instance.put(`todo-lists/92313b91-28b5-49d9-8315-d60f5d5347cf`, {title: 'What to watch'})
            .then(response => setState(response.data))

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
