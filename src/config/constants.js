import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAvcZCZCohbiVGZuB5n9FjX0vqwR2coo_0',
  authDomain: 'movie-collector-9f2c3.firebaseapp.com',
  databaseURL: 'https://movie-collector-9f2c3.firebaseio.com',
  projectId: 'movie-collector-9f2c3',
  storageBucket: 'movie-collector-9f2c3.appspot.com',
  messagingSenderId: '75609656739',
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
