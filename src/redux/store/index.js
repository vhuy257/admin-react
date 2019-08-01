import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import throttle from 'lodash.throttle';

import {loadState} from './loadState';
import {saveState} from './saveState';
import {authRef} from '../../firebase-init';

import {
  startCheckAuth,
  setApiToken,
  closeUserFormLogin,
  notAuth
} from '../actions/userActions';

import {
  auth,
  not_auth
} from '../actions/authActions';

const persistedState = loadState();
/**
 * Create a logger
 *
 */

const logger = createLogger();
let store;
if(process.env.NODE_ENV !== 'production') {
  store  = createStore(rootReducer,
    persistedState,
    applyMiddleware(
      logger,
      thunk
    ),
  );
} else {
  store  = createStore(rootReducer,
    persistedState,
    applyMiddleware(
      thunk
    ),
  );
}


authRef.onAuthStateChanged(user => {
  store.dispatch(startCheckAuth());
  if(user) {
    store.dispatch(setApiToken(user.ra)); store.dispatch(closeUserFormLogin()); store.dispatch(auth(user));
  } else {
    store.dispatch(not_auth()); store.dispatch(notAuth());
  }
});

store.subscribe(throttle(() => {
  saveState({
    auth: store.getState().auth
  });
}, 1000));

export default store;
