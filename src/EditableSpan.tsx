import React, {useState, KeyboardEvent, ChangeEvent, useCallback} from "react";
import {TextField} from "@material-ui/core";

type editableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}
export const EditableSpan = React.memo((props: editableSpanPropsType) => {

    const [editMode, setEditmode] = useState(false)
    const [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditmode(true)
        setTitle(props.title)
    }

    const activateViewMode = useCallback(() => {
        setEditmode(false)
        props.onChange(title)
    }, [props.onChange, setEditmode, title])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }, [setTitle])

    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setEditmode(false)
            props.onChange(title)
        }
    }

    return (

        editMode ? <TextField onChange={onChangeHandler}
                              value={title} onBlur={activateViewMode}
                              autoFocus
            onKeyPress={onEnterHandler}/> :
            <span onDoubleClick={activateEditMode}>{props.title}</span>

    )
})