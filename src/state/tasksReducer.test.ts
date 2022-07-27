import {v1} from "uuid";
import {addTaskAC, changeTask, removeTaskAC, tasksReducer, TasksType} from "./tasksReducer";
import {todolistID1, todolistID2} from "./todolistsReducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolistAPI";

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
    const task: TaskType = {
        addedDate: "",
        deadline: "",
        description: "",
        id: v1(),
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        status: TaskStatuses.New,
        title: 'other',
        todoListId: todolistID1,

    }
    const endState = tasksReducer(initialState, addTaskAC(task))

    expect(endState[todolistID1][5].title).toBe('other')
})


test('task reducer should change task status', () => {
    let task = initialState[todolistID1][0]
    task = {...task, status: TaskStatuses.Completed}

    const endState = tasksReducer(initialState, changeTask(task))

    expect(endState[todolistID1][0].status).toBe(TaskStatuses.Completed)
})


test('task reducer should change task title', () => {

    let task = initialState[todolistID1][0]
    task = {...task, title: 'some title'}

    const endState = tasksReducer(initialState, changeTask(task))

    expect(endState[todolistID1][0].title).toBe('some title')
})
