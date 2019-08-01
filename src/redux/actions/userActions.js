export const LOGIN_SUCCESS            = "LOGIN_SUCCESS";
export const LOGIN_FAILURE            = "LOGIN_FAILURE";
export const CHANGE_VALUE_USER        = "CHANGE_VALUE_USER";
export const SET_USER_TOKEN           = "SET_USER_TOKEN";
export const SHOW_FORM_LOGIN          = "SHOW_FORM_LOGIN";
export const SHOW_FORM_CREATE_ACCOUNT = "SHOW_FORM_CREATE_ACCOUNT"
export const FETCH_TOKEN_SUCCESS      = "FETCH_TOKEN_SUCCESS";
export const CLOSE_USER_FORM_LOGIN    = "CLOSE_USER_FORM";
export const CLOSE_USER_FORM_CREATE_ACCOUNT    = "CLOSE_USER_FORM_CREATE_ACCOUNT";
export const NOT_AUTHENTICATED        = "NOT_AUTHENTICATED";
export const START_CHECK_AUTH         = "START_CHECK_AUTH";

export const startCheckAuth = token => ({
  type: START_CHECK_AUTH
});


export const fetchApiTokenSuccess = token => ({
  type: FETCH_TOKEN_SUCCESS,
  payload: token
});

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS
});

export const loginFailure = user => ({
  type: LOGIN_FAILURE
});

export const changeValueUser = user => ({
  type: CHANGE_VALUE_USER,
  payload: {user}
});

export const setApiToken = token => ({
  type: SET_USER_TOKEN,
  payload: {token}
});

export const toggleFormLogin = user => ({
  type: SHOW_FORM_LOGIN
});

export const toggleFormCreateAccount = user => ({
  type: SHOW_FORM_CREATE_ACCOUNT
});

export const closeUserFormLogin = user => ({
  type: CLOSE_USER_FORM_LOGIN
});

export const closeUserFormCreateAccount = user => ({
  type: CLOSE_USER_FORM_CREATE_ACCOUNT
});

export const notAuth = auth => ({
  type: NOT_AUTHENTICATED
});
