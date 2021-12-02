export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_TO_CART = "REMOVE_TO_CART";
export const CLEAR_ALL_CART = "CLEAR_ALL_CART";

export const addToCart = (product = {}, cart = []) => {
  let exists = false;
  if (cart.length > 0) {
    for (const c of cart) {
      if (c.id === product.id) {
        c.qty++;
        exists = true;
      }
    }
  }
  if (!exists) {
    cart.push(product);
  }
  const total = cart.reduce((totalQty, product) => totalQty + product.qty, 0);
  const priceAll = cart.reduce(
    (priceQty, product) => priceQty + product.price * product.qty,
    0
  );
  const discountAll = cart.reduce(
    (discountQty, product) => discountQty + product.discount * product.qty,
    0
  );
  return {
    type: ADD_TO_CART,
    payload: {
      cart: cart,
      total: total,
      priceAll: priceAll,
      discountAll: discountAll,
    },
  };
};

export const removeToCart = (product = {}, cart = []) => {
  if (cart.length > 0) {
    let index = 0;
    for (const c of cart) {
      if (c.id === product.id) {
        c.qty--;
        if (c.qty <= 0) {
          cart.splice(index, 1);
        }
      }
      index++;
    }
  }

  const total = cart.reduce((totalQty, product) => totalQty + product.qty, 0);
  const priceAll = cart.reduce(
    (priceQty, product) => priceQty + product.price * product.qty,
    0
  );
  const discountAll = cart.reduce(
    (discountQty, product) => discountQty + product.discount * product.qty,
    0
  );

  return {
    type: REMOVE_TO_CART,
    payload: {
      cart: cart,
      total: total,
      priceAll: priceAll,
      discountAll: discountAll,
    },
  };
};

export const clearAllCart = () => {
  return {
    type: CLEAR_ALL_CART,
    payload: {
      cart: [],
      total: 0,
      priceAll: 0,
      discountAll: 0,
    },
  };
};
