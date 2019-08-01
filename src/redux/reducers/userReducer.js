import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    CHANGE_VALUE_USER,
    SET_USER_TOKEN,
    SHOW_FORM_CREATE_ACCOUNT,
    SHOW_FORM_LOGIN,
    CLOSE_USER_FORM_CREATE_ACCOUNT,
    CLOSE_USER_FORM_LOGIN,
    NOT_AUTHENTICATED
} from '../actions/userActions';

const initialState = {
    email: '',
    password: '',
    showFormLogin: false,
    showFormCreateAccount: false,
    apiToken: '',
}

export default function userReducer (
  state = initialState,
  action
) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {...state};
    case LOGIN_FAILURE:
      return {...state};
    case CHANGE_VALUE_USER:
      return {
        ...state,
        ...action.payload.user
      };
    case SET_USER_TOKEN:
      return {
        ...state,
        apiToken: action.payload.token,
      };
    case SHOW_FORM_LOGIN:
      return {
        ...state,
        showFormLogin: !state.showFormLogin,
        showFormCreateAccount: false
      };
    case SHOW_FORM_CREATE_ACCOUNT:
      return {
        ...state,
        showFormCreateAccount: !state.showFormCreateAccount,
        showFormLogin: false
      };
    case CLOSE_USER_FORM_LOGIN:
      return {
        ...state,
        showFormLogin: false,
      };
    case CLOSE_USER_FORM_CREATE_ACCOUNT:
      return {
        ...state,
        showFormCreateAccount: false
      };
    case NOT_AUTHENTICATED:
      return {
        ...state,
        apiToken: ''
      };
    default:
      return state;
  }
}
