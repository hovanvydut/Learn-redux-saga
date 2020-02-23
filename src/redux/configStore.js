import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/index';
import rootSaga from '../sagas';

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false
      })
    : compose;

// create saga middleware
const sagaMiddleware = createSagaMiddleware();

const configStore = () => {
  const middleware = [thunk, sagaMiddleware];
  const enhancers = composeEnhancers(applyMiddleware(...middleware));
  const store = createStore(rootReducer, enhancers);
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configStore;
