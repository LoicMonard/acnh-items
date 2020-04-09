const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

let itemsCache = [];
const db = admin.firestore();

// admin.enablePersistence()
//   .catch(err => {
//     if (err.code == 'failed-precondition') {
//       console.error('Multiple tabs open, persistence can only be enabled in one tab at a time.')
//     } else if (err.code == 'unimplemented') {
//       console.error('The current browser does not support all of the features required to enable persistence.')
//     }
//   })

exports.getAllItems = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  if(itemsCache.length === 0) {
    db
      .collection('items')
      .orderBy('name')
      .get()
      .then(querySnapshot => {
        itemsCache = querySnapshot.docs.map(doc => Object.assign(doc.data(), { id: doc.id } ))
        response.send({ provenance: 'From databse', response: itemsCache})
      })
  } else {
    response.send({ provenance: 'From cache', response: itemsCache})
  }
});
