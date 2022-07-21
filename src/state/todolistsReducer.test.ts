import { v1 } from "uuid"
import {
    addTodolist, changeFilter,
    changeFilterType, changeTodolistTitle,
    changeTodolistTitleType,
    FilterValuesType,
    removeTodolist, removeTodolistType, TodolistDomainType,
    todolistsReducer
} from "./todolistsReducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistDomainType> =[
        {
            id: todolistId1,
            title: 'What to learn',
            filter: 'all',
            addedDate: '',
            order: 0,
        },
        {
            id: todolistId2,
            title: 'What to buy',
            filter: 'all',
            addedDate: '',
            order: 0,
        },
    ]

    const action: removeTodolistType = removeTodolist(todolistId1)

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)

})

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistDomainType> = [
        {
            id: todolistId1,
            title: 'What to learn',
            filter: 'all',
            addedDate: '',
            order: 0,
        },
        {
            id: todolistId2,
            title: 'What to buy',
            filter: 'all',
            addedDate: '',
            order: 0,
        },
    ]
    let newID = v1()
    const action = addTodolist(newID, newTodolistTitle)

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});


test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistDomainType> = [
        {
            id: todolistId1,
            title: 'What to learn',
            filter: 'all',
            addedDate: '',
            order: 0,
        },
        {
            id: todolistId2,
            title: 'What to buy',
            filter: 'all',
            addedDate: '',
            order: 0,
        },
    ]

    const action: changeTodolistTitleType  = changeTodolistTitle(todolistId2, newTodolistTitle)

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodolistDomainType> = [
        {
            id: todolistId1,
            title: 'What to learn',
            filter: 'all',
            addedDate: '',
            order: 0,
        },
        {
            id: todolistId2,
            title: 'What to buy',
            filter: 'all',
            addedDate: '',
            order: 0,
        },
    ]


    const action: changeFilterType = changeFilter(todolistId2, newFilter)

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


