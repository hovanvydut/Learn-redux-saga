import * as taskApi from '../apis/task';
import * as types from '../constants/task';
import { STATUSES } from '../constants';

// action plain object
// reset state tasks = []
export const fetchListTask = (params = {}) => {
  return {
    type: types.FETCH_TASKS,
    payload: {
      params
    }
  };
};

// save all payload into state tasks if fetch data success
export const fetchListTaskSuccess = tasks => {
  return {
    type: types.FETCH_TASKS_SUCCESS,
    payload: tasks
  };
};

export const fetchListTaskFailed = err => {
  return {
    type: types.FETCH_TASKS_FAILED,
    payload: err
  };
};

// middleware - redux-thunk
/*
 * B1: fetchListTaskMid()
 * B2: reset: state tasks = [] so that use dispatch(fetchListTask())
 * B3: fetchListTaskSuccess (data response)
 */
export const fetchListTaskMid = () => {
  return dispatch => {
    dispatch(fetchListTask());
    taskApi
      .getList()
      .then(res => {
        dispatch(fetchListTaskSuccess(res.data));
      })
      .catch(err => dispatch(fetchListTaskFailed(err)));
  };
};

// filter action
export const filterTask = keyword => {
  return {
    type: types.FILTER_TASK,
    payload: keyword
  };
};

export const filterTaskSuccess = data => ({
  type: types.FETCH_TASKS_SUCCESS,
  payload: {
    data
  }
});

// add task
export const addTask = (title, description) => {
  return {
    type: types.ADD_TASK,
    payload: {
      title,
      description
    }
  };
};

export const addTaskSuccess = data => {
  return {
    type: types.ADD_TASK_SUCCESS,
    payload: {
      data
    }
  };
};

export const addTaskFailed = error => {
  return {
    type: types.ADD_TASK_FAILED,
    payload: {
      error
    }
  };
};

// edit task
export const setTaskEditing = task => {
  return {
    type: types.SET_TASK_EDITING,
    payload: {
      task
    }
  };
};

// update task
export const updateTask = (title, description, status = STATUSES[0].value) => {
  return {
    type: types.UPDATE_TASK,
    payload: {
      title,
      description,
      status
    }
  };
};

export const updateTaskSuccess = data => {
  return {
    type: types.UPDATE_TASK_SUCCESS,
    payload: {
      data
    }
  };
};

export const updateTaskFailed = error => {
  return {
    type: types.UPDATE_TASK_FAILED,
    payload: {
      error
    }
  };
};
