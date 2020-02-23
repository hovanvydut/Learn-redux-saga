import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import tasks from './task';
import ui from './ui';
import modal from './modal';

const rootReducer = combineReducers({ tasks, ui, modal, form: formReducer });

export default rootReducer;
