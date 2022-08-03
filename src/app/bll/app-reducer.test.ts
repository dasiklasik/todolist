import {APP_TYPES, appReducer} from "./app-reducer";

type initialStateType = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}
let state: initialStateType;

beforeEach(() => {
    return state = {
        status: "idle",
        error: 'null',
    }
})

test('test should set error', () => {
    const endState = appReducer(state, {type: APP_TYPES.SET_ERROR, error: 'i am a error'})

    expect(endState.status).toBe('idle')
    expect(endState.error).toBe('i am a error')
})

test('test should change status', () => {
    const endState = appReducer(state, {type: APP_TYPES.SET_STATUS, status: 'loading'})

    expect(endState.error).toBe(null)
    expect(endState.status).toBe('loading')
})