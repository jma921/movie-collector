import firebase from 'firebase';

const config = {
  apiKey: 'sygsuyguysguysuyguysg',
  authDomain: 'example-app-292.firebaseapp.com',
  databaseURL: 'https://example-app-292.firebaseio.com',
  projectId: 'example-app-292',
  storageBucket: 'example-app-292.appspot.com',
  messagingSenderId: '7652f2652r65d265d',
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
