import {
  GET_CHORES,
  NEW_CHORE,
  ADD_CHORE,
  EDIT_CHORE,
  UPDATE_CHORE,
  DELETE_CHORE
} from '../types';

export const LoadChores = () => {
  return async (dispatch) => {
    try {
      const chores = await GetChores();
      dispatch({
        type: GET_CHORES,
        payload: chores
      });
    } catch (error) {
      throw error;
    }
  };
};
export const AddChore = (chore) => ({
  type: ADD_CHORE,
  payload: chore
});
