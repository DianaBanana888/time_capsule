import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import saga from 'redux-saga';
import { all } from 'redux-saga/effects';

import { reducers } from './reducers';
import {

} from './saga';

const initialState = () => {
  const initialState = {
    isAuth: false,
    idUser: '',
    userName: '',
    loading: false,
    error: false,
    note: []
  };
  return localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState'))
    : initialState
}

const sagaMiddleware = saga();
const composeEnhancer = process.env.NODE_ENV === 'production'
  ? applyMiddleware(thunkMiddleware, sagaMiddleware)
  : composeWithDevTools(applyMiddleware(thunkMiddleware, sagaMiddleware));

export const store = createStore(
  reducers, initialState(), composeEnhancer
);
store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

sagaMiddleware.run(
  function* () {
    yield all(
      []
    );
  }
);
