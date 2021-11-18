import React, {useState, KeyboardEvent, ChangeEvent} from "react";

type editableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}
export const EditableSpan = ({...props}: editableSpanPropsType) => {

    const [editMode, setEditmode] = useState(false)
    const [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditmode(true)
        setTitle(props.title)
    }

    const activateViewMode = () => {
        setEditmode(false)
        props.onChange(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (

           editMode ? <input onChange={onChangeHandler} value={title} onBlur={activateViewMode} autoFocus/> :
               <span onDoubleClick={activateEditMode}>{props.title}</span>

    )
}