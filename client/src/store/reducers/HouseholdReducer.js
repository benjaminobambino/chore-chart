const {
  GET_CURRENT_HOUSEHOLD,
  NEW_HOUSEHOLD,
  ADD_HOUSEHOLD,
  EDIT_HOUSEHOLD,
  UPDATE_HOUSEHOLD,
  DELETE_HOUSEHOLD
} = require('../types');

const iState = {
  currentHousehold: {},
  newHousehold: {},
  editedHousehold: {}
};

const HouseholdReducer = (state = iState, action) => {
  switch (action.type) {
    case GET_CURRENT_HOUSEHOLD:
      return { ...state, currentHousehold: action.payload };
    case NEW_HOUSEHOLD:
      return { ...state, newHousehold: action.payload };
    case ADD_HOUSEHOLD:
      return { ...state, currentHousehold: action.payload, newHousehold: {} };
    case EDIT_HOUSEHOLD:
      return { ...state, editedHousehold: action.payload };
    case UPDATE_HOUSEHOLD:
      return {
        ...state,
        currentHousehold: action.payload,
        editedHousehold: {}
      };
    case DELETE_HOUSEHOLD:
      return { ...state, currentHousehold: {} };
    default:
      return { ...state };
  }
};

export default HouseholdReducer;
