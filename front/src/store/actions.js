import actionTypes from './types';

export const loginAC = (id, name, arrayNote) => ({
  type: actionTypes.LOGIN,
  payload: { id, name, arrayNote }
});

export const logOutAC = () => ({
  type: actionTypes.LOGOUT
});

export const setError = (msg) => ({ type: actionTypes.ERROR, payload: { msg } });

export const loadingAC = () => ({ type: actionTypes.LOADING });
export const loadedAC = () => ({ type: actionTypes.LOADED });
