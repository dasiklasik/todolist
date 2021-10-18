import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type filterValuesType = 'all' | 'active' | 'completed'
// C-"R"-UD
// CLI -> GUI -> UI
function App() {
    const [tasks, setTasks] = useState(
        [  // TaskType []
            {id: 1, title: "HTML", isDone: true},
            {id: 2, title: "CSS", isDone: true},
            {id: 3, title: "React", isDone: false},
            {id: 4, title: "Redux", isDone: false},
        ]
    )

    const [filter, setFilter] = useState<filterValuesType>('all')

    // let tasks: Array<TaskType> = [  // TaskType []
    //     {id: 1, title: "HTML", isDone: true},
    //     {id: 2, title: "CSS", isDone: true},
    //     {id: 3, title: "React", isDone: false},
    //     {id: 4, title: "Redux", isDone: false},
    // ]

    const changeFilter = (filter: filterValuesType) => {
        setFilter(filter);
    }

    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(task => task.id !== taskID))

        console.log(tasks)
    }

    let tasksForRender = tasks
    if (filter === 'active') {
        tasksForRender = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        tasksForRender = tasks.filter(t => t.isDone === true)
    }
    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
            /> {/* TodoList({title: "What to learn"}) */}
            {/*<TodoList title={"What to buy"}/>*/}
            {/*<TodoList title={"What to read"}/>*/}
        </div>
    );
}

export default App;
