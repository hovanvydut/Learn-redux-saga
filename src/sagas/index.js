import {
  fork,
  take,
  call,
  put,
  delay,
  takeLatest,
  select
} from 'redux-saga/effects';
import * as taskTypes from '../constants/task';
import * as uiAction from '../actions/ui';
import { getList } from '../apis/task';
import { STATUS_CODE } from '../constants/index';
import { fetchListTaskSuccess, fetchListTaskFailed } from '../actions/task';

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
    yield take(taskTypes.FETCH_TASKS);
    // Hiển thị loading bằng put helper === dispatch(action) (non-blocking);
    yield put(uiAction.showLoading());
    // giúp gọi api, trả về một promise
    const res = yield call(getList);
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

function* filterTaskSaga({ payload }) {
  yield delay(500);
  const keyword = payload;
  const list = yield select(state => state.tasks.listTask);
  const filterTask = list.filter(task =>
    new RegExp(`\\b${keyword.toLowerCase().trim()}`, 'g').test(
      task.title.toLowerCase()
    )
  );
  yield put(fetchListTaskSuccess(filterTask));
}

function* rootSaga() {
  yield fork(watchFetchListTaskAction);
  yield takeLatest(taskTypes.FILTER_TASK, filterTaskSaga);
}

export default rootSaga;
