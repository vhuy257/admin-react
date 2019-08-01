import {
  REQUEST_BEGIN,
  REQUEST_DONE,
  ADD_DATA_SUCCESS,
  ADD_DATA_FAILURE,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  DELETE_DATA_SUCCESS
} from '../actions/apiActions';

const initialState = {
  isLoading: true,
  errorData: null,
  dataFetch: null,
}

export default function apiReducer (
  state = initialState,
  action
) {
  switch (action.type) {
    case REQUEST_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case REQUEST_DONE:
      return {
        ...state,
        isLoading: false,
      };
    case ADD_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ADD_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorData: action.payload.error
      };
    case GET_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case GET_DATA_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case DELETE_DATA_SUCCESS:
      return {
        isLoading: false,
      }
    default:
      return state;
  }
}
