//user action files

import {USER, REGERR} from '../../Types/Index';
export const REGISTERING_USER = payload => dispatch => {
  dispatch({type: USER, payload});
};
export const REGISTERING_USER_ERR = payload => dispatch => {
  dispatch({type: REGERR, payload});
};
