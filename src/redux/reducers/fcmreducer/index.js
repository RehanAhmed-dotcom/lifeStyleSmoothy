// user reducer for registering

import {FCM_TOKEN} from '../../Types/Index';

const initialState = {
  fcmtoken: '',
};

const fcmreducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case FCM_TOKEN:
      return {...state, fcmtoken: payload};
    default:
      return state;
  }
};

export default fcmreducer;
