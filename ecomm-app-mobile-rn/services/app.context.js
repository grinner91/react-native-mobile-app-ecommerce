import { createContext } from "react";

export const AppContext = createContext({});


export const ACTIONS = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SIGN_IN:
      return { ...state, token: action.payload };
    case ACTIONS.SIGN_OUT:
      return { ...state, token: null };
    default:
      return state;
  }
}
