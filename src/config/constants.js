import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_URL}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_FIREBASE_URL}.firebaseio.com`,
  projectId: `${process.env.REACT_APP_FIREBASE_URL}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_URL}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_KEY,
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
