import {userReducer, userType} from "./user-reducer";

test('only user age should be incremented', () => {
    const startState: userType = {age: 22, childrenCount: 0, name: "Darya" }

    const res = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(res.age).toBe(23)
    expect(res.childrenCount).toBe(0)
})


test('only children count should be incremented', () => {
    const startState: userType = {age: 22, childrenCount: 0, name: "Darya" }

    let res = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(res.childrenCount).toBe(1)
})

test('user reducer should change name of user', () => {
    const startState: userType = {age: 22, childrenCount: 0, name: "Darya" }

    let res = userReducer(startState, {type: 'CHANGE-NAME', newName: 'Vlada'})

    expect(res.name).toBe('Vlada')
})

