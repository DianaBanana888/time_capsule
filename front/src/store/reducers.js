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
        note: action.payload.arrayNote
      };

    case actionTypes.LOADING:
      return { ...state, loading: true };
    case actionTypes.LOADED:
      return { ...state, loading: false };
    case actionTypes.ERROR:
      return { ...state, error: action.payload.msg };
    default:
      console.log('default state');
      return state;
  }
};
