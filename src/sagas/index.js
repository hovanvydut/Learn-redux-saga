import { toast } from 'react-toastify';
import {
  call,
  delay,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
  select
} from 'redux-saga/effects';
import * as modalAction from '../actions/modal';
import {
  addTaskFailed,
  addTaskSuccess,
  fetchListTask,
  fetchListTaskFailed,
  fetchListTaskSuccess,
  updateTaskSuccess,
  updateTaskFailed
} from '../actions/task';
import * as uiAction from '../actions/ui';
import { addTask, getList, updateTask } from '../apis/task';
import { STATUSES, STATUS_CODE } from '../constants/index';
import * as taskTypes from '../constants/task';

/*
 * B1: Thực thi action fetchTask
 * B2.1: Hiển thị thanh tiến trình (loading)
 * B2.2: Gọi API
 * B3: Kiểm tra status code
 * Nếu thành công: dispatch action fetch data success
 * Nếu thất bại: dispatch action fetch data success
 * B4.1: Tắt loading
 * B4.2: Thực thi các công việc tiếp theo
 */
function* watchFetchListTaskAction() {
  while (true) {
    // take action: giúp báo hiệu sắp sửa fetch data (blocking)
    const action = yield take(taskTypes.FETCH_TASKS);
    const { params } = action.payload;
    // Hiển thị loading bằng put helper === dispatch(action) (non-blocking);
    yield put(uiAction.showLoading());
    // giúp gọi api, trả về một promise
    const res = yield call(getList, params);
    const { status, data } = res;
    if (status === STATUS_CODE.SUCCESS) {
      // dispatch action fetch data thanh cong
      yield put(fetchListTaskSuccess(data));
    } else {
      // dispatch action fetch data that bai
      yield put(fetchListTaskFailed(data));
    }
    yield delay(1000);
    // dispatch action để tắt loading
    yield put(uiAction.hideLoading());
  }
}

function* filterTaskSaga(action) {
  yield delay(500);
  const keyword = action.payload;
  yield put(fetchListTask({ q: keyword }));
}

function* addTaskSaga(action) {
  const { title, description } = action.payload;
  // dispatch action to show Loading
  yield put(uiAction.showLoading());
  // gọi api để lưu dữ liệu vào db
  const res = yield call(addTask, {
    title,
    description,
    status: STATUSES[0].value
  });
  const { data, status } = res;

  if (status === STATUS_CODE.CREATED) {
    yield put(addTaskSuccess(data));

    yield put(modalAction.hideModal());
    yield delay(1000);
    yield put(uiAction.hideLoading());
    toast.success('Them moi thanh cong');
  } else {
    yield put(addTaskFailed(data));
  }
}

function* updateTaskSaga(action) {
  const { payload } = action;
  const { title, description, status } = payload;
  const taskEditing = yield select(state => state.tasks.taskEditing);

  yield put(uiAction.showLoading());

  const res = yield call(
    updateTask,
    { title, description, status },
    taskEditing.id
  );
  const { data, status: statusRes } = res;
  if (statusRes === STATUS_CODE.SUCCESS) {
    yield put(updateTaskSuccess(data));
    toast.success('Update thanh cong');
  } else {
    yield put(updateTaskFailed(data));
  }

  yield put(modalAction.hideModal());
  yield delay(1000);
  yield put(uiAction.hideLoading());
}

function* rootSaga() {
  yield fork(watchFetchListTaskAction);
  yield takeLatest(taskTypes.FILTER_TASK, filterTaskSaga);
  yield takeEvery(taskTypes.ADD_TASK, addTaskSaga);
  yield takeLatest(taskTypes.UPDATE_TASK, updateTaskSaga);
}

export default rootSaga;
