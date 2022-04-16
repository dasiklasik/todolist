import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import { TaskType } from "./Todolist";

type TaskPropsType = {
    removeTask: (todolistsID: string, taskId: string) => void
    todolistsID: string
    changeTaskStatus: (todolistsID: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistID: string, value: string, taskId: string) => void
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {

    const {
        removeTask,
        todolistsID,
        changeTaskStatus,
        changeTaskTitle,
        task
    } = props

    const onClickHandler = useCallback(() => removeTask(todolistsID, task.id)
        , [removeTask, task.id, todolistsID])
    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todolistsID, task.id, e.currentTarget.checked);
    }, [task.id, todolistsID, changeTaskStatus])

    const onChangeTitleHandler = useCallback((value: string) => {
        changeTaskTitle(todolistsID, value, task.id);
    }, [changeTaskTitle, todolistsID, task.id])

    return <li key={task.id} className={task.isDone ? "is-done" : ""}>
        <Checkbox
            onChange={onChangeStatusHandler}
            checked={task.isDone}/>
        <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
        <IconButton aria-label="delete" size={'small'} onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </li>
})