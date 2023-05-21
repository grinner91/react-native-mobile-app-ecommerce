import { createContext } from "react";
import { saveState } from "./app.localstore";

export const AppContext = createContext({});

export const ACTIONS = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  ADD_TO_CART: "ADD_TO_CART",
  RESET_CART: "RESET_CART",
  SET_STATE: "SET_STATE",
};

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SIGN_IN:
      saveState(action.payload);
      return { ...state, ...action.payload };
    //
    case ACTIONS.SIGN_OUT:
      saveState({
        ...state,
        user: null,
        token: null,
        isLoggedin: false,
        cart: [],
      });
      return { ...state, user: null, token: null, isLoggedin: false, cart: [] };
    //
    case ACTIONS.ADD_TO_CART:
      const filteredCart = state.cart.filter(
        (c) => c.product._id !== action.payload.product._id
      );
      return { ...state, cart: [...filteredCart, action.payload] };
    //
    case ACTIONS.RESET_CART:
      return { ...state, cart: [] };
    case ACTIONS.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
