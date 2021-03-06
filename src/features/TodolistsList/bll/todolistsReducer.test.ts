import {v1} from "uuid"
import {
    changeFilter,
    changeTodolistTitle,
    FilterValuesType,
    removeTodolist,
    TODOLIST_TYPES,
    TodolistDomainType,
    todolistsReducer
} from "./todolistsReducer";


let todolistId1 = v1()
let todolistId2 = v1()

let startState: Array<TodolistDomainType>;

beforeEach(() => {
    return startState = [
        {
            id: todolistId1,
            title: 'What to learn',
            filter: 'all',
            addedDate: '',
            order: 0,
            entityStatus: 'idle',
        },
        {
            id: todolistId2,
            title: 'What to buy',
            filter: 'all',
            addedDate: '',
            order: 0,
            entityStatus: 'idle',
        },
    ]
})

test('correct todolist should be removed', () => {


    const action = removeTodolist(todolistId1)

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)

})


test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";


    const action = changeTodolistTitle(todolistId2, newTodolistTitle)

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";


    const action = changeFilter(todolistId2, newFilter)

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('test should change entity status', () => {
    const endState = todolistsReducer(startState,
        {type: TODOLIST_TYPES.SET_ENTITY_STATUS, id: todolistId1, status: 'loading'})

    expect(endState[0].entityStatus).toBe('loading')
})


