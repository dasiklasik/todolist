
export type userType = {
    age: number
    childrenCount: number
    name: string
}

type actionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: userType, action: any) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {...state, age: state.age++}
        case 'INCREMENT-CHILDREN-COUNT':
            return {...state, childrenCount: state.childrenCount++}
        case 'CHANGE-NAME':
            return {...state, name: action.newName}
        default:
            return state
    }
}