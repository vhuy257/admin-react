import * as firebase from 'firebase/app';
import 'firebase/auth';
import config from './firebase';

const firebaseApp = firebase.initializeApp(config);
export const authRef = firebase.auth();
export const firebaseAppAuth = firebaseApp.auth();
export const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  facebookProvider: new firebase.auth.FacebookAuthProvider()
};
