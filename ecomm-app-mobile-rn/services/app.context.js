import { createContext } from "react";

export const AppContext = createContext({});

export const ACTIONS = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  ADD_TO_CART: "ADD_TO_CART",
};

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SIGN_IN:
      return { ...state, token: action.payload };
    case ACTIONS.SIGN_OUT:
      return { ...state, token: null };
    case ACTIONS.ADD_TO_CART:
      const filteredCart = state.cart.filter(
        (c) => c.product._id !== action.payload.product._id
      );
      return { ...state, cart: [...filteredCart, action.payload] };
    default:
      return state;
  }
}
