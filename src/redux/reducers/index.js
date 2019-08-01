import { combineReducers } from 'redux';
import comments from "./commentReducer";
import modal from './modalReducer';
import userInit from './userReducer';
import topic from './topicReducer';
import api from './apiReducer';
import auth from './authReducer';
import paging from './pagingReducer';

export default combineReducers({
  comments,
  modal,
  userInit,
  topic,
  api,
  auth,
  paging
});
