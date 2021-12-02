import {
  ADD_TO_CART,
  CLEAR_ALL_CART,
  REMOVE_TO_CART,
} from "../action/cartAction";

const initState = {
  cart: [],
  total: 0,
  priceAll: 0,
  discountAll: 0,
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: action.payload.cart,
        total: action.payload.total,
        priceAll: action.payload.priceAll,
        discountAll: action.payload.discountAll,
      };
    case REMOVE_TO_CART:
      return {
        ...state,
        cart: action.payload.cart,
        total: action.payload.total,
        priceAll: action.payload.priceAll,
        discountAll: action.payload.discountAll,
      };
    case CLEAR_ALL_CART:
      return {
        ...state,
        cart: action.payload.cart,
        total: action.payload.total,
        priceAll: action.payload.priceAll,
        discountAll: action.payload.discountAll,
      };

    default:
      return state;
  }
};

export default cartReducer;
