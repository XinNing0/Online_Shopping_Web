import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import {applyMiddleware, compose, createStore} from "redux";
import {Provider} from "react-redux"
import reducers from "./reducers"
import {thunk} from "redux-thunk"
import {composeWithDevTools} from "@redux-devtools/extension";

const root = ReactDOM.createRoot(document.getElementById('root'));
const reduxStore = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))
root.render(
    <Provider store={reduxStore}>
        <App />
    </Provider>,
);



