import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

const tasks1 = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'ReactJS', isDone: false}
]

const tasks2 = [
    {id: 1, title: 'Hello', isDone: true},
    {id: 2, title: 'Hi', isDone: true},
    {id: 3, title: 'Bye', isDone: false}
]

const tasks3 = [
    {id: 1, title: 'Hello', isDone: true},
    {id: 2, title: 'Hi', isDone: true},
    {id: 3, title: 'Bye', isDone: false}
]

function App() {
    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={tasks1}/>
            <Todolist title={"Songs"} tasks={tasks2}/>
            <Todolist title={"Books"} tasks={tasks3}/>
        </div>
    );
}

export default App;
