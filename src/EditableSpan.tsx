import React from "react";

type editableSpanPropsType = {
    title: string
}
export const EditableSpan = ({title, ...props}: editableSpanPropsType) => {
    return (
        <span>{title}</span>
    )
}