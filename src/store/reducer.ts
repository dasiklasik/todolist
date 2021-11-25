export const sum = (a: number, b: number) => {
    return a + b
}

export const mult = (a: number, b: number) => {
    return a * b
}

export const sub = (a: number, b: number) => {
    return a - b
}

export const div = (a: number, b: number) => {
    return a / b
}

export type actionType = {
    type: "SUM"
    number: number
}

export const calculator = (state: number, action: actionType) => {
    switch (action.type) {
        case "SUM":
            return state + action.number
        default:
            return state
    }
}