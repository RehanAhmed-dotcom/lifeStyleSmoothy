import {
  ADD_QUANTITY,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  EMPTY_CART,
  SUB_QUANTITY,
} from '../../Types/Index';

const initialState = {
  products: [],
};
const ShoppinReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART: {
      let newArr = [];
      const item = state.products.find(item => item.id === payload.id);
      if (item) {
        newArr = state.products.map(cartItem =>
          cartItem.id === payload.id
            ? {
              ...cartItem,
              qty: 0,
              subtotal: cartItem.final_price * (cartItem.qty + 0),
            }
            : cartItem,
        );
      } else {
        newArr = [...state.products];
        newArr.push(payload);
      }
      return {
        ...state,
        products: newArr,
      };
    }
    case REMOVE_FROM_CART:
      const arr = [...state.products];
      const fIndex = arr.findIndex(item => item.id === payload.id);
      if (fIndex > -1) {
        arr.splice(fIndex, 1);
      }
      return {
        ...state,
        products: arr,
      };
    case ADD_QUANTITY:
      return {
        ...state,
        products: state.products.map(item =>
          item.id === payload.id
            ? {
              ...item,
              qty: item.qty + 1,
              subtotal: item.price * (item.qty + 1),
            }
            : item,
        ),
      };
    case SUB_QUANTITY:
      return {
        ...state,
        products: state.products.map(item =>
          item.id === payload.id
            ? {
              ...item,
              qty: item.qty !== 1 ? item.qty - 1 : 1,
              subtotal:
                item.qty !== 1 ? item.price * (item.qty - 1) : item.price,
            }
            : item,
        ),
      };
    case EMPTY_CART:
      return {
        ...state,
        products: [],
      };
    default:
      return state;
  }
};

export default ShoppinReducer;
