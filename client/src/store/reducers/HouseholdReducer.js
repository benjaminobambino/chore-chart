const iState = {
  currentHousehold: {},
  newHousehold: {}
};

const HouseholdReducer = (state = iState, action) => {
  switch (action.type) {
    case 'GET_CURRENT_HOUSEHOLD':
      return { ...state, currentHousehold: action.payload };
    case 'NEW_HOUSEHOLD':
      return { ...state, newHousehold: action.payload };
    case 'ADD_HOUSEHOLD':
      return { ...state, currentHousehold: action.payload };
    default:
      return { ...state };
  }
};

export default HouseholdReducer;
