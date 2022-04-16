import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@material-ui/core";

type addItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = React.memo((props: addItemFormPropsType) => {
    console.log('addItemForm')
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
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    return (
        <div>
            <TextField value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       // className={error ? "error" : ""}
                       variant="standard"
                       error={!!error}
                       helperText={error}

            />
            <Button variant="contained" onClick={addTask} color={'primary'}>+</Button>
        </div>
    )
})
