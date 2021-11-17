import React, {useState, KeyboardEvent} from "react";

type editableSpanPropsType = {
    title: string
}
export const EditableSpan = ({title, ...props}: editableSpanPropsType) => {

    const [editMode, setEditmode] = useState(false)

    const activateEditMode = () => {
        setEditmode(true)
    }

    const activateViewMode = () => {
        setEditmode(false)
    }

    return (

           editMode ? <input value={title} onBlur={activateViewMode} autoFocus/> : <span onDoubleClick={activateEditMode}>{title}</span>

    )
}