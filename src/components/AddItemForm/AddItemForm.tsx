import {Button, TextField } from "@mui/material";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type addItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}
export const AddItemForm = React.memo(({disabled = false, addItem, ...props}: addItemFormPropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === "Enter") {
            addTask();
        }
    }

    const addTask = () => {
        if (title.trim() !== "") {
            addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    return (
        <div>
            <TextField disabled={disabled} value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                       variant="standard"
                       error={!!error}
                       helperText={error}

            />
            <Button disabled={disabled} variant="contained" onClick={addTask} color={'primary'}>+</Button>
        </div>
    )
})
