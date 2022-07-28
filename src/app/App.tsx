import React from 'react';
import './App.css';
import {Container} from '@mui/material';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {Header} from "../components/Header/Header";


export function App() {
    return (
        <div className="App">
            <Header/>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
}

