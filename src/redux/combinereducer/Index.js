import {combineReducers} from 'redux';
import _userstoringReducer from '../reducers/userreducer/Index';
import ShoppinReducer from '../reducers/cartreducer/Index';
import fcmreducer from '../reducers/fcmreducer';
const rootReducer = combineReducers({
  _userstoringReducer,
  ShoppinReducer,
  fcmreducer,
});

export default rootReducer;
