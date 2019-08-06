import { EditorState } from 'draft-js';
import {convertFromHtmlToDraft} from '../../convertFromHtmlToDraft';
import {
  FETCH_TOPIC_CONTENT_SUCCESS,
  CHANGE_TITLE_TOPIC,
  GET_LIST_TOPIC_SUCCESS,
  INSERT_TOPIC_SUCCESS,
  DELETE_TOPIC,
  UPLOAD_IMAGE_EDITOR_SUCCESS,
  ADD_TAG,
  REMOVE_TAG,
  LOAD_TAGS_SUGGESTION,
  REMOVE_TAG_SUGGESTION,
  ADD_TAG_SUGGESTION,
  FETCH_TAG_CURRENT,
  FILTER_TOPIC_BY_TAGS,
  SET_IMAGE_TOPIC,
  TOGGLE_LIST,
  RESET_TOPIC
} from '../actions/topicActions';

const initialState = {
  titleTopic: '',
  contentTopic: EditorState.createEmpty(),
  excerptTopic: '',
  category: 'Miền Nam',
  userCreateTopic: null,
  topicImage: '',
  createdAt: '',
  searchText: '',
  imageEditorLink: '',
  listTopic: [],
  toggleList: true,
  pagesLength: '',
  tags: {
    current: [],
    suggestions: []
  }
}

function convertContentListTopic(listTopic) {
    let tempt = [];
    listTopic.map((item) => {
      item.content = convertFromHtmlToDraft(item.content);
      return tempt.push(item);
    });
    return tempt;
}

export default function TopicReducer (
  state = initialState,
  action
) {
  switch (action.type) {
    case RESET_TOPIC:
      return {
        ...state,
        category: 'Miền Nam',
        topicImage: '',
      };
    case GET_LIST_TOPIC_SUCCESS:
      return {
        ...state,
        listTopic: convertContentListTopic(action.payload.data.data.data),
        pagesLength: action.payload.data.data.pages
      };
    case FETCH_TOPIC_CONTENT_SUCCESS:
      return {
        ...state,
        createdAt: action.payload.topic.data[0].createdAt,
        category: action.payload.topic.data[0].category,
        userCreateTopic: action.payload.topic.data[0].user,
        _id: action.payload.topic.data[0]._id,
        titleTopic: action.payload.topic.data[0].title,
        topicImage: action.payload.topic.data[0].image,
        excerptTopic: action.payload.topic.data[0].excerpt,
        contentTopic: convertFromHtmlToDraft(action.payload.topic.data[0].content),
      };
    case CHANGE_TITLE_TOPIC:
      return {
        ...state,
        ...action.payload.data
      };
    case DELETE_TOPIC:
      return {
        ...state,
        listTopic: [...state.listTopic].filter(val => val !== action.payload.data)
      };
    case INSERT_TOPIC_SUCCESS:
      return {
        ...state,
        contentTopic: convertFromHtmlToDraft(state.contentTopic)
      };
    case UPLOAD_IMAGE_EDITOR_SUCCESS:
      return {
        ...state,
        imageEditorLink: action.payload.data.data.Location
      };
    case LOAD_TAGS_SUGGESTION:
      return {
        ...state,
        tags: {
          current: state.tags.current,
          suggestions: action.payload.data.data.data
        }
      };
    case ADD_TAG:
      return {
        ...state,
        tags: {
          current: [...state.tags.current, action.payload.data.data],
          suggestions: state.tags.suggestions
        }
      };
    case REMOVE_TAG:
      let selectTag = [...state.tags.current][action.payload.data];
      return {
        ...state,
        tags: {
          current: [...state.tags.current].filter(val => val !== selectTag),
          suggestions: state.tags.suggestions
        }
      };
    case REMOVE_TAG_SUGGESTION:
      return {
        ...state,
        tags: {
          current: [...state.tags.current].filter(val => val !== action.payload.data),
          suggestions: [...state.tags.suggestions].filter(val => val !== action.payload.data)
        }
      };
    case ADD_TAG_SUGGESTION:
      return {
        ...state,
        tags: {
          current: state.tags.current,
          suggestions: [...state.tags.suggestions, action.payload.data.data]
        }
      };
    case FETCH_TAG_CURRENT:
      return {
        ...state,
        tags: {
          current: action.payload.data.data[0].tags,
          suggestions: state.tags.suggestions,
        }
      };
    case FILTER_TOPIC_BY_TAGS:
      let tempt = [];
      state.listTopic.map(function(item){
         return item.tags.map(function(tag){
          if(tag._id === action.payload.data) {
            tempt.push(item);
          }
          return tempt;
        })
      });
      return {
        ...state,
        listTopic: tempt
      };
    case SET_IMAGE_TOPIC:
      return {
        ...state,
        topicImage: action.payload.data
      };
    case TOGGLE_LIST:
      return {
        ...state,
        toggleList: !state.toggleList
      }
    default:
      return state;
  }
}
