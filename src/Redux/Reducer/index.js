import { combineReducers } from 'redux';

import { authentication } from '../Reducer/Authentication';
import { registration } from '../Reducer/Registration';
import { users } from '../Reducer/Users';
import { alert } from '../Reducer/Alert';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert
});

export default rootReducer;