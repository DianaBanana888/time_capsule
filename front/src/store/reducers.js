/* eslint-disable import/prefer-default-export */
import actionTypes from "./types";

export const reducers = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isAuth: true,
        idUser: action.payload.id,
        userName: action.payload.name,
        note: action.payload.arrayNote,
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuth: false,
        idUser: "",
        userName: "",
        note: [],
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
      };

    default:
      console.log("default state");
      return state;
  }
};
