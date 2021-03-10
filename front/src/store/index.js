import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import saga from 'redux-saga';

import { reducers } from './reducers';

const initialState = () => {
  const initialState = {
    isAuth: false,
    idUser: '',
    userName: '',
    loading: false,
    error: false
  };
  return localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState'))
    : initialState;
};

const sagaMiddleware = saga();
const composeEnhancer = process.env.NODE_ENV === 'production'
  ? applyMiddleware(thunkMiddleware, sagaMiddleware)
  : composeWithDevTools(applyMiddleware(thunkMiddleware, sagaMiddleware));

export const store = createStore(
  reducers, initialState(), composeEnhancer
);
store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});
