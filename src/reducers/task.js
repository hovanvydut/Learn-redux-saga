import { toast } from 'react-toastify';
import * as types from '../constants/task';
import { toastError } from '../commons/toastHelper';

const initialState = {
  listTask: [],
  taskEditing: null
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch task
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

    // Filter tasks
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

    // add new task
    case types.ADD_TASK: {
      return {
        ...state
      };
    }
    case types.ADD_TASK_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listTask: [data].concat(state.listTask)
      };
    }
    case types.ADD_TASK_FAILED: {
      const { error } = action.payload;
      toast(error);
      return {
        ...state
      };
    }

    // set task editing
    case types.SET_TASK_EDITING: {
      const { task } = action.payload;
      return {
        ...state,
        taskEditing: task
      };
    }
    case types.UPDATE_TASK: {
      return {
        ...state
      };
    }
    case types.UPDATE_TASK_SUCCESS: {
      const { data } = action.payload;
      const { listTask } = state;
      const idx = listTask.findIndex(task => task.id === data.id);
      let newListTask;
      if (idx > -1) {
        newListTask = [
          ...listTask.slice(0, idx),
          data,
          ...listTask.slice(idx + 1)
        ];
        return {
          ...state,
          listTask: newListTask
        };
      }

      return {
        ...state
      };
    }
    case types.UPDATE_TASK_FAILED: {
      return {
        ...state
      };
    }

    default:
      return { ...state };
  }
};

export default taskReducer;
