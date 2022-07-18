import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {AppWithRedux} from './components/AppWithRedux';
import {Provider} from "react-redux";
import {store} from "./state/store";
import ReactDOM from 'react-dom';

ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux />
    </Provider>
    ,  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
