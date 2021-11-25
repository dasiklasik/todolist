import {actionType, calculator, sum} from "./reducer";


test('sum', () => {
    let num1 = 10
    let num2 =  12

    const res = sum(num1, num2)

    expect(res).toBe(22)
})

test('sum calculator', () => {
    let state = 1
    let action: actionType = {
        type: "SUM",
        number: 2
    }

    const res = calculator(state, action)

    expect(res).toBe(3)
})