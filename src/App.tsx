import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

// C-"R"-UD
// CLI -> GUI -> UI
function App() {

    let [filter, setFilter] = useState<FilterValuesType>('all');





    let [tasks, setTasks] = useState<Array<TaskType>>(
        [  // TaskType []
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ]
    );

    function removeTask(id: string) {
        setTasks(tasks.filter(t => t.id !== id))
    }

    function addTask(value: string) {
        let newTask: TaskType = {id: v1(), title: value, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (id: string, newStatus: boolean) => {
        setTasks(tasks.map(t => t.id === id ? {...t, isDone: newStatus} : t))
    }

    // const tasks1: Array<TaskType> = [  // TaskType []
    //     {id: 1, title: "HTML", isDone: true},
    //     {id: 2, title: "CSS", isDone: true},
    //     {id: 3, title: "React", isDone: false},
    //     {id: 4, title: "Redux", isDone: false},
    //     {id: 5, title: "Redux", isDone: false},
    // ]

    let tasksForTodolist = tasks;
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'all') {
        tasksForTodolist = tasks;
    }

    function changeFilter(filterValue: FilterValuesType) {
        setFilter(filterValue);
    }


    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                tasks={tasksForTodolist}
                removeTask = {removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                filter={filter}
                changeTaskStatus={changeTaskStatus}
            />
             {/*<TodoList title = "What to learn" tasks={tasks1}/>*/}
            {/*<TodoList title={"What to buy"}/>*/}
            {/*<TodoList title={"What to read"}/>*/}
        </div>
    );
}

export default App;
