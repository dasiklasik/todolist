
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
export const setAppError = (error: string | null) => ({type: APP_TYPES.SET_ERROR, error} as const)
export const setAppStatus = (status: requestStatusType) => ({type: APP_TYPES.SET_STATUS, status} as const)


//types
export type setAppErrorType = ReturnType<typeof setAppError>
export type setAppStatusType = ReturnType<typeof setAppStatus>

export type requestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type actionType = setAppStatusType | setAppErrorType
type initialStateType = {
    status: requestStatusType
    error: string | null
}