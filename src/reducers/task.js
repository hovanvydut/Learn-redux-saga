import * as types from '../constants/task';
import { toastError } from '../commons/toastHelper';

const initialState = {
  listTask: []
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_TASKS: {
      return { ...state, listTask: [] };
    }
    case types.FETCH_TASKS_SUCCESS: {
      return { ...state, listTask: action.payload };
    }
    case types.FETCH_TASKS_FAILED: {
      const error = action.payload;
      toastError(error);
      return { ...state, listTask: [] };
    }
    case types.FILTER_TASK: {
      return {
        ...state
      };
    }
    case types.FILTER_TASK_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listTask: data
      };
    }
    default:
      return { ...state };
  }
};

export default taskReducer;
