import actionTypes from './types';

export const loginAC = (id, name, email, arrayNote) => ({
  type: actionTypes.LOGIN,
  payload: {
    id, name, email, arrayNote
  }
});

export const changeMindAC = (id, wantSending) => ({
  type: actionTypes.CHANGE_MIND,
  payload: {
    id, wantSending
  }
});

export const deleteAC = (id) => ({
  type: actionTypes.DELETE,
  payload: id
});

export const updateTextAC = (id, text) => ({
  type: actionTypes.UPD_TEXT,
  payload: { id, text }
});

export const logOutAC = () => ({
  type: actionTypes.LOGOUT
});

export const setError = (msg) => ({
  type: actionTypes.ERROR,
  payload: { msg }
});

export const loadingAC = () => ({ type: actionTypes.LOADING });
export const loadedAC = () => ({ type: actionTypes.LOADED });

export const saveNewLetterAC = (result) => ({
  type: actionTypes.SAVE_LETTER,
  payload: result
});
