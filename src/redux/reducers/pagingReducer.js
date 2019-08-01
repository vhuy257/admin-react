import {
  SET_PAGE_CURRENT
} from '../actions/pagingActions';

const initialState = {
  itemPerPage: 6,
  pageCurrent: 1,
}

export default function PagingReducer (
  state = initialState,
  action
) {
  switch (action.type) {
    case SET_PAGE_CURRENT:
      return {
        pageCurrent: action.payload.data
      };
    default:
      return state;
  }
}
