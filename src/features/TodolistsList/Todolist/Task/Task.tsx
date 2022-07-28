import {Delete} from "@mui/icons-material";
import {Checkbox, IconButton} from "@mui/material";
import React, {ChangeEvent, useCallback} from "react";
import {TaskStatuses, TaskType, updateTaskType} from "../../../../api/todolistAPI";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";

type TaskPropsType = {
    removeTask: (todolistsID: string, taskId: string) => void
    todolistID: string
    changeTaskStatus: (todolistsID: string, taskId: string, task: updateTaskType) => void
    changeTaskTitle: (todolistID: string, taskId: string, task: updateTaskType) => void
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {

    const {
        removeTask,
        todolistID,
        changeTaskStatus,
        changeTaskTitle,
        task,
    } = props

    const onClickHandler = useCallback(() => removeTask(todolistID, task.id)
        , [removeTask, task.id, todolistID])
    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let status = TaskStatuses.New
        if (e.currentTarget.checked) status = TaskStatuses.Completed
        const taskForUpdate: updateTaskType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status,
            title: task.title,
        }
        changeTaskStatus(todolistID, task.id, taskForUpdate);
    }, [task.id, todolistID, changeTaskStatus])

    const onChangeTitleHandler = useCallback((title: string) => {
        const updateTask: TaskType = {...task, title}
        changeTaskTitle(todolistID, task.id, updateTask);
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