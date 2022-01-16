import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
// let store = createStore( () => {
//   return [
//     {id: 0, name: 'selected-shoes-1', quan: 2},
//     {id: 1, name: 'selected-shoes-2', quan: 3},
//   ];
// });

// reducer
let _defaultStaet = [
  // {id: 10, name: 'selected-shoes-1', quan: 2},
  // {id: 11, name: 'selected-shoes-2', quan: 3}
];
function reducer (state = _defaultStaet, act) {
  // console.log(`[reducer] --> [${act.type}]`, act.payload);

  if (act.type === 'add') {
    let _new = [...state];
    let item;
    if (item = _new.find( (e) => { return e.id === act.payload.id })) {
      item.quan += act.quan;
    }
    else {
      _new.push({id: act.payload.id, name: act.payload.title, quan: act.quan});
    }
    
    return _new;
  }
  else if (act.type === 'plus') {
    let _new = [...state];
    _new[act.data].quan++;
    return _new;
  }
  else if (act.type === 'minus') {
    let _new = [...state];
    if (_new[act.data].quan > 0) _new[0].quan--;
    return _new;
  }
  else {
    return state;
  }
}

function reducer2 (state = true, act) {
  // console.log(`[reducer2] --> [${act.type}]`);
  if (act.type === 'close') {
    return false;
  }
  return state;
}

// 복합 reducer 연결
let store = createStore( combineReducers( {reducer, reducer2} ) );

ReactDOM.render(
  <React.StrictMode>

    <BrowserRouter>

      <Provider store={store}>
        <App />
      </Provider>
      
    </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
