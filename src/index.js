import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { createStore, applyMiddleware , compose} from 'redux';
import myReducer from './reducers/index';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie'

// const socket = io('http://localhost:5000');
// console.log(socket.id);
// socket.on('count-users', function(data){
//     console.log('user' + data)
// })

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

var store = createStore(myReducer,
    composeEnhancers(
        applyMiddleware(thunk)
   ) 
);

ReactDOM.render(
<CookiesProvider>
    <Provider store = {store}>
    <App />
</Provider>
</CookiesProvider>

        ,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
