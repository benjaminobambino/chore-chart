import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import HouseholdReducer from './reducers/HouseholdReducer';
import UserReducer from './reducers/UserReducer';
import ChoreReducer from './reducers/ChoreReducer';

const store = createStore(
  combineReducers({
    householdState: HouseholdReducer,
    userState: UserReducer,
    choreState: ChoreReducer
  }),
  composeWithDevTools()
);

export default store;
