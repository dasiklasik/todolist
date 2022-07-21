import {v1} from "uuid";
import {
    addTaskAC,
    addTasksArrayAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksType
} from "./tasksReducer";
import {todolistID1, todolistID2} from "./todolistsReducer";
import {TaskPriorities, TaskStatuses} from "../api/todolistAPI";

let initialState: TasksType;

beforeEach(() => {
    return  initialState ={
        [todolistID1]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                order: 0,
                todoListId: todolistID1,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed, order: 0, todoListId: todolistID1, description: '',
                priority: TaskPriorities.Low, startDate: '', deadline: '', addedDate: '',
            },
            {
                id: v1(), title: "ReactJS", status: TaskStatuses.New, order: 0, todoListId: todolistID1, description: '',
                priority: TaskPriorities.Low, startDate: '', deadline: '', addedDate: '',
            },
            {
                id: v1(), title: "Rest API", status: TaskStatuses.New, order: 0, todoListId: todolistID1, description: '',
                priority: TaskPriorities.Low, startDate: '', deadline: '', addedDate: '',
            },
            {
                id: v1(), title: "GraphQL", status: TaskStatuses.New, order: 0, todoListId: todolistID1, description: '',
                priority: TaskPriorities.Low, startDate: '', deadline: '', addedDate: '',
            },
        ],
        [todolistID2]: [
            {
                id: v1(),
                title: "HTML&CSS2",
                status: TaskStatuses.Completed,
                order: 0,
                todoListId: todolistID1,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: v1(), title: "JS2", status: TaskStatuses.Completed, order: 0, todoListId: todolistID1, description: '',
                priority: TaskPriorities.Low, startDate: '', deadline: '', addedDate: '',
            },
            {
                id: v1(), title: "ReactJS2", status: TaskStatuses.New, order: 0, todoListId: todolistID1, description: '',
                priority: TaskPriorities.Low, startDate: '', deadline: '', addedDate: '',
            },
            {
                id: v1(), title: "Rest API2", status: TaskStatuses.New, order: 0, todoListId: todolistID1, description: '',
                priority: TaskPriorities.Low, startDate: '', deadline: '', addedDate: '',
            },
            {
                id: v1(), title: "GraphQL2", status: TaskStatuses.New, order: 0, todoListId: todolistID1, description: '',
                priority: TaskPriorities.Low, startDate: '', deadline: '', addedDate: '',
            },
        ]
    }
})

test('task reducer should remove correct task', () => {
    const endState = tasksReducer(initialState, removeTaskAC(todolistID1, initialState[todolistID1][0].id))

    expect(endState[todolistID2].length).toBe(5)
    expect(endState[todolistID1].length).toBe(4)
    expect(endState[todolistID1][0].title).toBe("JS")
})

test('task reducer should add task', () => {
    const endState = tasksReducer(initialState, addTaskAC(todolistID1, 'other'))

    expect(endState[todolistID1][0].title).toBe('other')
})


test('task reducer should change task status', () => {
    const endState = tasksReducer(initialState, changeTaskStatusAC(todolistID1,
        initialState[todolistID1][0].id, TaskStatuses.New))

    expect(endState[todolistID1][0].status).toBe(TaskStatuses.New)
})


test('task reducer should change task title', () => {
    const endState = tasksReducer(initialState, changeTaskTitleAC(todolistID1,
        initialState[todolistID1][0].id, 'some title'))

    expect(endState[todolistID1][0].title).toBe('some title')
})

test('task reducer should add tasks array', () => {

    const todolistId3 = v1()

    const endState = tasksReducer(initialState, addTasksArrayAC(todolistId3))

    expect(endState[todolistId3]).toEqual([])
})