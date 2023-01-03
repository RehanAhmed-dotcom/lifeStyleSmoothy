//user action files

import {FCM_TOKEN} from '../../Types/Index';

export const FCM_handler = payload => dispatch => {
  dispatch({type: FCM_TOKEN, payload});
};
