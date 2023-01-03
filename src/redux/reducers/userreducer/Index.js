// user reducer for registering

import {USER, REGERR} from '../../Types/Index';

const initialState = {
  userCredentials: null,
  isLoggedIn: false,
  credentialErr: {},
};

const _userstoringReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case USER:
      return {
        ...state,
        userCredentials: payload,
        isLoggedIn: payload ? true : false,
      };
    case REGERR:
      return {...state, credentialErr: payload};
    default:
      return state;
  }
};

export default _userstoringReducer;
