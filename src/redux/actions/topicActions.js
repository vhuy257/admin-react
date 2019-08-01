import {
  showModal
} from './modalActions';

export const insertTopicSuccess = () => dispatch => {
  var modal = {
    type: 'success',
    msg: 'Insert topic successfully!!'
  }
  dispatch(showModal(modal));
  dispatch(convertContentToDraft());
}

export const FETCH_TOPIC_CONTENT_SUCCESS = "FETCH_TOPIC_CONTENT_SUCCESS";
export const FETCH_TOPIC_CONTENT_FAILURE = "FETCH_TOPIC_CONTENT_FAILURE";
export const CHANGE_TITLE_TOPIC          = "CHANGE_TITLE_TOPIC";
export const GET_LIST_TOPIC_SUCCESS      = "GET_LIST_TOPIC_SUCCESS";
export const DELETE_TOPIC                = "DELETE_TOPIC";
export const GET_LIST_TOPIC_FORM_SEARCH  = "GET_LIST_TOPIC_FORM_SEARCH";
export const INSERT_TOPIC_SUCCESS        = "INSERT_TOPIC_SUCCESS";
export const UPLOAD_IMAGE_EDITOR_SUCCESS = "UPLOAD_IMAGE_EDITOR_SUCCESS";
export const ADD_TAG                     = "ADD_TAG";
export const REMOVE_TAG                  = "REMOVE_TAG";
export const LOAD_TAGS_SUGGESTION        = "LOAD_TAGS_SUGGESTION";
export const REMOVE_TAG_SUGGESTION       = "REMOVE_TAG_SUGGESTION";
export const ADD_TAG_SUGGESTION          = "ADD_TAG_SUGGESTION";
export const FETCH_TAG_CURRENT           = "FETCH_TAG_CURRENT";
export const FILTER_TOPIC_BY_TAGS        = "FILTER_TOPIC_BY_TAGS";
export const SET_IMAGE_TOPIC             = "SET_IMAGE_TOPIC";
export const TOGGLE_LIST                 = "TOGGLE_LIST";

export const getListTopicSuccess = data => ({
  type: GET_LIST_TOPIC_SUCCESS,
  payload: {data}
});

export const fetchTopicSuccess = topic => ({
  type: FETCH_TOPIC_CONTENT_SUCCESS,
  payload: {topic}
});

export const fetchTopicFailure = error =>  ({
  type: FETCH_TOPIC_CONTENT_FAILURE,
  payload: {error}
});

export const changeField = data => ({
  type: CHANGE_TITLE_TOPIC,
  payload: {data}
});

export const convertContentToDraft = tempt => ({
  type: INSERT_TOPIC_SUCCESS
});

export const removeTopic = data => ({
  type: DELETE_TOPIC,
  payload: {data}
});

export const uploadImageEditorSuccess = data => ({
  type: UPLOAD_IMAGE_EDITOR_SUCCESS,
  payload: {data}
});

export const addTag = data => ({
  type: ADD_TAG,
  payload: {data}
});

export const removeTag = data => ({
  type: REMOVE_TAG,
  payload: {data}
});

export const loadTagsSuggestion = data => ({
  type: LOAD_TAGS_SUGGESTION,
  payload: {data}
});

export const addTagSuggestion = data => ({
  type: ADD_TAG_SUGGESTION,
  payload: {data}
});

export const removeTagSuggestion = data => ({
  type: REMOVE_TAG_SUGGESTION,
  payload: {data}
});

export const fetchTagsCurrent = data => ({
  type: FETCH_TAG_CURRENT,
  payload: {data}
});

export const filterTopicbyTag = data => ({
  type:  FILTER_TOPIC_BY_TAGS,
  payload: {data}
});

export const setTopicImage = data => ({
  type: SET_IMAGE_TOPIC,
  payload: {data}
});

export const toggleList = data => ({
  type: TOGGLE_LIST,
});
