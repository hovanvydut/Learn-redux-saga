import * as types from '../constants/ui';

const initialState = {
  showLoading: false
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_LOADING:
      return { ...state, showLoading: true };
    case types.HIDE_LOADING:
      return { ...state, showLoading: false };
    default:
      return { ...state };
  }
};

export default uiReducer;
