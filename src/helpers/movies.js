import { ref } from '../config/constants';

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
  return remove;
}

export async function getMoviesInCollection(uid) {
  const collection = await ref
    .child(`users/${uid}`)
    .orderByChild('title')
    .once('value');
  const movies = await collection.val();
  return Object.values(movies);
}
