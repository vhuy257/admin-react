import axios from 'axios';

import {
  showModal
} from './modalActions';

const handleErr = (type, err, dispatch) => {
  var modal = {
    type: type,
    msg: `${err}`
  };
  return dispatch(showModal(modal));
}

//API INSERT DATA
export const addData = (apiURL, data, ...actions) => (dispatch, getState) => {
  dispatch(startRequest());
  var authToken = { headers: {
      'Authorization':  getState().userInit.apiToken,
  } };

  axios.post(apiURL, data, authToken)
       .then(data => {
         if(data) {
           actions.map(item => {
             return dispatch(item(data));
           });
           return dispatch(addDataSuccess());
         }
       })
       .catch(error => {
         handleErr('error', error, dispatch);
       });
}

// API GET DATA
export const getData = (apiURL, ...actions) => dispatch => {
  dispatch(startRequest());
  axios.get(apiURL)
       .then(data => {
         if(data) {
           actions.map(item => {
             return dispatch(item(data));
           });
           return dispatch(getDataSuccess());
         }
       })
       .catch(error => {
         dispatch(getDataFailure());
         handleErr('error', error, dispatch);
       });
}

// API DELETE DATA
export const deleteData = (apiURL, ...actions) => (dispatch, getState) => {
  dispatch(startRequest());
  const authToken = { headers: {'Authorization':  getState().userInit.apiToken} };
  axios.delete(apiURL, authToken)
       .then(data => {
         var _data = data.data;
         if(_data) {
           handleErr('success', _data.msg, dispatch);
           actions.map(item => {
             return dispatch(item)
           });
           return dispatch(deleteDataSuccess());
         }
       })
       .catch(error => {
         handleErr('error', error, dispatch);
       });
}

// API UPDATE DATA
export const updateData = (apiURL, data, ...actions) => (dispatch, getState) => {
  dispatch(startRequest());
  const authToken = { headers: {'Authorization':  getState().userInit.apiToken} };
  axios.put(apiURL, data, authToken)
       .then(data => {
         var _data = data.data;
         if(_data.success) {
           handleErr('success', _data.msg, dispatch);
         }

         actions.map(item => {
           return dispatch(item)
         });
         dispatch(requestDone());
       })
       .catch(error => {
         handleErr('error', error, dispatch);
       });
}

// ACTION UPLOAD IMAGE REACT DRAFT
export const uploadImage = (apiURL, data, ...actions) => (dispatch, getState) => {
  var authToken = {
    headers: {
      'Authorization':  getState().userInit.apiToken,
      'Content-Type': 'multipart/form-data'
    }
  };
  return new Promise(
    (resolve, reject) => {
      axios.post(apiURL, data, authToken)
           .then(data => {
             resolve({ data: { link: data.data.Location } });
             dispatch({type: REQUEST_DONE});
           }).catch(err => {
             reject(err);
             handleErr('error', err, dispatch);
           });
    }
  )
}

export const REQUEST_BEGIN       = "REQUEST_BEGIN";
export const REQUEST_DONE        = "REQUEST_DONE";
export const ADD_DATA_SUCCESS    = "ADD_DATA_SUCCESS";
export const ADD_DATA_FAILURE    = "ADD_DATA_FAILURE";
export const GET_DATA_SUCCESS    = "GET_DATA_SUCCESS";
export const GET_DATA_FAILURE    = "GET_DATA_FAILURE";
export const DELETE_DATA_SUCCESS = "DELETE_DATA_SUCCESS";

export const startRequest     = data => ({
  type: REQUEST_BEGIN
});

export const requestDone      = data => ({
  type: REQUEST_DONE
});

export const addDataSuccess   = data => ({
  type: ADD_DATA_SUCCESS
});

export const addDataFailure   = err => ({
  type: ADD_DATA_FAILURE,
  payload: {err}
});

export const getDataSuccess   = data => ({
  type: GET_DATA_SUCCESS
});

export const getDataFailure   = err => ({
  type: GET_DATA_FAILURE
});

export const deleteDataSuccess = data => ({
  type: DELETE_DATA_SUCCESS
});
