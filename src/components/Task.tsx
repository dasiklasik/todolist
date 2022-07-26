import {Delete} from "@mui/icons-material";
import {Checkbox, IconButton} from "@mui/material";
import React, {ChangeEvent, useCallback} from "react";
import {TaskStatuses, TaskType} from "../api/todolistAPI";
import {EditableSpan} from "./EditableSpan";

type TaskPropsType = {
    removeTask: (todolistsID: string, taskId: string) => void
    todolistID: string
    changeTaskStatus: (todolistsID: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistID: string, value: string, taskId: string) => void
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {

    const {
        removeTask,
        todolistID,
        changeTaskStatus,
        changeTaskTitle,
        task
    } = props

    const onClickHandler = useCallback(() => removeTask(todolistID, task.id)
        , [removeTask, task.id, todolistID])
    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let status = TaskStatuses.New
        if (e.currentTarget.checked) status = TaskStatuses.Completed
        changeTaskStatus(todolistID, task.id, status);
    }, [task.id, todolistID, changeTaskStatus])

    const onChangeTitleHandler = useCallback((value: string) => {
        changeTaskTitle(todolistID, value, task.id);
    }, [changeTaskTitle, todolistID, task.id])

    return <li key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
        <Checkbox
            onChange={onChangeStatusHandler}
            checked={task.status === TaskStatuses.Completed}/>
        <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
        <IconButton aria-label="delete" size={'small'} onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </li>
})