const {
  GET_CHORES,
  NEW_CHORE,
  ADD_CHORE,
  EDIT_CHORE,
  UPDATE_CHORE,
  DELETE_CHORE
} = require('../types');

const iState = {
  chores: [],
  newChore: {},
  editedChore: {}
};

const ChoreReducer = (state = iState, action) => {
  switch (action.type) {
    case GET_CHORES:
      return { ...state, chores: action.payload };
    case NEW_CHORE:
      return { ...state, newChore: action.payload };
    case ADD_CHORE:
      return { ...state, chores: [...chores, action.payload], newChore: {} };
    case EDIT_CHORE:
      return { ...state, editedChore: action.payload };
    case UPDATE_CHORE:
      return { ...state, chores: [...chores, action.payload], editedChore: {} };
    case DELETE_CHORE:
      const newChores = [...state.chores];
      newChores.splice(parseInt(action.payload), 1);
      return { ...state, chores: newChores };
    default:
      return { ...state };
  }
};

export default ChoreReducer;
