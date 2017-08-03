var functions = require('firebase-functions');
const express = require('express');

// // Uppercases the value of the data when a write event occurs for
// // child nodes of '/uppercase' in the Firebase Realtime Database.
// //
// // Documentation: https://firebase.google.com/preview/functions
//
// exports.makeUpperCase = functions.database().path('/uppercase/{childId}')
//     .onWrite(event => {
//   // For an explanation of this code, see "Handle Database Events"
//   var written = event.data.val();
//   console.log("Uppercasing", event.params.childId, written);
//   var uppercase = written.toUpperCase()
//   // Don't do anything if val() was already upper cased.
//   if (written == uppercase) {
//     return null;
//   }
//   return event.data.ref.set(uppercase);
// });

const app = express();

app.get('/timestamp-cached', (request, response) => {
  response.set('Cache-Control', 'public, max-age=300, s-max-age=600');
  response.send(`${Date.now()}`);
});
app.get('/api', (request, response) => {
  //   response.set('Cache-Control', 'public, max-age=300, s-max-age=600');
  response.send(`${Date.now()}`);
});

app.get('/*', (request, response) => {
  //   response.send('/index.html');
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

exports.app = functions.https.onRequest(app);
