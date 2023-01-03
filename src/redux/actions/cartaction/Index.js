import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SUB_QUANTITY,
  EMPTY_CART,
  ADD_QUANTITY,
} from '../../Types/Index';
export const addToCart = payload => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};
export const removeFromCart = id => dispatch => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: {id},
  });
};
export const subtractQuantity = id => dispatch => {
  console.log('dispatch console', id);
  dispatch({
    type: SUB_QUANTITY,
    payload: {id},
  });
};
export const addQuantity = id => dispatch => {
  console.log('Id', id);
  dispatch({
    type: ADD_QUANTITY,
    payload: {id},
  });
};

export const emptyCart = () => dispatch => {
  dispatch({
    type: EMPTY_CART,
    // payload: {id},
  });
  // return {
  //   type: EMPTY_CART,
  // };
};
