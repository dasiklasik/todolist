
export enum APP_TYPES {
    SET_STATUS= "APP/SET_STATUS",
    SET_ERROR = "APP/SET_ERROR",
}

const initialState: initialStateType = {
    status: "idle",
    error: null
}

export const appReducer = (state = initialState, action: actionType): initialStateType => {
    switch (action.type) {
        case APP_TYPES.SET_STATUS:
            return {...state, status: action.status}
        case APP_TYPES.SET_ERROR:
            return {...state, error: action.error}
        default: return state
    }
}

//actions
export const setError = (error: string | null) => ({type: APP_TYPES.SET_ERROR, error} as const)
export const setStatus = (status: requestStatusType) => ({type: APP_TYPES.SET_STATUS, status} as const)


//types
export type setErrorType = ReturnType<typeof setError>
export type setStatusType = ReturnType<typeof setStatus>

export type requestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type actionType = setStatusType | setErrorType
type initialStateType = {
    status: requestStatusType
    error: string | null
}