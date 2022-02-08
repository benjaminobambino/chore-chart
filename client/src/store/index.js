import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import HouseholdReducer from './reducers/HouseholdReducer';

const store = createStore(HouseholdReducer, composeWithDevTools());

export default store;
