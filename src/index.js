import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router, Route, browserHistory } from 'react-router';
import Home from './componentes/Inicio/Home.js';
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}></Route>
    <Route path="inicio" component={Home}></Route>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
