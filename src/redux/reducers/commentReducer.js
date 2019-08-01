import {
  FETCH_COMMENTS_SUCCESS,
  INCREASE_PAGE_NUMBER,
  SHOW_LOAD_MORE,
  INSERT_COMMENT_SUCCESS,
  CHANGE_CONTENT_COMMENT,
  FETCH_COMMENTS_LOADMORE
} from '../actions/commentActions';

const initialState = {
    commentsData: [],
    pageNumber: 2,
    showLoadMore: false,
    commentItem: {
      date: new Date(),
      content: '',
      user: null,
      photoURL: false,
      topicid: null
    }
}

export default function commentReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        commentsData: action.payload.data.data.data
      };
    case FETCH_COMMENTS_LOADMORE:
      return {
        ...state,
        commentsData: [...state.comments, ...action.payload.comment.data]
      };
    case INCREASE_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: state.pageNumber + 1
      };
    case SHOW_LOAD_MORE:
      return {
        ...state,
        showLoadMore: action.payload.data.paging
      };
    case INSERT_COMMENT_SUCCESS:
      return {
        ...state,
        commentsData: [action.payload.comment.data, ...state.commentsData],
        commentItem: {
          content: '',
        }
      };
    case CHANGE_CONTENT_COMMENT:
      return {
        ...state,
        commentItem: action.payload.comment
      };
    default:
      return state;
  }
}
