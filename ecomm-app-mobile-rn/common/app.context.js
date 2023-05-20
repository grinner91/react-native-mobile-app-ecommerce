import { createContext } from "react";
import { saveState } from "./app.localstore";

export const AppContext = createContext({});

export const ACTIONS = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  ADD_TO_CART: "ADD_TO_CART",
};

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SIGN_IN:
      const updatedState = {
        ...state,
        user: {
          email: action.payload.email,
          fullname: action.payload.fullname,
        },
        token: action.payload.jwt,
        isLoggedin: true,
      };
      saveState(updatedState);

      return updatedState;
    //
    case ACTIONS.SIGN_OUT:
      saveState({ ...state, user: null, token: null, isLoggedin: false });
      return { ...state, user: null, token: null, isLoggedin: false };
    //
    case ACTIONS.ADD_TO_CART:
      const filteredCart = state.cart.filter(
        (c) => c.product._id !== action.payload.product._id
      );
      return { ...state, cart: [...filteredCart, action.payload] };
    //
    default:
      return state;
  }
}
