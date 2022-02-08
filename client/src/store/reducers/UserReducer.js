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
      return { ...state, currentUser: action.payload };
    case DELETE_USER:
      const users = [...state.users];
      users.splice(parseInt(action.payload), 1);
      return { ...state, currentUser: {} };
    default:
      return { ...state };
  }
};

export default UserReducer;
