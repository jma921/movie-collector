import { ref, firebaseAuth } from '../config/constants';
// import _ from 'lodash';

// export function auth(email, pw) {
//   return firebaseAuth()
//     .createUserWithEmailAndPassword(email, pw)
//     .then(saveUser);
// }

export function addMovie(movie, uid) {
  const { id } = movie;
  return ref.child(`users/${uid}/${id}`).set({ data: movie });
}

export async function findMovieById(id, uid) {
  const query = await ref.child(`users/${uid}`).once('value');
  const inCollection = await query.child(`${id}`).exists();
  return inCollection;
}

export async function removeMovie(movie, uid) {
  const { id } = movie;
  const remove = await ref.child(`users/${uid}/${id}`).set(null);
  console.log(remove);
  return remove;
}

export async function getMoviesInCollection(uid) {
  const collection = await ref
    .child(`users/${uid}`)
    .orderByChild('title')
    .once('value');
  const movies = await collection.val();
  console.log(movies);
  return Object.values(movies);
}

// export function resetPassword(email) {
//   return firebaseAuth().sendPasswordResetEmail(email);
// }

// export function saveUser(user) {
//   return ref
//     .child(`users/${user.uid}/info`)
//     .set({
//       email: user.email,
//       uid: user.uid,
//     })
//     .then(() => user);
// }
