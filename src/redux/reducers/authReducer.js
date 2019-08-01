import {
  NOT_AUTHENTICATED,
  AUTHENTICATED
} from '../actions/authActions';

const initialState = {
  isAuth: null,
  userName: null,
}

export default function authReducer (
  state = initialState,
  action
) {
  switch (action.type) {
    case NOT_AUTHENTICATED:
      return {
        ...state,
        isAuth: false
      };
    case AUTHENTICATED:
      return {
        ...state,
        isAuth: true,
        userName: action.payload.auth.displayName || action.payload.auth.email || "Anonymous"
      };
    default:
      return state;
  }
}
