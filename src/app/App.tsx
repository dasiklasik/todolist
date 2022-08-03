import React from 'react';
import './App.css';
import {Container} from '@mui/material';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {Header} from "../components/Header/Header";
import {ErrorSnackbar} from "../components/ErrorShackbar/ErrorSnackbar";


export function App() {
    return (
        <div className="App">
            <ErrorSnackbar/>
            <Header/>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
}

