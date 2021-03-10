/* eslint-disable import/prefer-default-export */
import actionTypes from './types';

export const reducers = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isAuth: true,
        idUser: action.payload.id,
        userName: action.payload.name,
        userEmail: action.payload.email,
        note: action.payload.arrayNote
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuth: false,
        idUser: '',
        userName: '',
        note: []
      };

    case actionTypes.LOADING:
      return { ...state, loading: true };
    case actionTypes.LOADED:
      return { ...state, loading: false };
    case actionTypes.ERROR:
      return { ...state, error: action.payload.msg };

    case actionTypes.SAVE_LETTER:
      return {
        ...state,
        note: [
          ...state.note,
          action.payload
        ]
      };

    case actionTypes.CHANGE_MIND:
      return {
        ...state,
        note:
          state.note.map((el) => (el._id === action.payload.id
            ? { ...el, wantSending: !action.payload.wantSending }
            : el))
      };

    case actionTypes.DELETE:
      return {
        ...state,
        note:
          state.note.filter((el) => el._id !== action.payload)
      };

    case actionTypes.UPD_TEXT:
      return {
        ...state,
        note:
          state.note.map((el) => (el._id === action.payload.id
            ? { ...el, text: action.payload.text }
            : el))
      };

    default:
      return state;
  }
};
