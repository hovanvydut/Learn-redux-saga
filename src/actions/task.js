import * as taskApi from '../apis/task';
import * as types from '../constants/task';

// action plain object
// reset state tasks = []
export const fetchListTask = () => {
  return {
    type: types.FETCH_TASKS
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
