const {
  GET_CURRENT_USER,
  GET_USERS,
  EDIT_USER,
  UPDATE_USER,
  DELETE_USER
} = require('../types');

const iState = {
  currentUser: {},
  users: [],
  editedUser: {}
};

const UserReducer = (state = iState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    case GET_USERS:
      return { ...state, users: action.payload };
    case EDIT_USER:
      return { ...state, editedUser: action.payload };
    case UPDATE_USER:
      return { ...state, currentUser: action.payload, editedUser: {} };
    case DELETE_USER:
      const updatedUsers = [...state.users];
      updatedUsers.splice(parseInt(action.payload), 1);
      return { ...state, users: updatedUsers, currentUser: {} };
    default:
      return { ...state };
  }
};

export default UserReducer;
