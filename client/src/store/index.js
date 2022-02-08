import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import HouseholdReducer from './reducers/HouseholdReducer';
import UserReducer from './reducers/UserReducer';

const store = createStore(
  combineReducers({
    householdState: HouseholdReducer,
    userState: UserReducer
  }),
  composeWithDevTools()
);

export default store;
